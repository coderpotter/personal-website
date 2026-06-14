import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

function generateNoise(length: number) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function ASCIIMathPipeline() {
  const [seed, setSeed] = useState(() => generateNoise(12));
  const [scrub, setScrub] = useState(0); // 0 to length

  const currentSum = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < scrub; i++) {
      sum += seed.charCodeAt(i);
    }
    return sum;
  }, [seed, scrub]);

  const moduloResult = currentSum % 2;
  const isDone = scrub === seed.length;

  return (
    <div className="my-16 border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded-sm bg-[#F8F6F1] dark:bg-[#0D0D0B] overflow-hidden">
      
      {/* Controls */}
      <div className="p-8 border-b border-[#111111]/10 dark:border-[#EDE9E1]/10 bg-[#111111]/[0.02] dark:bg-[#EDE9E1]/[0.02] flex flex-col md:flex-row justify-between gap-8 items-end">
        <div className="flex-1 w-full">
          <label className="font-mono text-xs tracking-widest uppercase text-[#111111]/50 dark:text-[#EDE9E1]/50 block mb-4">
            Execution Scrubber
          </label>
          <input
            type="range"
            min="0"
            max={seed.length}
            value={scrub}
            onChange={(e) => setScrub(Number(e.target.value))}
            className="w-full accent-[#C93D0E] dark:accent-[#FF6B35]"
          />
        </div>
        <button
          onClick={() => { setSeed(generateNoise(12)); setScrub(0); }}
          className="px-6 py-2 border border-[#C93D0E] text-[#C93D0E] dark:border-[#FF6B35] dark:text-[#FF6B35] font-mono text-xs tracking-widest hover:bg-[#C93D0E]/5 transition-colors rounded whitespace-nowrap"
        >
          Generate New SSoT
        </button>
      </div>

      <div className="p-8 md:p-12">
        {/* The Scratchpad String */}
        <div className="bg-[#111111]/5 dark:bg-[#EDE9E1]/5 rounded p-6 font-mono text-center mb-12 border border-[#111111]/10 dark:border-[#EDE9E1]/10 relative overflow-hidden">
          <div className="text-[10px] text-[#111111]/30 dark:text-[#EDE9E1]/30 mb-2">&lt;random_string&gt;</div>
          <div className="text-3xl tracking-[0.3em] font-light">
            {seed.split("").map((char, i) => (
              <span 
                key={i} 
                className={`transition-colors duration-200 inline-block ${i < scrub ? 'text-[#C93D0E] dark:text-[#FF6B35] font-bold -translate-y-1' : 'text-[#111111]/40 dark:text-[#EDE9E1]/40'}`}
                style={{ transition: 'all 0.2s ease' }}
              >
                {char}
              </span>
            ))}
          </div>
          <div className="text-[10px] text-[#111111]/30 dark:text-[#EDE9E1]/30 mt-2">&lt;/random_string&gt;</div>
        </div>

        {/* Execution Trace Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* ASCII Parser */}
          <div className="flex flex-col items-center justify-center p-6 bg-[#111111]/[0.02] dark:bg-[#EDE9E1]/[0.02] border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded">
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#111111]/50 dark:text-[#EDE9E1]/50 mb-4">
              Current Char ASCII
            </span>
            <div className="text-4xl font-mono text-[#111111] dark:text-[#EDE9E1] h-12">
              {scrub > 0 && scrub <= seed.length ? (
                <motion.div
                  key={scrub}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-baseline gap-2"
                >
                  <span className="text-lg text-[#111111]/40 dark:text-[#EDE9E1]/40">'{seed[scrub-1]}' →</span>
                  <span>{seed.charCodeAt(scrub-1)}</span>
                </motion.div>
              ) : (
                <span className="text-[#111111]/20 dark:text-[#EDE9E1]/20">--</span>
              )}
            </div>
          </div>

          {/* Rolling Sum */}
          <div className="flex flex-col items-center justify-center p-6 bg-[#111111]/[0.02] dark:bg-[#EDE9E1]/[0.02] border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded relative overflow-hidden">
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#111111]/50 dark:text-[#EDE9E1]/50 mb-4">
              Rolling Sum
            </span>
            <div className="text-4xl font-mono text-[#111111] dark:text-[#EDE9E1] h-12 flex items-center">
              {currentSum}
            </div>
            {/* Ping effect on change */}
            <AnimatePresence>
              {scrub > 0 && (
                <motion.div
                  key={`ping-${scrub}`}
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-[#C93D0E]/10 dark:bg-[#FF6B35]/10 rounded-full pointer-events-none"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Modulo Result */}
          <div className="flex flex-col items-center justify-center p-6 bg-[#111111]/[0.02] dark:bg-[#EDE9E1]/[0.02] border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded">
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#111111]/50 dark:text-[#EDE9E1]/50 mb-4">
              Sum Modulo 2
            </span>
            <div className="text-4xl font-serif h-12 flex flex-col items-center justify-center w-full relative">
              
              <div className="flex w-full justify-between px-4 font-mono text-xl">
                <span className={`transition-colors ${moduloResult === 0 ? "text-[#C93D0E] dark:text-[#FF6B35] font-bold" : "text-[#111111]/20 dark:text-[#EDE9E1]/20"}`}>
                  EVEN (A)
                </span>
                <span className={`transition-colors ${moduloResult === 1 ? "text-[#C93D0E] dark:text-[#FF6B35] font-bold" : "text-[#111111]/20 dark:text-[#EDE9E1]/20"}`}>
                  ODD (B)
                </span>
              </div>
              
              {/* Highlight bar */}
              <motion.div
                className="absolute bottom-0 h-1 bg-[#C93D0E] dark:bg-[#FF6B35]"
                initial={false}
                animate={{ 
                  left: moduloResult === 0 ? "10%" : "60%",
                  width: "30%" 
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />

            </div>
          </div>

        </div>

        {isDone && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center font-mono text-sm text-[#C93D0E] dark:text-[#FF6B35] bg-[#C93D0E]/10 dark:bg-[#FF6B35]/10 py-3 rounded"
          >
            Final deterministic choice: {moduloResult === 0 ? "OPTION A" : "OPTION B"}
          </motion.div>
        )}
      </div>
    </div>
  );
}
