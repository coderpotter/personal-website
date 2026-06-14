import { useState, useMemo, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Line, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// Generate a random branching tree
function generateTree(depth: number, x: number, y: number, z: number): any {
  if (depth === 0) return { pos: new THREE.Vector3(x, y, z), children: [] };
  
  const numChildren = Math.floor(Math.random() * 3) + 1; // 1 to 3 children
  const children = [];
  for (let i = 0; i < numChildren; i++) {
    const nextX = x + 1.5 + Math.random() * 0.5;
    const nextY = y + (Math.random() - 0.5) * 4;
    const nextZ = z + (Math.random() - 0.5) * 4;
    children.push(generateTree(depth - 1, nextX, nextY, nextZ));
  }
  return { pos: new THREE.Vector3(x, y, z), children };
}

// Flatten tree into nodes and edges for easier rendering
function flattenTree(node: any, nodes: THREE.Vector3[] = [], edges: [THREE.Vector3, THREE.Vector3][] = []) {
  nodes.push(node.pos);
  node.children.forEach((child: any) => {
    edges.push([node.pos, child.pos]);
    flattenTree(child, nodes, edges);
  });
  return { nodes, edges };
}

function GraphScene({ constraintX }: { constraintX: number }) {
  const { nodes, edges } = useMemo(() => {
    const tree = generateTree(5, -6, 0, 0); // 5 levels deep
    return flattenTree(tree);
  }, []);

  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  // Calculate constraint world position: range slider is 0 to 100
  // World X ranges roughly from -6 to 4 (length = 10)
  const worldConstraintX = -6 + (constraintX / 100) * 10;

  return (
    <group ref={groupRef}>
      {/* Render Edges */}
      {edges.map((edge, i) => {
        const p1 = edge[0].clone();
        const p2 = edge[1].clone();
        
        // Squash logic based on constraint
        if (p1.x > worldConstraintX) {
          const squash = Math.max(0, 1 - (p1.x - worldConstraintX));
          p1.y *= squash; p1.z *= squash;
        }
        if (p2.x > worldConstraintX) {
          const squash = Math.max(0, 1 - (p2.x - worldConstraintX));
          p2.y *= squash; p2.z *= squash;
        }

        const isConstrained = p2.x > worldConstraintX;

        return (
          <Line 
            key={i} 
            points={[p1, p2]} 
            color={isConstrained ? "#FF6B35" : "#50E3C2"} 
            lineWidth={isConstrained ? 3 : 1}
            transparent 
            opacity={isConstrained ? 1 : 0.4} 
          />
        );
      })}

      {/* Render Nodes */}
      {nodes.map((pos, i) => {
        const p = pos.clone();
        if (p.x > worldConstraintX) {
          const squash = Math.max(0, 1 - (p.x - worldConstraintX));
          p.y *= squash; p.z *= squash;
        }
        
        const isConstrained = p.x > worldConstraintX;

        return (
          <Sphere key={`node-${i}`} position={p} args={[0.1, 16, 16]}>
            <meshStandardMaterial 
              color={isConstrained ? "#FF6B35" : "#50E3C2"} 
              emissive={isConstrained ? "#FF6B35" : "#50E3C2"} 
              emissiveIntensity={isConstrained ? 2 : 0.5} 
            />
          </Sphere>
        );
      })}

      {/* The Constraint Wall (Glass Pane) */}
      <mesh position={[worldConstraintX, 0, 0]}>
        <boxGeometry args={[0.1, 10, 10]} />
        <meshPhysicalMaterial color="#FF6B35" transmission={0.9} opacity={0.5} transparent roughness={0.1} />
      </mesh>
    </group>
  );
}

export default function ComputationGraphFunnel() {
  const [constraintX, setConstraintX] = useState(80);

  return (
    <div className="my-16 border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded-sm bg-[#050505] overflow-hidden">
      <div className="p-8 border-b border-white/10 bg-[#0D0D0B] flex flex-col md:flex-row justify-between items-end gap-6 relative z-10">
        <div className="flex-1 w-full">
          <label className="font-mono text-xs tracking-widest uppercase text-white/50 block mb-4">
            Constraint Wall Slider
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={constraintX}
            onChange={(e) => setConstraintX(Number(e.target.value))}
            className="w-full accent-[#FF6B35]"
          />
          <div className="flex justify-between mt-2 font-mono text-[10px] text-white/30">
            <span>Early Clamping</span>
            <span>Unconstrained (State -1)</span>
          </div>
        </div>
      </div>

      <div className="relative h-[400px] w-full cursor-crosshair">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse at center, #50E3C2 0%, transparent 70%)' }}></div>
        
        
          <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
            <Suspense fallback={null}>
            <ambientLight intensity={0.2} />
            <directionalLight position={[5, 10, 5]} intensity={1} />
            <Environment preset="city" />
            
            <GraphScene constraintX={constraintX} />

            <EffectComposer>
              <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
            </EffectComposer>
            </Suspense>
          </Canvas>
        

        <div className="absolute top-6 left-6 font-mono text-[10px] text-[#50E3C2]/50 tracking-widest uppercase">
          Prompt In
        </div>
        
        <div className="absolute bottom-6 right-6 font-mono text-sm text-[#FF6B35] font-bold bg-[#111]/80 backdrop-blur border border-white/10 px-4 py-2 rounded">
          {constraintX < 50 ? '{"answer": 42}' : '<chaotic_output>'}
        </div>
      </div>
    </div>
  );
}
