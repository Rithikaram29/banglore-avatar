import type { NextApiRequest, NextApiResponse } from "next";
import { generateAvatar } from "@/lib/comfyui-client";

interface SuccessResponse {
  success: true;
  filename: string;
  imageUrl: string;
  imageBase64: string;
}

interface ErrorResponse {
  error: string;
}

type ApiResponse = SuccessResponse | ErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt, negative } = req.body as { prompt?: string; negative?: string };
    if (!prompt) return res.status(400).json({ error: "prompt is required" });

    const { imageUrl, filename, imageBuffer } = await generateAvatar({
      positivePrompt: prompt,
      negativePrompt: negative,
    });

    return res.status(200).json({
      success: true,
      filename,
      imageUrl,
      imageBase64: imageBuffer.toString("base64"),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Generation failed";
    console.error("[generate-avatar] Error:", err);
    return res.status(500).json({ error: message });
  }
}
