export type GenerationResult =
  | { ok: true; imageUrl: string }
  | { ok: false; error: string };

export async function generateAvatar(prompt: string): Promise<GenerationResult> {
  try {
    const res = await fetch("/api/generate-avatar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json() as { imageUrl?: string; error?: string };

    if (!res.ok || !data.imageUrl) {
      return { ok: false, error: data.error ?? "Unknown error" };
    }
    return { ok: true, imageUrl: data.imageUrl };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Network error" };
  }
}
