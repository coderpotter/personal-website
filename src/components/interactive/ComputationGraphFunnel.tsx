import { useState } from "react";
import { motion } from "framer-motion";

export default function ComputationGraphFunnel() {
  const [mode, setMode] = useState<"strict" | "unified">("strict");
  const [constraintDepth, setConstraintDepth] = useState(0);

  // Nodes for the tree
  // Level 0 (Root) -> Level 1 (2 nodes) -> Level 2 (4 nodes) -> Level 3 (8 nodes) -> Level 4 (Answer)
  const levels = [
    [{ id: "0-0", x: 50 }],
    [{ id: "1-0", x: 20 }, { id: "1-1", x: 80 }],
    [{ id: "2-0", x: 10 }, { id: "2-1", x: 30 }, { id: "2-2", x: 70 }, { id: "2-3", x: 90 }],
    [{ id: "3-0", x: 5 }, { id: "3-1", x: 15 }, { id: "3-2", x: 25 }, { id: "3-3", x: 35 }, { id: "3-4", x: 65 }, { id: "3-5", x: 75 }, { id: "3-6", x: 85 }, { id: "3-7", x: 95 }],
  ];

  const targetNodeId = "3-2"; // The correct reasoning path

  const handleModeChange = (newMode: "strict" | "unified") => {
    setMode(newMode);
    setConstraintDepth(newMode === "strict" ? 1 : 4);
  };

  return (
    <div className="my-16 border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded-sm bg-[#F8F6F1] dark:bg-[#0D0D0B] overflow-hidden">
      
      {/* Controls */}
      <div className="p-8 border-b border-[#111111]/10 dark:border-[#EDE9E1]/10 bg-[#111111]/[0.02] dark:bg-[#EDE9E1]/[0.02]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h4 className="font-serif text-xl text-[#111111] dark:text-[#EDE9E1] mb-2">
              Decoding Constraints
            </h4>
            <p className="text-[14px] text-[#111111]/60 dark:text-[#EDE9E1]/60 max-w-md">
              See how enforcing a JSON schema at token 1 prunes the reasoning tree prematurely compared to Unified Decoding.
            </p>
          </div>
          <div className="flex bg-[#111111]/10 dark:bg-[#EDE9E1]/10 rounded p-1 font-mono text-xs tracking-widest shrink-0">
            <button
              onClick={() => handleModeChange("strict")}
              className={`px-4 py-2 rounded transition-colors ${mode === "strict" ? "bg-[#F8F6F1] dark:bg-[#0D0D0B] text-[#C93D0E] dark:text-[#FF6B35] shadow" : "text-[#111111]/60 dark:text-[#EDE9E1]/60"}`}
            >
              Strict JSON
            </button>
            <button
              onClick={() => handleModeChange("unified")}
              className={`px-4 py-2 rounded transition-colors ${mode === "unified" ? "bg-[#F8F6F1] dark:bg-[#0D0D0B] text-[#C93D0E] dark:text-[#FF6B35] shadow" : "text-[#111111]/60 dark:text-[#EDE9E1]/60"}`}
            >
              Unified Decoding
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Graph Viewport */}
      <div className="relative p-8 min-h-[400px] flex items-center justify-center font-mono">
        
        <div className="relative w-full max-w-lg h-[300px]">
          
          {/* Target Highlight */}
          <div className="absolute bottom-[-20px] left-[25%] -translate-x-1/2 flex flex-col items-center text-[#C93D0E] dark:text-[#FF6B35]">
            <div className="text-[10px] uppercase tracking-widest mb-1">Target Answer</div>
            <div className="w-2 h-2 rounded-full bg-[#C93D0E] dark:bg-[#FF6B35] animate-ping" />
          </div>

          {/* SVG Lines */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            {levels.map((level, i) => {
              if (i === levels.length - 1) return null;
              return level.map((node, j) => {
                // Connect to two children in the next level
                const children = levels[i + 1].slice(j * 2, j * 2 + 2);
                return children.map((child, k) => {
                  
                  // In strict mode, if we are outside the "pipe" (x = 40 to 60), the branch is pruned.
                  const isPrunedStrict = mode === "strict" && Math.abs(child.x - 50) > 10;
                  
                  return (
                    <motion.line
                      key={`${node.id}-${child.id}`}
                      x1={`${node.x}%`} y1={`${(i / 3) * 100}%`}
                      x2={`${child.x}%`} y2={`${((i + 1) / 3) * 100}%`}
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`${isPrunedStrict ? "text-[#111111]/10 dark:text-[#EDE9E1]/10" : "text-[#111111]/40 dark:text-[#EDE9E1]/40"}`}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.2 }}
                    />
                  );
                });
              });
            })}
          </svg>

          {/* Constraint Pipe Visual */}
          <motion.div
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 border-x-2 border-dashed border-[#C93D0E]/50 dark:border-[#FF6B35]/50 bg-[#C93D0E]/5 dark:bg-[#FF6B35]/5 pointer-events-none"
            initial={false}
            animate={{ 
              width: mode === "strict" ? "20%" : "100%",
              opacity: mode === "strict" ? 1 : 0
            }}
            transition={{ type: "spring", bounce: 0 }}
          />

          <motion.div
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 border-x-2 border-dashed border-[#111111]/20 dark:border-[#EDE9E1]/20 bg-[#111111]/5 dark:bg-[#EDE9E1]/5 pointer-events-none"
            initial={false}
            animate={{ 
              width: mode === "unified" ? "100%" : "20%",
              opacity: mode === "unified" ? 1 : 0
            }}
            transition={{ type: "spring", bounce: 0 }}
          />

          {/* Labels */}
          <div className="absolute top-4 -right-16 text-[10px] tracking-widest text-[#111111]/40 dark:text-[#EDE9E1]/40 uppercase">Token 1</div>
          <div className="absolute bottom-0 -right-16 text-[10px] tracking-widest text-[#111111]/40 dark:text-[#EDE9E1]/40 uppercase">Token N</div>
          
        </div>
        
        {/* Explanation Text */}
        <div className="absolute bottom-8 right-8 max-w-xs text-[12px] leading-relaxed text-[#111111]/60 dark:text-[#EDE9E1]/60 bg-[#111111]/5 dark:bg-[#EDE9E1]/5 p-4 rounded border border-[#111111]/10 dark:border-[#EDE9E1]/10">
          {mode === "strict" ? (
            <p><strong>Strict JSON:</strong> The schema restricts the vocabulary instantly. The model is forced down a narrow pipe and misses the correct reasoning branch completely.</p>
          ) : (
            <p><strong>Unified Decoding:</strong> State -1 allows unconstrained thought. The model finds the target branch, and <em>then</em> State 0 applies the JSON constraint for final extraction.</p>
          )}
        </div>
      </div>
    </div>
  );
}
