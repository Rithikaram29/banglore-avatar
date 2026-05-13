import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AvatarProfile } from "@/lib/traits";

type Props = {
  profile: AvatarProfile;
  generatedImageUrl?: string | null;
};

export default function AvatarCard({ profile, generatedImageUrl }: Props) {
  const { archetype, avatarName, tagline, mergedTraits } = profile;
  const [imgLoaded, setImgLoaded] = useState(false);

  const traitChips = [
    ...mergedTraits.aesthetic.slice(0, 2),
    ...mergedTraits.energy.slice(0, 2),
    ...mergedTraits.lifestyle.slice(0, 1),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full max-w-sm mx-auto"
    >
      {/* Avatar portrait */}
      <div className="relative rounded-3xl overflow-hidden mb-6" style={{ aspectRatio: "1/1" }}>
        {/* Base gradient always present */}
        <div className="absolute inset-0" style={{ background: archetype.gradient }} />

        {/* Floating bg emojis — hidden once real image loads */}
        <AnimatePresence>
          {!imgLoaded && (
            <motion.div
              className="absolute inset-0 overflow-hidden"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {archetype.bgEmoji.map((emoji, i) => (
                <motion.span
                  key={i}
                  className="absolute text-3xl opacity-20 select-none"
                  style={{ left: `${15 + i * 22}%`, top: `${10 + (i % 3) * 25}%` }}
                  animate={{ y: [0, -12, 0], rotate: [-5, 5, -5], opacity: [0.15, 0.3, 0.15] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glow pulse */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `radial-gradient(circle at 50% 60%, ${archetype.glowColor} 0%, transparent 65%)`,
              `radial-gradient(circle at 50% 60%, transparent 0%, transparent 65%)`,
              `radial-gradient(circle at 50% 60%, ${archetype.glowColor} 0%, transparent 65%)`,
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* === AI generated image (priority) === */}
        {generatedImageUrl && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
            animate={
              imgLoaded
                ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, scale: 1.05, filter: "blur(12px)" }
            }
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={generatedImageUrl}
              alt={avatarName}
              className="w-full h-full object-cover"
              onLoad={() => setImgLoaded(true)}
            />
            {/* Tint overlay so gradient colors bleed through slightly */}
            <div
              className="absolute inset-0 mix-blend-color opacity-15"
              style={{ background: archetype.gradient }}
            />
          </motion.div>
        )}

        {/* === Fallback: emoji === */}
        <AnimatePresence>
          {!generatedImageUrl && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              exit={{ opacity: 0 }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex gap-2 items-end">
                  {archetype.avatarEmoji.map((emoji, i) => (
                    <motion.span
                      key={i}
                      className={`${i === 1 ? "text-7xl" : "text-5xl"} drop-shadow-lg`}
                      animate={{ rotate: [0, i % 2 === 0 ? 8 : -8, 0] }}
                      transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tension pair badge */}
        {mergedTraits.tensionPairs.length > 0 && (
          <motion.div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium border"
            style={{
              background: "rgba(0,0,0,0.65)",
              borderColor: `${archetype.accentColor}60`,
              color: archetype.textColor,
            }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            ⚡ {mergedTraits.tensionPairs[0]}
          </motion.div>
        )}

        <div className="absolute bottom-0 inset-x-0 h-20 bg-linear-to-t from-black/60 to-transparent" />

        {/* Shimmer overlay */}
        <motion.div
          className="absolute inset-0 opacity-15"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["-200% 0", "400% 0"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Name — dramatic staggered reveal */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight" style={{ color: archetype.textColor }}>
          {avatarName}
        </h2>
        <motion.p
          className="text-zinc-400 text-sm italic px-4 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          &ldquo;{tagline}&rdquo;
        </motion.p>
      </motion.div>

      {/* Description */}
      <motion.div
        className="rounded-2xl p-4 mb-6 text-center"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <p className="text-zinc-300 text-sm leading-relaxed">{archetype.description}</p>
      </motion.div>

      {/* Trait chips */}
      <motion.div
        className="flex flex-wrap gap-2 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {traitChips.map((trait) => (
          <span
            key={trait}
            className="px-3 py-1 rounded-full text-xs font-medium text-zinc-300 border border-zinc-700 bg-zinc-800/60"
          >
            #{trait}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
