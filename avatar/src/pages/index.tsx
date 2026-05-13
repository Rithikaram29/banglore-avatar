import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Head from "next/head";

const FLOATERS = ["☕", "🌧️", "🚇", "💻", "🌃", "🛺", "🌿", "✨", "🎧", "🚀"];

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>What&apos;s Your Bangalore Avatar?</title>
        <meta name="description" content="Discover your Bangalore alter ego. Answer 8 questions. Become legend." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="What's Your Bangalore Avatar?" />
        <meta property="og:description" content="Discover your Bangalore alter ego. Are you a Startup Goblin or a Cubbon Park Healing Arc?" />
      </Head>

      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-zinc-950">
        {/* Ambient gradient */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(ellipse, #a855f7 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full opacity-15 blur-3xl"
            style={{ background: "radial-gradient(ellipse, #06b6d4 0%, transparent 70%)" }}
          />
          <div
            className="absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(ellipse, #ec4899 0%, transparent 70%)" }}
          />
        </div>

        {/* Floating emojis */}
        {FLOATERS.map((emoji, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl opacity-20 select-none pointer-events-none"
            style={{
              left: `${(i * 37 + 10) % 90}%`,
              top: `${(i * 53 + 5) % 85}%`,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, i % 2 === 0 ? 10 : -10, 0],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          >
            {emoji}
          </motion.span>
        ))}

        {/* Main content */}
        <div className="relative z-10 px-6 py-16 max-w-md mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-900/20 text-purple-300 text-xs font-mono tracking-wider mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse inline-block" />
              BANGALORE AVATAR GENERATOR
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-3">
              What&apos;s Your{" "}
              <span
                className="inline-block"
                style={{
                  background: "linear-gradient(90deg, #a855f7, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Bangalore
              </span>
              <br />Avatar?
            </h1>
          </motion.div>

          <motion.p
            className="text-zinc-400 text-base leading-relaxed mb-4 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            8 questions. Deep algorithm. Mildly accurate personality verdict.
          </motion.p>

          <motion.p
            className="text-zinc-600 text-sm mb-10 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Are you a Startup Goblin or a Cubbon Park Healing Arc?
          </motion.p>

          <motion.button
            onClick={() => router.push("/quiz")}
            className="w-full py-4 px-8 rounded-2xl text-white font-bold text-lg transition-all duration-200 hover:opacity-90 active:scale-95 shadow-lg"
            style={{
              background: "linear-gradient(135deg, #a855f7 0%, #7c3aed 50%, #06b6d4 100%)",
              boxShadow: "0 0 30px rgba(168, 85, 247, 0.3)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(168, 85, 247, 0.5)" }}
            whileTap={{ scale: 0.97 }}
          >
            Find My Avatar →
          </motion.button>

          <motion.p
            className="text-zinc-700 text-xs mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            No login. No data stored. Just vibes.
          </motion.p>
        </div>

        {/* Bottom archetypes preview */}
        <motion.div
          className="relative z-10 pb-8 px-6 w-full max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-zinc-700 text-xs text-center mb-4 uppercase tracking-widest">possible outcomes include</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              "The Indiranagar Night Owl 🌙",
              "The Startup Goblin 🚀",
              "The Healing Arc 🌿",
              "The Cafe Nomad ☕",
              "The 1BHK Philosopher 🏠",
            ].map((label) => (
              <span
                key={label}
                className="px-3 py-1.5 rounded-full text-xs text-zinc-500 border border-zinc-800 bg-zinc-900/60"
              >
                {label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}
