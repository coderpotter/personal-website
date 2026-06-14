import { useState } from "react";
import { motion } from "framer-motion";

export default function PerformanceLeap() {
  const [firmness, setFirmness] = useState(0); // 0 to 100

  // Calculate the y-position (accuracy) and cloud size (entropy) based on firmness
  // Accuracy goes from 42 to 96
  const currentAccuracy = 42 + (firmness / 100) * 54;
  
  // Cloud radius goes from 80px down to 0px
  const cloudRadius = 80 * (1 - firmness / 100);

  return (
    <div className="my-16 border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded-sm bg-[#F8F6F1] dark:bg-[#0D0D0B] overflow-hidden">
      
      {/* Controls */}
      <div className="p-8 border-b border-[#111111]/10 dark:border-[#EDE9E1]/10 bg-[#111111]/[0.02] dark:bg-[#EDE9E1]/[0.02]">
        <div className="flex flex-col md:flex-row justify-between gap-8 items-end">
          <div className="flex-1 w-full">
            <h4 className="font-serif text-xl text-[#111111] dark:text-[#EDE9E1] mb-6">
              Unsupervised Entropy Minimization
            </h4>
            <label className="font-mono text-xs tracking-widest uppercase text-[#111111]/50 dark:text-[#EDE9E1]/50 block mb-4">
              Prompt Firmness / Constraint Rigidity
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={firmness}
              onChange={(e) => setFirmness(Number(e.target.value))}
              className="w-full accent-[#C93D0E] dark:accent-[#FF6B35]"
            />
            <div className="flex justify-between mt-2 font-mono text-[10px] text-[#111111]/30 dark:text-[#EDE9E1]/30">
              <span>Standard (High Entropy)</span>
              <span>Forced Collapse (Zero Entropy)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scatterplot */}
      <div className="p-8 md:p-12 relative min-h-[450px]">
        
        {/* Y Axis (Accuracy) */}
        <div className="absolute left-8 top-12 bottom-12 w-[1px] bg-[#111111]/20 dark:bg-[#EDE9E1]/20"></div>
        <div className="absolute left-4 top-10 font-mono text-[10px] text-[#111111]/40 dark:text-[#EDE9E1]/40">100%</div>
        <div className="absolute left-4 top-[50%] font-mono text-[10px] text-[#111111]/40 dark:text-[#EDE9E1]/40">50%</div>
        <div className="absolute left-4 bottom-10 font-mono text-[10px] text-[#111111]/40 dark:text-[#EDE9E1]/40">0%</div>
        <div className="absolute left-10 top-6 font-mono text-[10px] tracking-widest uppercase text-[#111111]/40 dark:text-[#EDE9E1]/40">
          Reasoning Accuracy
        </div>

        {/* X Axis (Model Size) */}
        <div className="absolute left-8 bottom-12 right-12 h-[1px] bg-[#111111]/20 dark:bg-[#EDE9E1]/20"></div>
        <div className="absolute bottom-6 right-12 font-mono text-[10px] tracking-widest uppercase text-[#111111]/40 dark:text-[#EDE9E1]/40">
          Model Parameter Count →
        </div>

        {/* The Graph Area (mapping 0-100% to bottom-top) */}
        <div className="absolute left-[60px] right-[60px] top-[48px] bottom-[48px] border-l border-b border-transparent">
          
          {/* GPT-4 Baseline (Static) */}
          <div className="absolute left-[80%] bottom-[95%] -translate-x-1/2 translate-y-1/2 flex flex-col items-center pointer-events-none">
            <div className="w-4 h-4 rounded-full bg-[#111111] dark:bg-[#EDE9E1]" />
            <span className="font-mono text-xs mt-2 text-[#111111]/60 dark:text-[#EDE9E1]/60">GPT-4o (1.5T+)</span>
            <span className="font-mono text-[10px] text-[#111111]/40 dark:text-[#EDE9E1]/40">95% Baseline</span>
          </div>

          {/* 32B Model (Dynamic) */}
          <motion.div 
            className="absolute left-[20%] -translate-x-1/2 translate-y-1/2 flex flex-col items-center pointer-events-none z-10"
            style={{ bottom: `${currentAccuracy}%` }}
          >
            {/* The Entropy Cloud */}
            <motion.div 
              className="absolute top-[8px] left-[8px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C93D0E]/20 dark:bg-[#FF6B35]/20 blur-md pointer-events-none"
              style={{ width: cloudRadius * 2, height: cloudRadius * 2 }}
            />
            
            {/* The Core */}
            <div className="w-4 h-4 rounded-full bg-[#C93D0E] dark:bg-[#FF6B35] relative z-10 shadow-[0_0_10px_rgba(201,61,14,0.5)]" />
            
            <div className="mt-4 flex flex-col items-center text-center w-32">
              <span className="font-mono text-xs text-[#C93D0E] dark:text-[#FF6B35] font-bold">32B Model</span>
              <span className="font-mono text-[10px] text-[#111111]/60 dark:text-[#EDE9E1]/60">
                {currentAccuracy.toFixed(1)}% Accuracy
              </span>
            </div>
          </motion.div>

          {/* Connective Line (Shows trajectory) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            <motion.line
              x1="20%" y1="58%" // 42% from bottom = 58% from top
              x2="20%" y2={`${100 - currentAccuracy}%`}
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="text-[#C93D0E]/40 dark:text-[#FF6B35]/40"
            />
          </svg>

        </div>
        
        {/* Floating Explanation Box */}
        <div className="absolute top-12 right-12 max-w-xs text-[12px] leading-relaxed text-[#111111]/60 dark:text-[#EDE9E1]/60 bg-[#111111]/5 dark:bg-[#EDE9E1]/5 p-4 rounded border border-[#111111]/10 dark:border-[#EDE9E1]/10">
          <p>As prompt constraint increases, the model's stochastic exploration (the entropy cloud) is forcibly collapsed. Deprived of the ability to 'wander', the small model is forced to rely purely on its deepest pretraining priors, instantly jumping to GPT-4 level performance.</p>
        </div>

      </div>
    </div>
  );
}
