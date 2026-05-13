import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type LoadingStage = "analyzing" | "generating" | "rendering" | "finalizing";

const STAGE_CONFIG: Record<
  LoadingStage,
  { label: string; emoji: string; messages: string[]; color: string }
> = {
  analyzing: {
    label: "Analyzing your Bangalore DNA",
    emoji: "🔬",
    color: "#a855f7",
    messages: [
      "Analyzing your Bangalore survival strategy…",
      "Measuring caffeine dependency levels…",
      "Detecting startup-core energy signatures…",
      "Consulting the Namma Metro oracle…",
      "Cross-referencing with Cubbon Park vibes…",
      "Calculating auto-haggling expertise…",
      "Checking rain romanticization index…",
    ],
  },
  generating: {
    label: "Generating your avatar",
    emoji: "🎨",
    color: "#06b6d4",
    messages: [
      "Rendering your Bangalore alter ego…",
      "Adding emotional support headphones…",
      "Simulating post-rain Indiranagar lighting…",
      "Calibrating startup energy levels…",
      "Applying cozy cyberpunk filter…",
      "Sourcing artisanal hoodie textures…",
      "Detecting whether you survive Silk Board mentally…",
      "Loading Bangalore weather ambience…",
    ],
  },
  rendering: {
    label: "Painting the details",
    emoji: "✨",
    color: "#ec4899",
    messages: [
      "Perfecting the laptop sticker arrangement…",
      "Dialing in that 3am glow…",
      "Adding rain reflections on the street…",
      "Calibrating the existential expression…",
      "Making the coffee look artisanal…",
      "Adjusting the 'I'm fine' energy…",
      "Rendering your very specific kind of tired…",
    ],
  },
  finalizing: {
    label: "Almost ready",
    emoji: "🌧️",
    color: "#10b981",
    messages: [
      "Your avatar has entered the chat…",
      "Applying final Bangalore authenticity check…",
      "Making sure the vibe is immaculate…",
      "This is going to be so you.",
    ],
  },
};

type Props = { stage?: LoadingStage };

export default function LoadingScreen({ stage = "analyzing" }: Props) {
  const config = STAGE_CONFIG[stage];
  const [msgIndex, setMsgIndex] = useState(0);
  const [stageProgress, setStageProgress] = useState(0);

  useEffect(() => {
    setMsgIndex(0);
  }, [stage]);

  useEffect(() => {
    const msgs = config.messages;
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % msgs.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [config.messages]);

  // Fake stage progress bar
  useEffect(() => {
    setStageProgress(0);
    const interval = setInterval(() => {
      setStageProgress((p) => Math.min(p + 2, 95));
    }, 60);
    return () => clearInterval(interval);
  }, [stage]);

  const stageOrder: LoadingStage[] = ["analyzing", "generating", "rendering", "finalizing"];
  const currentStageIdx = stageOrder.indexOf(stage);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[65vh] gap-8 px-4"
    >
      {/* Main orb */}
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className="w-32 h-32 rounded-full"
          style={{ background: `conic-gradient(${config.color}, #a855f7, #ec4899, ${config.color})` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner glow */}
        <motion.div
          className="absolute inset-2 rounded-full bg-zinc-950 flex items-center justify-center"
          animate={{
            boxShadow: [
              `0 0 20px ${config.color}60`,
              `0 0 45px ${config.color}90`,
              `0 0 20px ${config.color}60`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={config.emoji}
              className="text-4xl"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [1, 1.15, 1], opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {config.emoji}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Orbiting dot */}
        <motion.div
          className="absolute w-3 h-3 rounded-full top-1/2 left-1/2"
          style={{ background: config.color, marginTop: -6, marginLeft: -6, originX: "50%", originY: "70px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Stage label */}
      <div className="text-center space-y-3">
        <AnimatePresence mode="wait">
          <motion.p
            key={stage}
            className="text-xs font-mono uppercase tracking-widest"
            style={{ color: config.color }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
          >
            {config.label}
          </motion.p>
        </AnimatePresence>

        <div className="h-10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={`${stage}-${msgIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-zinc-300 text-sm text-center"
            >
              {config.messages[msgIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Stage progress dots */}
      <div className="flex items-center gap-3">
        {stageOrder.map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <motion.div
              className="rounded-full"
              animate={{
                width: i === currentStageIdx ? 24 : 8,
                height: 8,
                backgroundColor:
                  i < currentStageIdx
                    ? "#10b981"
                    : i === currentStageIdx
                    ? config.color
                    : "#27272a",
              }}
              transition={{ duration: 0.4 }}
            />
            {i < stageOrder.length - 1 && (
              <motion.div
                className="w-6 h-px"
                animate={{ backgroundColor: i < currentStageIdx ? "#10b981" : "#27272a" }}
                transition={{ duration: 0.4 }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Stage progress bar */}
      <div className="w-full max-w-xs">
        <div className="h-0.5 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${config.color}, #a855f7)` }}
            animate={{ width: `${stageProgress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
