import { motion } from "framer-motion";

type Props = {
  current: number;
  total: number;
};

export default function ProgressBar({ current, total }: Props) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs text-purple-400 font-medium tracking-widest uppercase">
          Question {current} of {total}
        </span>
        <span className="text-xs text-zinc-500">{pct}%</span>
      </div>
      <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #a855f7, #06b6d4)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
