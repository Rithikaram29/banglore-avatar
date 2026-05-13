import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { questions, Option } from "@/data/questions";
import { buildAvatarProfile } from "@/lib/traits";
import { generateAvatar } from "@/lib/nano-banana";
import { LoadingStage } from "@/components/LoadingScreen";
import ProgressBar from "@/components/ProgressBar";
import QuestionCard from "@/components/QuestionCard";
import LoadingScreen from "@/components/LoadingScreen";

type Phase = "quiz" | "loading";

export default function Quiz() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("quiz");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Option[]>([]);
  const [favouriteAnimal, setFavouriteAnimal] = useState("");
  const [loadingStage, setLoadingStage] = useState<LoadingStage>("analyzing");
  const generationStarted = useRef(false);

  useEffect(() => {
    if (phase !== "loading" || generationStarted.current) return;
    generationStarted.current = true;

    async function run() {
      // Stage 1 – build the profile (~instant, but show it for UX)
      setLoadingStage("analyzing");
      await delay(1200);

      const profile = buildAvatarProfile(answers, favouriteAnimal);

      // Stage 2 – call the API
      setLoadingStage("generating");
      const result = await generateAvatar(profile.prompt);

      // Stage 3 – show rendering state while we prep for navigation
      setLoadingStage("rendering");
      await delay(800);

      setLoadingStage("finalizing");
      await delay(600);

      const generatedImageUrl = result.ok ? result.imageUrl : null;

      const payload = {
        ...profile,
        favouriteAnimal,
        generatedImageUrl,
      };

      try {
        localStorage.setItem("bangaloreAvatar", JSON.stringify(payload));
      } catch {
        sessionStorage.setItem("bangaloreAvatar", JSON.stringify(payload));
      }

      router.push("/result");
    }

    run();
  }, [phase, answers, favouriteAnimal, router]);

  function handleAnswer(option: Option) {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (questionIndex + 1 >= questions.length) {
      setPhase("loading");
    } else {
      setQuestionIndex((i) => i + 1);
    }
  }

  function handleTextAnswer(text: string) {
    setFavouriteAnimal(text);
    if (questionIndex + 1 >= questions.length) {
      setPhase("loading");
    } else {
      setQuestionIndex((i) => i + 1);
    }
  }

  return (
    <>
      <Head>
        <title>Quiz – Bangalore Avatar</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-zinc-950 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <button
            onClick={() => router.push("/")}
            className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors"
            disabled={phase === "loading"}
          >
            ← back
          </button>
          <span className="text-zinc-700 text-xs font-mono">BLRAVATAR.XYZ</span>
          {phase === "quiz" ? (
            <span className="text-zinc-700 text-xs">
              {questionIndex + 1}/{questions.length}
            </span>
          ) : (
            <span className="w-12" />
          )}
        </div>

        {/* Ambient glow — color shifts with loading stage */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl"
            animate={{
              background:
                phase === "loading"
                  ? loadingStage === "generating"
                    ? "radial-gradient(ellipse, #06b6d4 0%, transparent 70%)"
                    : loadingStage === "rendering"
                    ? "radial-gradient(ellipse, #ec4899 0%, transparent 70%)"
                    : loadingStage === "finalizing"
                    ? "radial-gradient(ellipse, #10b981 0%, transparent 70%)"
                    : "radial-gradient(ellipse, #a855f7 0%, transparent 70%)"
                  : "radial-gradient(ellipse, #a855f7 0%, transparent 70%)",
              opacity: phase === "loading" ? 0.2 : 0.1,
            }}
            transition={{ duration: 1.5 }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center px-6 pb-10 max-w-lg mx-auto w-full">
          <AnimatePresence mode="wait">
            {phase === "quiz" && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <ProgressBar current={questionIndex + 1} total={questions.length} />
                <QuestionCard
                  question={questions[questionIndex]}
                  questionIndex={questionIndex}
                  onAnswer={handleAnswer}
                  onTextAnswer={handleTextAnswer}
                />
              </motion.div>
            )}

            {phase === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <LoadingScreen stage={loadingStage} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
