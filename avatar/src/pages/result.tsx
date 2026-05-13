import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { motion } from "framer-motion";
import { AvatarProfile } from "@/lib/traits";
import AvatarCard from "@/components/AvatarCard";

type StoredResult = AvatarProfile & {
  generatedImageUrl: string | null;
};

export default function Result() {
  const router = useRouter();
  const [result, setResult] = useState<StoredResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    async function load() {
      let raw: string | null = null;
      try {
        raw = localStorage.getItem("bangaloreAvatar");
      } catch {
        raw = sessionStorage.getItem("bangaloreAvatar");
      }
      if (!raw) {
        router.replace("/");
        return;
      }
      setResult(JSON.parse(raw));
    }
    load();
  }, [router]);

  function handleShare() {
    if (!result) return;
    const caption =
      `I'm ${result.avatarName} 🌧️\n` +
      `"${result.tagline}"\n\n` +
      `Find your Bangalore Avatar → blravatar.xyz`;

    if (navigator.share) {
      navigator.share({ text: caption }).catch(() => {});
    } else {
      navigator.clipboard.writeText(caption).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  }

  function handleDownload() {
    if (!result?.generatedImageUrl) return;
    setDownloading(true);
    const slug = result.avatarName.replace(/\s+/g, "-").toLowerCase();
    const a = document.createElement("a");
    a.href = result.generatedImageUrl;
    a.download = `${slug}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloading(false);
  }

  function handleRetake() {
    try {
      localStorage.removeItem("bangaloreAvatar");
    } catch {
      sessionStorage.removeItem("bangaloreAvatar");
    }
    router.push("/quiz");
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  const { generatedImageUrl, ...profile } = result;

  return (
    <>
      <Head>
        <title>{result.avatarName} – Bangalore Avatar</title>
        <meta name="description" content={result.tagline} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={result.avatarName} />
        <meta property="og:description" content={result.tagline} />
        {generatedImageUrl && <meta property="og:image" content={generatedImageUrl} />}
      </Head>

      <div className="min-h-screen bg-zinc-950 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <button
            onClick={() => router.push("/")}
            className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors"
          >
            ← home
          </button>
          <span className="text-zinc-700 text-xs font-mono">YOUR AVATAR</span>
          <span className="w-12" />
        </div>

        {/* Ambient glow — archetype-coloured */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-125 rounded-full blur-3xl"
            style={{ background: `radial-gradient(ellipse, ${result.archetype.glowColor} 0%, transparent 70%)` }}
            animate={{ opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col px-6 pb-10 max-w-md mx-auto w-full pt-4">
          <motion.p
            className="text-center text-xs text-zinc-600 font-mono uppercase tracking-widest mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            ✦ your bangalore avatar is ✦
          </motion.p>

          <AvatarCard
            profile={profile}
            generatedImageUrl={generatedImageUrl}
          />

          {/* AI prompt (collapsible) */}
          <motion.details
            className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <summary className="px-4 py-3 text-zinc-500 text-xs cursor-pointer hover:text-zinc-300 transition-colors select-none">
              🎨 view AI image prompt
            </summary>
            <div className="px-4 pb-4">
              <p className="text-zinc-600 text-xs leading-relaxed font-mono">{result.prompt}</p>
            </div>
          </motion.details>

          {/* CTA buttons */}
          <motion.div
            className="mt-8 space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <button
              onClick={handleShare}
              className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${result.archetype.accentColor}, #a855f7)`,
                boxShadow: `0 0 25px ${result.archetype.glowColor}`,
              }}
            >
              {copied ? "✓ Copied to clipboard!" : "Share My Avatar →"}
            </button>

            {generatedImageUrl && (
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full py-3.5 rounded-2xl text-zinc-300 text-sm font-medium transition-all duration-200 border border-zinc-700 hover:border-zinc-500 hover:text-white active:scale-95 disabled:opacity-50"
              >
                {downloading ? "Downloading…" : "⬇ Download Avatar"}
              </button>
            )}

            <button
              onClick={handleRetake}
              className="w-full py-3 rounded-2xl text-zinc-600 hover:text-zinc-400 text-sm transition-colors"
            >
              retake quiz
            </button>
          </motion.div>

          <motion.p
            className="text-center text-zinc-800 text-xs mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            made with ☕ + 🌧️ in Bangalore
          </motion.p>
        </div>
      </div>
    </>
  );
}
