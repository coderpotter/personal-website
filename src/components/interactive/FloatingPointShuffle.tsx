import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function FloatingPointShuffle() {
  const [load, setLoad] = useState(20);
  const [isGroupedLeft, setIsGroupedLeft] = useState(true);

  useEffect(() => {
    // If load < 50, (a+b)+c. If load >= 50, a+(b+c)
    setIsGroupedLeft(load < 50);
  }, [load]);

  const a = 0.1;
  const b = 0.2;
  const c = 0.3;

  const resLeft = (a + b) + c; // 0.6000000000000001
  const resRight = a + (b + c); // 0.6

  const currentResult = isGroupedLeft ? resLeft : resRight;

  return (
    <div className="my-16 p-8 border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded-sm bg-[#111111]/[0.02] dark:bg-[#EDE9E1]/[0.02]">
      <div className="mb-8">
        <label className="font-mono text-xs tracking-widest uppercase text-[#111111]/45 dark:text-[#EDE9E1]/45 block mb-4">
          Simulated API Traffic / Batch Size
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={load}
          onChange={(e) => setLoad(Number(e.target.value))}
          className="w-full accent-[#C93D0E] dark:accent-[#FF6B35]"
        />
        <div className="flex justify-between mt-2 font-mono text-[10px] text-[#111111]/30 dark:text-[#EDE9E1]/30">
          <span>Low Traffic</span>
          <span>High Traffic</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-10">
        <div className="flex items-center gap-2 font-mono text-2xl text-[#111111] dark:text-[#EDE9E1]">
          {isGroupedLeft ? (
            <>
              <motion.span layout className="text-[#C93D0E] dark:text-[#FF6B35]">(</motion.span>
              <motion.div layout className="w-12 h-12 flex items-center justify-center bg-[#111111]/10 dark:bg-[#EDE9E1]/10 rounded">a</motion.div>
              <motion.span layout>+</motion.span>
              <motion.div layout className="w-12 h-12 flex items-center justify-center bg-[#111111]/10 dark:bg-[#EDE9E1]/10 rounded">b</motion.div>
              <motion.span layout className="text-[#C93D0E] dark:text-[#FF6B35]">)</motion.span>
              <motion.span layout>+</motion.span>
              <motion.div layout className="w-12 h-12 flex items-center justify-center bg-[#111111]/10 dark:bg-[#EDE9E1]/10 rounded">c</motion.div>
            </>
          ) : (
            <>
              <motion.div layout className="w-12 h-12 flex items-center justify-center bg-[#111111]/10 dark:bg-[#EDE9E1]/10 rounded">a</motion.div>
              <motion.span layout>+</motion.span>
              <motion.span layout className="text-[#C93D0E] dark:text-[#FF6B35]">(</motion.span>
              <motion.div layout className="w-12 h-12 flex items-center justify-center bg-[#111111]/10 dark:bg-[#EDE9E1]/10 rounded">b</motion.div>
              <motion.span layout>+</motion.span>
              <motion.div layout className="w-12 h-12 flex items-center justify-center bg-[#111111]/10 dark:bg-[#EDE9E1]/10 rounded">c</motion.div>
              <motion.span layout className="text-[#C93D0E] dark:text-[#FF6B35]">)</motion.span>
            </>
          )}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[#111111]/10 dark:border-[#EDE9E1]/10 text-center">
        <p className="font-mono text-[10px] tracking-widest uppercase text-[#111111]/45 dark:text-[#EDE9E1]/45 mb-2">
          Computed Output
        </p>
        <p className="font-mono text-xl text-[#C93D0E] dark:text-[#FF6B35] transition-colors">
          {currentResult.toString()}
        </p>
        <p className="font-mono text-[11px] text-[#111111]/45 dark:text-[#EDE9E1]/45 mt-4">
          a = 0.1, b = 0.2, c = 0.3
        </p>
      </div>
    </div>
  );
}
