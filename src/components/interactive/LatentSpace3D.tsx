import { useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

export default function LatentSpace3D() {
  const [specificity, setSpecificity] = useState(0); // 0 to 100
  const marbleControls = useAnimation();
  const [outcome, setOutcome] = useState<string>("Waiting for generation...");

  // Calculate the depth of the central gravity well
  const wellDepth = specificity; // 0 (flat) to 100 (deep)

  // Generate SVG path for the topological landscape
  const generateLandscape = () => {
    let path = "M 0 150 ";
    for (let x = 0; x <= 600; x += 10) {
      // Base noise
      let y = 150 + Math.sin(x * 0.05) * 15;
      
      // Central well (at x=300)
      const distToCenter = Math.abs(x - 300);
      const wellEffect = Math.max(0, 150 - distToCenter) / 150; // 1 at center, 0 at 150px away
      
      y += wellEffect * wellDepth * 1.5; // Dig deep

      path += `L ${x} ${y} `;
    }
    return path;
  };

  const handleNoise = async () => {
    setOutcome("Applying inference noise...");
    
    // The force of the noise
    const noiseForce = 60;
    
    // If the well is shallow (< 50), the noise is stronger than the gravity
    if (specificity < 50) {
      await marbleControls.start({
        x: [300, 300 + noiseForce, 450],
        y: [150 + wellDepth * 1.5, 120, 160],
        transition: { duration: 0.8, type: "spring" }
      });
      setOutcome("Result: Context shifted (Hallucination/Synonym)");
    } else {
      // The well is deep (>= 50), the marble rattles but falls back in
      await marbleControls.start({
        x: [300, 300 + noiseForce * 0.3, 300 - noiseForce * 0.3, 300],
        y: [
          150 + wellDepth * 1.5, 
          150 + wellDepth * 1.5 - 20, 
          150 + wellDepth * 1.5 - 10, 
          150 + wellDepth * 1.5
        ],
        transition: { duration: 0.8, type: "spring", bounce: 0.6 }
      });
      setOutcome("Result: Exact token enforced (Deterministic)");
    }
  };

  const resetMarble = () => {
    marbleControls.set({ x: 300, y: 150 + wellDepth * 1.5 });
    setOutcome("Ready.");
  };

  return (
    <div className="my-16 border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded-sm bg-[#F8F6F1] dark:bg-[#0D0D0B] overflow-hidden">
      
      {/* Controls */}
      <div className="p-8 border-b border-[#111111]/10 dark:border-[#EDE9E1]/10 bg-[#111111]/[0.02] dark:bg-[#EDE9E1]/[0.02] flex flex-col md:flex-row justify-between gap-8">
        <div className="flex-1">
          <label className="font-mono text-xs tracking-widest uppercase text-[#111111]/50 dark:text-[#EDE9E1]/50 block mb-4">
            Prompt Specificity (Semantic Gravity)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={specificity}
            onChange={(e) => {
              setSpecificity(Number(e.target.value));
              resetMarble();
            }}
            className="w-full accent-[#C93D0E] dark:accent-[#FF6B35]"
          />
          <div className="flex justify-between mt-2 font-mono text-[10px] text-[#111111]/30 dark:text-[#EDE9E1]/30">
            <span>Diffuse ("Summarize")</span>
            <span>Anchored ("Monolexemic")</span>
          </div>
        </div>

        <div className="shrink-0 flex items-end">
          <button
            onClick={handleNoise}
            className="px-6 py-2 bg-[#C93D0E] text-white dark:bg-[#FF6B35] font-mono text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-opacity rounded"
          >
            Apply GPU Noise
          </button>
        </div>
      </div>

      {/* Viewport */}
      <div className="relative h-[300px] w-full flex items-center justify-center overflow-hidden">
        
        {/* SVG Landscape */}
        <svg width="100%" height="100%" viewBox="0 0 600 300" preserveAspectRatio="none" className="absolute inset-0">
          <motion.path
            d={generateLandscape()}
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            className="text-[#111111]/10 dark:text-[#EDE9E1]/10"
            transition={{ type: "spring", bounce: 0 }}
          />
          <motion.path
            d={generateLandscape()}
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            className="text-[#C93D0E] dark:text-[#FF6B35]"
            style={{ transform: 'translateY(10px)', opacity: 0.5 }}
            transition={{ type: "spring", bounce: 0 }}
          />
        </svg>

        {/* The Target Token / Marble */}
        <motion.div
          animate={marbleControls}
          initial={{ x: 300, y: 150 + wellDepth * 1.5 }}
          className="absolute top-0 left-0 w-6 h-6 -ml-3 -mt-3 rounded-full bg-[#111111] dark:bg-[#EDE9E1] shadow-[0_0_15px_rgba(0,0,0,0.5)] border-2 border-[#C93D0E] dark:border-[#FF6B35] flex items-center justify-center z-10"
        >
          <div className="w-1 h-1 bg-[#C93D0E] dark:bg-[#FF6B35] rounded-full" />
        </motion.div>

        {/* Overlay text */}
        <div className="absolute top-6 left-6 font-mono text-[10px] tracking-widest uppercase text-[#111111]/40 dark:text-[#EDE9E1]/40">
          Latent Space Topology
        </div>
        
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#111111] dark:bg-[#EDE9E1] text-[#F8F6F1] dark:text-[#0D0D0B] font-mono text-[11px] tracking-widest px-4 py-2 rounded">
          {outcome}
        </div>
      </div>
    </div>
  );
}
