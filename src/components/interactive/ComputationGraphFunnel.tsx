import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function ComputationGraphFunnel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(100);
  
  // Transform x position to a clip path width (0% to 100%)
  // Container is roughly 100% wide, we'll map 0-500px to 0-100%
  const clipWidth = useTransform(x, [0, 500], ["0%", "100%"]);
  const opacityLate = useTransform(x, [350, 450], [0, 1]);
  const opacityEarly = useTransform(x, [0, 100], [0.2, 1]);

  return (
    <div className="my-16 p-8 border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded-sm bg-[#111111]/[0.02] dark:bg-[#EDE9E1]/[0.02]">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h4 className="font-serif text-xl text-[#111111] dark:text-[#EDE9E1] mb-2">
            Drag the Constraint Wall
          </h4>
          <p className="text-[14px] text-[#111111]/60 dark:text-[#EDE9E1]/60">
            Move left for early JSON clamping. Move right for Unified Decoding (State -1 to State 0).
          </p>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="relative h-[300px] w-full bg-[#F8F6F1] dark:bg-[#0D0D0B] border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded overflow-hidden"
      >
        {/* The Tree (SVG) */}
        <motion.div 
          className="absolute inset-0"
          style={{ WebkitClipPath: useTransform(clipWidth, w => `polygon(0 0, ${w} 0, ${w} 100%, 0% 100%)`) }}
        >
          <svg width="100%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="none">
            {/* Base line */}
            <path d="M 0 150 C 100 150, 150 150, 200 150" stroke="currentColor" strokeWidth="2" fill="none" className="text-[#111111]/30 dark:text-[#EDE9E1]/30" />
            
            {/* Early branches (Truncated if wall is left) */}
            <path d="M 200 150 C 250 50, 300 50, 400 50" stroke="currentColor" strokeWidth="2" fill="none" className="text-[#111111]/30 dark:text-[#EDE9E1]/30" />
            <path d="M 200 150 C 250 250, 300 250, 400 250" stroke="currentColor" strokeWidth="2" fill="none" className="text-[#111111]/30 dark:text-[#EDE9E1]/30" />
            <path d="M 200 150 L 400 150" stroke="currentColor" strokeWidth="2" fill="none" className="text-[#111111]/30 dark:text-[#EDE9E1]/30" />
            
            {/* Complex reasoning web */}
            <path d="M 400 50 C 500 50, 500 100, 600 150" stroke="currentColor" strokeWidth="2" fill="none" className="text-[#111111]/30 dark:text-[#EDE9E1]/30" />
            <path d="M 400 250 C 500 250, 500 200, 600 150" stroke="currentColor" strokeWidth="2" fill="none" className="text-[#111111]/30 dark:text-[#EDE9E1]/30" />
            <path d="M 400 150 L 600 150" stroke="currentColor" strokeWidth="2" fill="none" className="text-[#C93D0E] dark:text-[#FF6B35]" />
            
            {/* Funnel into JSON */}
            <path d="M 600 150 L 700 150" stroke="currentColor" strokeWidth="4" fill="none" className="text-[#C93D0E] dark:text-[#FF6B35]" />
          </svg>

          {/* Labels for tree sections */}
          <motion.div style={{ opacity: opacityEarly }} className="absolute left-[250px] top-[20px] font-mono text-[10px] text-[#111111]/40 dark:text-[#EDE9E1]/40">
            State -1: Reasoning
          </motion.div>
          <motion.div style={{ opacity: opacityLate }} className="absolute right-[40px] top-[135px] font-mono text-sm text-[#C93D0E] dark:text-[#FF6B35] font-bold bg-[#F8F6F1] dark:bg-[#0D0D0B] p-2">
            {"{ answer: 42 }"}
          </motion.div>
        </motion.div>

        {/* The Drag Wall */}
        <motion.div
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0}
          dragMomentum={false}
          style={{ x }}
          className="absolute top-0 bottom-0 w-2 bg-[#C93D0E] dark:bg-[#FF6B35] cursor-col-resize flex flex-col items-center justify-center group z-10"
        >
          <div className="absolute -top-8 whitespace-nowrap font-mono text-[10px] tracking-widest text-[#C93D0E] dark:text-[#FF6B35] bg-[#F8F6F1] dark:bg-[#0D0D0B] px-2 py-1 rounded border border-[#C93D0E]/30 dark:border-[#FF6B35]/30">
            CONSTRAINT
          </div>
          <div className="h-12 w-6 bg-[#C93D0E] dark:bg-[#FF6B35] rounded-full flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
            <div className="w-0.5 h-6 bg-[#F8F6F1] dark:bg-[#0D0D0B]" />
            <div className="w-0.5 h-6 bg-[#F8F6F1] dark:bg-[#0D0D0B] ml-1" />
          </div>
        </motion.div>

        {/* Start Point label */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[10px] text-[#111111]/40 dark:text-[#EDE9E1]/40">
          Prompt In
        </div>
      </div>
    </div>
  );
}
