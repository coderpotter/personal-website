import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PerformanceLeap() {
  const [emInf, setEmInf] = useState(false);

  // Performance scores
  const score32B = emInf ? 96 : 42;
  const scoreGPT4 = 95;

  return (
    <div className="my-16 p-8 border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded-sm bg-[#111111]/[0.02] dark:bg-[#EDE9E1]/[0.02]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h4 className="font-serif text-xl text-[#111111] dark:text-[#EDE9E1] mb-2">
            The Performance Leap
          </h4>
          <p className="text-[14px] text-[#111111]/60 dark:text-[#EDE9E1]/60">
            Compare standard generation vs Entropy Minimization.
          </p>
        </div>
        <button
          onClick={() => setEmInf(!emInf)}
          className={`relative inline-flex h-8 w-16 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            emInf ? "bg-[#C93D0E] dark:bg-[#FF6B35]" : "bg-[#111111]/20 dark:bg-[#EDE9E1]/20"
          }`}
        >
          <span className="sr-only">Apply Entropy Minimization</span>
          <span
            aria-hidden="true"
            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              emInf ? "translate-x-4" : "-translate-x-4"
            }`}
          />
        </button>
      </div>

      <div className="relative h-[300px] w-full flex items-end justify-center gap-16 px-8 pb-8 pt-12 border-b border-[#111111]/10 dark:border-[#EDE9E1]/10">
        
        {/* 32B Model Bar */}
        <div className="relative flex flex-col items-center w-32">
          <span className="absolute -top-10 font-mono text-3xl tabular-nums text-[#C93D0E] dark:text-[#FF6B35]">
            <motion.span>{score32B}</motion.span>%
          </span>
          
          <motion.div
            className="w-full bg-[#C93D0E] dark:bg-[#FF6B35] rounded-t relative"
            initial={false}
            animate={{ height: `${(score32B / 100) * 250}px` }}
            transition={{ type: "spring", bounce: 0.4, duration: 1.2 }}
          >
            {/* Particles emitting when emInf goes from false -> true */}
            <AnimatePresence>
              {emInf && Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  animate={{ 
                    opacity: 0, 
                    scale: 0, 
                    x: (Math.random() - 0.5) * 200, 
                    y: -Math.random() * 200 - 50 
                  }}
                  transition={{ duration: 1 + Math.random(), ease: "easeOut" }}
                  className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-[#C93D0E] dark:bg-[#FF6B35]"
                />
              ))}
            </AnimatePresence>
          </motion.div>
          <div className="absolute -bottom-8 whitespace-nowrap font-mono text-xs tracking-widest text-[#111111]/60 dark:text-[#EDE9E1]/60">
            32B Model
          </div>
        </div>

        {/* GPT-4o Bar */}
        <div className="relative flex flex-col items-center w-32">
          <span className="absolute -top-10 font-mono text-3xl tabular-nums text-[#111111]/50 dark:text-[#EDE9E1]/50">
            {scoreGPT4}%
          </span>
          <motion.div
            className="w-full bg-[#111111]/20 dark:bg-[#EDE9E1]/20 rounded-t"
            initial={{ height: `${(scoreGPT4 / 100) * 250}px` }}
          />
          <div className="absolute -bottom-8 whitespace-nowrap font-mono text-xs tracking-widest text-[#111111]/60 dark:text-[#EDE9E1]/60">
            GPT-4o (Zero-Shot)
          </div>
        </div>

      </div>
    </div>
  );
}
