import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Question, Option } from "@/data/questions";

type Props = {
  question: Question;
  questionIndex: number;
  onAnswer: (option: Option) => void;
  onTextAnswer?: (text: string) => void;
};

const cardVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    scale: 0.96,
  }),
};

export default function QuestionCard({ question, questionIndex, onAnswer, onTextAnswer }: Props) {
  const [value, setValue] = useState("");

  function handleSubmit() {
    if (onTextAnswer && value.trim()) {
      onTextAnswer(value.trim());
    }
  }

  const isTextInput = question.inputType === "text";

  return (
    <AnimatePresence mode="wait" custom={1}>
      <motion.div
        key={question.id}
        custom={1}
        variants={cardVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full"
      >
        <div className="mb-8">
          <motion.p
            className="text-xs text-purple-400 font-mono tracking-widest uppercase mb-3"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            ✦ question {questionIndex + 1}
          </motion.p>
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {question.question}
          </motion.h2>
          {question.subtitle && (
            <motion.p
              className="text-zinc-400 text-sm italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {question.subtitle}
            </motion.p>
          )}
        </div>

        {isTextInput ? (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <input
              type="text"
              value={value}
              placeholder={question.placeholder}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full rounded-2xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              autoFocus
            />
            <motion.button
              onClick={handleSubmit}
              disabled={!value.trim()}
              className="w-full py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              whileHover={value.trim() ? { scale: 1.01 } : {}}
              whileTap={value.trim() ? { scale: 0.98 } : {}}
            >
              Continue →
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {question.options.map((option, i) => (
              <motion.button
                key={option.label}
                onClick={() => onAnswer(option)}
                className="w-full text-left group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.07, duration: 0.3 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-purple-500/50 hover:bg-zinc-800/80 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-purple-900/20">
                  <span className="text-2xl flex-shrink-0 w-10 text-center mt-0.5">
                    {option.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-zinc-200 text-sm sm:text-base leading-snug block">
                      {option.label}
                    </span>
                    {option.subtitle && (
                      <span className="text-zinc-600 text-xs leading-snug block mt-0.5 italic">
                        {option.subtitle}
                      </span>
                    )}
                  </div>
                  <span className="ml-auto text-zinc-600 group-hover:text-purple-400 transition-colors flex-shrink-0 mt-0.5">
                    →
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
