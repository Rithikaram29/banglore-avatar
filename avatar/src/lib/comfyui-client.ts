/**
 * comfyui-client.ts
 * ─────────────────────────────────────────────────────────────
 * ComfyUI API client — SDXL text-to-image (built-in nodes only)
 *
 * Pipeline:
 *   Text prompt → EmptyLatentImage → KSampler → VAE decode → Save
 *
 * Required models:
 *   models/checkpoints/  sd_xl_base_1.0_0.9vae.safetensors
 *
 * No custom nodes needed.
 * ─────────────────────────────────────────────────────────────
 */

const COMFY_BASE_URL: string = process.env.COMFY_URL ?? "http://127.0.0.1:8188";
const CLIENT_ID: string = `bangalore-avatar-${Date.now()}`;

// ─── Types ────────────────────────────────────────────────────

export interface GenerateAvatarOptions {
  positivePrompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
}

export interface GenerateAvatarResult {
  imageBuffer: Buffer;
  /** data:image/png;base64,... — drop straight into <img src> */
  imageUrl: string;
  filename: string;
}

type NodeLink = [string, number];

interface WorkflowNode {
  class_type: string;
  inputs: Record<string, string | number | boolean | NodeLink>;
}

type Workflow = Record<string, WorkflowNode>;

interface BuildWorkflowOptions {
  positivePrompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
}

interface QueuePromptResponse {
  prompt_id: string;
  number: number;
  node_errors: Record<string, unknown>;
}

interface OutputImage {
  filename: string;
  subfolder: string;
  type: string;
}

interface HistoryOutputs {
  [nodeId: string]: { images?: OutputImage[] };
}

interface HistoryEntry {
  status: { completed: boolean; status_str: string };
  outputs: HistoryOutputs;
}

interface WaitForCompletionOptions {
  pollIntervalMs?: number;
  timeoutMs?: number;
}

// ─── 1. Build SDXL text-to-image workflow ────────────────────

export function buildWorkflow({
  positivePrompt,
  negativePrompt,
  width = 1024,
  height = 1024,
}: BuildWorkflowOptions): Workflow {
  return {
    "1": {
      class_type: "CheckpointLoaderSimple",
      inputs: { ckpt_name: "sd_xl_base_1.0_0.9vae.safetensors" },
    },
    "2": {
      class_type: "CLIPTextEncode",
      inputs: { text: positivePrompt, clip: ["1", 1] },
    },
    "3": {
      class_type: "CLIPTextEncode",
      inputs: {
        text: negativePrompt ?? "blurry, deformed, ugly, low quality, watermark, text, nsfw",
        clip: ["1", 1],
      },
    },
    "4": {
      class_type: "EmptyLatentImage",
      inputs: { width, height, batch_size: 1 },
    },
    "5": {
      class_type: "KSampler",
      inputs: {
        model:        ["1", 0],
        positive:     ["2", 0],
        negative:     ["3", 0],
        latent_image: ["4", 0],
        seed:         Math.floor(Math.random() * 999_999_999),
        steps:        30,
        cfg:          7.0,
        sampler_name: "dpmpp_2m",
        scheduler:    "karras",
        denoise:      1.0,
      },
    },
    "6": {
      class_type: "VAEDecode",
      inputs: { samples: ["5", 0], vae: ["1", 2] },
    },
    "7": {
      class_type: "SaveImage",
      inputs: { images: ["6", 0], filename_prefix: "bangalore_avatar" },
    },
  };
}

// ─── 2. Queue prompt ─────────────────────────────────────────

export async function queuePrompt(workflow: Workflow): Promise<string> {
  const res = await fetch(`${COMFY_BASE_URL}/prompt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: workflow, client_id: CLIENT_ID }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Queue failed: ${res.status} — ${err}`);
  }

  const data = (await res.json()) as QueuePromptResponse;
  return data.prompt_id;
}

// ─── 3. Poll until generation is done ────────────────────────

export async function waitForCompletion(
  promptId: string,
  { pollIntervalMs = 1500, timeoutMs = 300_000 }: WaitForCompletionOptions = {}
): Promise<HistoryOutputs> {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    await new Promise<void>((r) => setTimeout(r, pollIntervalMs));

    const res = await fetch(`${COMFY_BASE_URL}/history/${promptId}`);
    if (!res.ok) continue;

    const history = (await res.json()) as Record<string, HistoryEntry>;
    const entry = history[promptId];
    if (!entry) continue;

    if (entry.status?.completed) return entry.outputs;
    if (entry.status?.status_str === "error") {
      throw new Error(`ComfyUI generation error: ${JSON.stringify(entry.status)}`);
    }
  }

  throw new Error(`Generation timed out after ${timeoutMs / 1000}s`);
}

// ─── 4. Fetch output image ────────────────────────────────────

export async function fetchOutputImage(
  filename: string,
  subfolder: string = "",
  type: string = "output"
): Promise<Buffer> {
  const params = new URLSearchParams({ filename, subfolder, type });
  const res = await fetch(`${COMFY_BASE_URL}/view?${params}`);
  if (!res.ok) throw new Error(`Fetch image failed: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

// ─── Main export ──────────────────────────────────────────────

export async function generateAvatar({
  positivePrompt,
  negativePrompt,
  width = 1024,
  height = 1024,
}: GenerateAvatarOptions): Promise<GenerateAvatarResult> {
  const workflow = buildWorkflow({ positivePrompt, negativePrompt, width, height });
  const promptId = await queuePrompt(workflow);
  const outputs = await waitForCompletion(promptId);

  const saveNode = outputs["7"];
  if (!saveNode?.images?.length) throw new Error("No output images");

  const { filename, subfolder, type } = saveNode.images[0];
  const resultBuffer = await fetchOutputImage(filename, subfolder, type);
  return {
    imageBuffer: resultBuffer,
    imageUrl: `data:image/png;base64,${resultBuffer.toString("base64")}`,
    filename,
  };
}
