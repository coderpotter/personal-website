import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EchoChamber() {
  const [injections, setInjections] = useState(0);

  // Generate an SVG path for a bell curve based on injections
  const variance = Math.max(0.02, 1 - injections * 0.2); // Shrinks from 1.0 down to 0.02
  const maxInjections = 5;

  const generateBellCurve = (v: number) => {
    let path = "";
    for (let x = -3; x <= 3; x += 0.1) {
      // Gaussian function: e^(-(x^2) / (2 * v^2))
      const y = Math.exp(-(x * x) / (2 * v * v));
      
      // Map to SVG coordinates
      const sx = ((x + 3) / 6) * 400; // 0 to 400
      const sy = 200 - y * 180; // 200 down to 20
      
      if (x === -3) path += `M ${sx} ${sy} `;
      else path += `L ${sx} ${sy} `;
    }
    return path;
  };

  const handleInject = () => {
    if (injections < maxInjections) {
      setInjections(i => i + 1);
    }
  };

  const handleReset = () => {
    setInjections(0);
  };

  const possibleActions = ["Walk", "Run", "JUMP", "Sit", "Sleep"];

  return (
    <div className="my-16 border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded-sm bg-[#F8F6F1] dark:bg-[#0D0D0B] overflow-hidden">
      
      {/* Controls */}
      <div className="p-8 border-b border-[#111111]/10 dark:border-[#EDE9E1]/10 bg-[#111111]/[0.02] dark:bg-[#EDE9E1]/[0.02] flex flex-col md:flex-row justify-between gap-8 items-end">
        <div className="flex-1 w-full">
          <h4 className="font-serif text-xl text-[#111111] dark:text-[#EDE9E1] mb-2">
            The Echo Chamber (State Collapse)
          </h4>
          <p className="text-[14px] text-[#111111]/60 dark:text-[#EDE9E1]/60 max-w-md">
            Feed the exact same state matrix back into the context window repeatedly to force the probability distribution to collapse onto a single deterministic action.
          </p>
        </div>
        <div className="flex gap-4 shrink-0">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-[#111111]/50 dark:text-[#EDE9E1]/50 font-mono text-xs hover:text-[#111111] dark:hover:text-[#EDE9E1] transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleInject}
            disabled={injections >= maxInjections}
            className="px-6 py-2 bg-[#C93D0E] text-white dark:bg-[#FF6B35] font-mono text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-opacity rounded disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Inject State Matrix
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row min-h-[350px]">
        
        {/* Context Window Log */}
        <div className="w-full md:w-1/3 border-r border-[#111111]/10 dark:border-[#EDE9E1]/10 bg-[#111111]/5 dark:bg-[#EDE9E1]/5 p-6 flex flex-col">
          <div className="font-mono text-[10px] tracking-widest uppercase text-[#111111]/40 dark:text-[#EDE9E1]/40 mb-4">
            Context Window Log
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 font-mono text-[11px] text-[#111111]/70 dark:text-[#EDE9E1]/70">
            <div className="p-2 border border-[#111111]/10 dark:border-[#EDE9E1]/10 bg-[#F8F6F1] dark:bg-[#0D0D0B] rounded">
              User: What should the agent do?
            </div>
            <AnimatePresence>
              {Array.from({ length: injections }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-2 border border-[#C93D0E]/30 dark:border-[#FF6B35]/30 bg-[#C93D0E]/5 dark:bg-[#FF6B35]/5 text-[#C93D0E] dark:text-[#FF6B35] rounded"
                >
                  STATE_MATRIX_PREV: {"{ action: JUMP }"}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Probability Chart */}
        <div className="w-full md:w-2/3 p-8 relative flex flex-col items-center justify-end overflow-hidden">
          
          <div className="absolute top-8 left-8">
            <div className="font-mono text-[10px] tracking-widest uppercase text-[#111111]/40 dark:text-[#EDE9E1]/40">
              Probability Distribution
            </div>
            <div className="font-mono text-sm text-[#C93D0E] dark:text-[#FF6B35] mt-1">
              Variance (σ²): {variance.toFixed(3)}
            </div>
          </div>

          {injections === maxInjections && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-1/4 right-8 border border-[#C93D0E] text-[#C93D0E] dark:border-[#FF6B35] dark:text-[#FF6B35] px-4 py-2 font-mono text-xs font-bold tracking-widest uppercase bg-[#C93D0E]/10 dark:bg-[#FF6B35]/10 rounded"
            >
              STATE COLLAPSE ACHIEVED
            </motion.div>
          )}

          <div className="relative w-[400px] h-[200px] mb-4">
            <svg width="400" height="200" className="absolute inset-0 overflow-visible">
              
              {/* Background guidelines */}
              <line x1="0" y1="200" x2="400" y2="200" stroke="currentColor" strokeWidth="1" className="text-[#111111]/20 dark:text-[#EDE9E1]/20" />
              <line x1="200" y1="0" x2="200" y2="200" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-[#111111]/10 dark:text-[#EDE9E1]/10" />

              {/* The Bell Curve */}
              <motion.path
                d={generateBellCurve(variance)}
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                className="text-[#C93D0E] dark:text-[#FF6B35]"
                initial={false}
                animate={{ d: generateBellCurve(variance) }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
              />

              {/* Area under curve (fade) */}
              <motion.path
                d={`${generateBellCurve(variance)} L 400 200 L 0 200 Z`}
                fill="currentColor"
                className="text-[#C93D0E]/10 dark:text-[#FF6B35]/10"
                initial={false}
                animate={{ d: `${generateBellCurve(variance)} L 400 200 L 0 200 Z` }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
              />
            </svg>
          </div>

          <div className="flex justify-between w-[400px] font-mono text-[10px] text-[#111111]/50 dark:text-[#EDE9E1]/50 px-4">
            {possibleActions.map((action, i) => (
              <span key={i} className={action === "JUMP" ? "text-[#C93D0E] dark:text-[#FF6B35] font-bold" : ""}>
                {action}
              </span>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
