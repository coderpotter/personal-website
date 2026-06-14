import { useState, useMemo } from "react";
import { motion } from "framer-motion";

function generateNoise(length: number) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function ASCIIMathPipeline() {
  const [noiseString, setNoiseString] = useState(() => generateNoise(16));
  const [scrub, setScrub] = useState(0);

  const regenerate = () => {
    setNoiseString(generateNoise(16));
    setScrub(0);
  };

  const currentSum = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < scrub; i++) {
      sum += noiseString.charCodeAt(i);
    }
    return sum;
  }, [noiseString, scrub]);

  const result = currentSum % 2 === 0 ? "Heads" : "Tails";
  const isDone = scrub === noiseString.length;

  return (
    <div className="my-16 p-8 border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded-sm bg-[#111111]/[0.02] dark:bg-[#EDE9E1]/[0.02]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div className="flex-1">
          <label className="font-mono text-xs tracking-widest uppercase text-[#111111]/45 dark:text-[#EDE9E1]/45 block mb-4">
            Interactive Scrub Bar
          </label>
          <input
            type="range"
            min="0"
            max={noiseString.length}
            value={scrub}
            onChange={(e) => setScrub(Number(e.target.value))}
            className="w-full accent-[#C93D0E] dark:accent-[#FF6B35]"
          />
        </div>
        <button
          onClick={regenerate}
          className="px-4 py-2 border border-[#C93D0E] text-[#C93D0E] dark:border-[#FF6B35] dark:text-[#FF6B35] rounded font-mono text-xs tracking-widest hover:bg-[#C93D0E]/10 dark:hover:bg-[#FF6B35]/10 transition-colors shrink-0"
        >
          Generate Noise
        </button>
      </div>

      <div className="p-6 bg-[#111111]/5 dark:bg-[#EDE9E1]/5 rounded border border-[#111111]/10 dark:border-[#EDE9E1]/10 font-mono text-center">
        <span className="text-[#111111]/30 dark:text-[#EDE9E1]/30">&lt;random_string&gt;</span>
        <div className="my-4 text-2xl tracking-[0.2em] break-all">
          {noiseString.split("").map((char, i) => (
            <span
              key={i}
              className={`transition-colors duration-200 ${
                i < scrub
                  ? "text-[#111111] dark:text-[#EDE9E1] font-bold"
                  : "text-[#111111]/20 dark:text-[#EDE9E1]/20"
              }`}
            >
              {char}
            </span>
          ))}
        </div>
        <span className="text-[#111111]/30 dark:text-[#EDE9E1]/30">&lt;/random_string&gt;</span>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center justify-center p-6 border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded bg-[#F8F6F1] dark:bg-[#0D0D0B]">
          <span className="font-mono text-[10px] tracking-widest uppercase text-[#111111]/45 dark:text-[#EDE9E1]/45 mb-2">
            Running ASCII Sum
          </span>
          <span className="font-mono text-3xl text-[#111111] dark:text-[#EDE9E1] tabular-nums">
            {currentSum}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-6 border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded bg-[#F8F6F1] dark:bg-[#0D0D0B] relative overflow-hidden">
          <span className="font-mono text-[10px] tracking-widest uppercase text-[#111111]/45 dark:text-[#EDE9E1]/45 mb-2">
            Modulo 2 Result
          </span>
          <div className="flex gap-4 items-center">
            <span className={`font-serif text-2xl transition-opacity ${isDone && result === "Heads" ? "text-[#C93D0E] dark:text-[#FF6B35] font-bold opacity-100" : "text-[#111111]/20 dark:text-[#EDE9E1]/20 opacity-40"}`}>
              Heads
            </span>
            <span className="font-mono text-[#111111]/30 dark:text-[#EDE9E1]/30">|</span>
            <span className={`font-serif text-2xl transition-opacity ${isDone && result === "Tails" ? "text-[#C93D0E] dark:text-[#FF6B35] font-bold opacity-100" : "text-[#111111]/20 dark:text-[#EDE9E1]/20 opacity-40"}`}>
              Tails
            </span>
          </div>
          {isDone && (
            <motion.div
              layoutId="highlight"
              className="absolute bottom-0 h-1 bg-[#C93D0E] dark:bg-[#FF6B35] w-1/2"
              initial={false}
              animate={{ left: result === "Heads" ? "0%" : "50%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
