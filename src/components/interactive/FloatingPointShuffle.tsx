import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingPointShuffle() {
  const [mode, setMode] = useState<"left" | "right">("left"); // "left" = (A+B)+C, "right" = A+(B+C)

  const a = 0.1;
  const b = 0.2;
  const c = 0.3;

  const intermediateLeft = a + b; // 0.30000000000000004
  const finalLeft = intermediateLeft + c; // 0.6000000000000001

  const intermediateRight = b + c; // 0.5
  const finalRight = a + intermediateRight; // 0.6

  return (
    <div className="my-16 border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded-sm bg-[#F8F6F1] dark:bg-[#0D0D0B] overflow-hidden">
      
      {/* Top Controls */}
      <div className="p-8 border-b border-[#111111]/10 dark:border-[#EDE9E1]/10 bg-[#111111]/[0.02] dark:bg-[#EDE9E1]/[0.02]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h4 className="font-serif text-xl text-[#111111] dark:text-[#EDE9E1] mb-2">
              The Batching Dilemma
            </h4>
            <p className="text-[14px] text-[#111111]/60 dark:text-[#EDE9E1]/60 max-w-md">
              Toggle the GPU accumulation order to see how microscopic floating-point rounding errors change the final output.
            </p>
          </div>
          <div className="flex bg-[#111111]/10 dark:bg-[#EDE9E1]/10 rounded p-1 font-mono text-xs tracking-widest shrink-0">
            <button
              onClick={() => setMode("left")}
              className={`px-4 py-2 rounded transition-colors ${mode === "left" ? "bg-[#F8F6F1] dark:bg-[#0D0D0B] text-[#C93D0E] dark:text-[#FF6B35] shadow" : "text-[#111111]/60 dark:text-[#EDE9E1]/60 hover:text-[#111111] dark:hover:text-[#EDE9E1]"}`}
            >
              (A + B) + C
            </button>
            <button
              onClick={() => setMode("right")}
              className={`px-4 py-2 rounded transition-colors ${mode === "right" ? "bg-[#F8F6F1] dark:bg-[#0D0D0B] text-[#C93D0E] dark:text-[#FF6B35] shadow" : "text-[#111111]/60 dark:text-[#EDE9E1]/60 hover:text-[#111111] dark:hover:text-[#EDE9E1]"}`}
            >
              A + (B + C)
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Math Viewport */}
      <div className="relative p-8 md:p-16 min-h-[400px] flex flex-col items-center justify-center font-mono select-none">
        
        {/* The Equation */}
        <div className="flex items-center gap-2 text-3xl text-[#111111]/80 dark:text-[#EDE9E1]/80 relative z-10">
          
          <motion.span layout className="relative">
            {mode === "left" && <motion.span layoutId="paren-open" className="absolute -left-6 text-[#C93D0E] dark:text-[#FF6B35] font-light">(</motion.span>}
            {a.toFixed(1)}
          </motion.span>
          
          <span className="text-[#111111]/40 dark:text-[#EDE9E1]/40">+</span>
          
          <motion.span layout className="relative">
            {mode === "right" && <motion.span layoutId="paren-open" className="absolute -left-6 text-[#C93D0E] dark:text-[#FF6B35] font-light">(</motion.span>}
            {b.toFixed(1)}
            {mode === "left" && <motion.span layoutId="paren-close" className="absolute -right-6 text-[#C93D0E] dark:text-[#FF6B35] font-light">)</motion.span>}
          </motion.span>
          
          <span className="text-[#111111]/40 dark:text-[#EDE9E1]/40">+</span>
          
          <motion.span layout className="relative">
            {c.toFixed(1)}
            {mode === "right" && <motion.span layoutId="paren-close" className="absolute -right-6 text-[#C93D0E] dark:text-[#FF6B35] font-light">)</motion.span>}
          </motion.span>
        </div>

        {/* Tree connectors (SVG) */}
        <div className="relative w-full h-16 mt-4">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <motion.path
              d={mode === "left" ? "M 50% 0 Q 30% 20, 40% 50" : "M 50% 0 Q 70% 20, 60% 50"}
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-[#C93D0E] dark:text-[#FF6B35]"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
          </svg>
        </div>

        {/* Intermediate Step */}
        <div className="flex items-center gap-4 text-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center gap-4"
            >
              {mode === "left" ? (
                <>
                  <span className="bg-[#C93D0E]/10 dark:bg-[#FF6B35]/10 text-[#C93D0E] dark:text-[#FF6B35] px-3 py-1 rounded">
                    {intermediateLeft}
                  </span>
                  <span className="text-[#111111]/40 dark:text-[#EDE9E1]/40">+ {c.toFixed(1)}</span>
                </>
              ) : (
                <>
                  <span className="text-[#111111]/40 dark:text-[#EDE9E1]/40">{a.toFixed(1)} +</span>
                  <span className="bg-[#C93D0E]/10 dark:bg-[#FF6B35]/10 text-[#C93D0E] dark:text-[#FF6B35] px-3 py-1 rounded">
                    {intermediateRight}
                  </span>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-[2px] h-8 bg-[#111111]/10 dark:bg-[#EDE9E1]/10 mt-6 mb-4"></div>

        {/* Final Step */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] tracking-widest uppercase text-[#111111]/40 dark:text-[#EDE9E1]/40 mb-2">Final Output</span>
          <AnimatePresence mode="wait">
            <motion.div
              key={mode + "-final"}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-4xl ${mode === "left" ? "text-[#C93D0E] dark:text-[#FF6B35]" : "text-[#111111] dark:text-[#EDE9E1]"}`}
            >
              {mode === "left" ? finalLeft : finalRight}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
