import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EchoChamber() {
  const [injections, setInjections] = useState(0);

  const handleInject = () => {
    if (injections < 5) setInjections(i => i + 1);
  };

  const handleReset = () => {
    setInjections(0);
  };

  // Math for the bell curve: y = e^(-x^2 / (2 * variance))
  // The variance decreases with each injection.
  const variance = Math.max(0.01, 2 - injections * 0.45);
  
  // Generate SVG path for bell curve
  const points = [];
  for (let x = -5; x <= 5; x += 0.1) {
    const y = Math.exp(-(x * x) / (2 * variance));
    // map x: -5..5 -> 0..600
    // map y: 0..1 -> 200..0
    const sx = ((x + 5) / 10) * 600;
    const sy = 200 - y * 180;
    points.push(`${sx},${sy}`);
  }
  const d = `M ${points.join(" L ")}`;

  return (
    <div className="my-16 p-8 border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded-sm bg-[#111111]/[0.02] dark:bg-[#EDE9E1]/[0.02]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h4 className="font-serif text-xl text-[#111111] dark:text-[#EDE9E1] mb-2">
            The Echo Chamber
          </h4>
          <p className="text-[14px] text-[#111111]/60 dark:text-[#EDE9E1]/60">
            Inject state matrix back into the context to induce State Collapse.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleReset}
            className="px-4 py-2 border border-[#111111]/20 dark:border-[#EDE9E1]/20 text-[#111111]/60 dark:text-[#EDE9E1]/60 rounded font-mono text-xs tracking-widest hover:bg-[#111111]/5 dark:hover:bg-[#EDE9E1]/5 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleInject}
            disabled={injections >= 5}
            className="px-4 py-2 border border-[#C93D0E] text-[#C93D0E] dark:border-[#FF6B35] dark:text-[#FF6B35] rounded font-mono text-xs tracking-widest hover:bg-[#C93D0E]/10 dark:hover:bg-[#FF6B35]/10 transition-colors disabled:opacity-50"
          >
            Inject State
          </button>
        </div>
      </div>

      <div className="relative h-[250px] w-full bg-[#F8F6F1] dark:bg-[#0D0D0B] border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded flex items-center justify-center overflow-hidden">
        
        {/* The Bell Curve */}
        <svg width="100%" height="200" viewBox="0 0 600 200" preserveAspectRatio="none" className="absolute bottom-0 z-10">
          <motion.path
            d={d}
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            className="text-[#C93D0E] dark:text-[#FF6B35]"
            initial={false}
            animate={{ d }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
          />
          {/* Baseline */}
          <path d="M 0 200 L 600 200" stroke="currentColor" strokeWidth="2" className="text-[#111111]/20 dark:text-[#EDE9E1]/20" />
        </svg>

        {/* Floating Context Blocks */}
        <AnimatePresence>
          {Array.from({ length: injections }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5, x: 200, y: -50 }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5], x: [200, 0, -200], y: [-50, -80, -50] }}
              transition={{ duration: 1.5, ease: "easeInOut", times: [0, 0.5, 1] }}
              className="absolute z-20 font-mono text-[10px] tracking-widest text-white bg-[#C93D0E] dark:bg-[#FF6B35] px-3 py-1 rounded"
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              STATE_MATRIX_{i}
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="absolute top-4 left-4 font-mono text-[10px] text-[#111111]/40 dark:text-[#EDE9E1]/40">
          Probability Distribution (Entropy)
        </div>
        <div className="absolute top-4 right-4 font-mono text-[10px] text-[#C93D0E] dark:text-[#FF6B35]">
          Variance: {variance.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
