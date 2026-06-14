import { useState, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Sphere, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function ParticleNebula({ isAnchor }: { isAnchor: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const targetTokenRef = useRef<THREE.Mesh>(null);
  
  const particleCount = 5000;
  
  // Initial random spherical distribution
  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const ph = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      const r = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      ph[i] = Math.random() * Math.PI * 2;
    }
    return [pos, ph];
  }, [particleCount]);

  const currentPositions = useMemo(() => new Float32Array(positions), [positions]);

  const tRef = useRef(0);

  useFrame((state, delta) => {
    const targetT = isAnchor ? 1 : 0;
    tRef.current = THREE.MathUtils.lerp(tRef.current, targetT, delta * 2);
    const t = tRef.current;
    
    const time = state.clock.elapsedTime;

    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      const arr = posAttr.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const ox = positions[idx];
        const oy = positions[idx + 1];
        const oz = positions[idx + 2];
        
        // Drift state
        const driftX = ox + Math.sin(time * 0.5 + phases[i]) * 1.5;
        const driftY = oy + Math.cos(time * 0.3 + phases[i]) * 1.5;
        const driftZ = oz + Math.sin(time * 0.4 + phases[i]) * 1.5;
        
        // Singularity state (swirling into center)
        const radius = Math.sqrt(ox*ox + oy*oy + oz*oz);
        const swirlAngle = time * 2 + radius;
        const targetRadius = Math.max(0.2, radius * (1 - t * 0.95)); // Collapse
        
        const swirlX = targetRadius * Math.cos(swirlAngle) * (ox / radius);
        const swirlY = targetRadius * Math.sin(swirlAngle) * (oy / radius);
        const swirlZ = targetRadius * Math.cos(swirlAngle * 0.5) * (oz / radius);

        arr[idx] = THREE.MathUtils.lerp(driftX, swirlX, t);
        arr[idx + 1] = THREE.MathUtils.lerp(driftY, swirlY, t);
        arr[idx + 2] = THREE.MathUtils.lerp(driftZ, swirlZ, t);
      }
      posAttr.needsUpdate = true;
      pointsRef.current.rotation.y = time * 0.1 * (1 + t * 5); // Spin faster when anchored
    }

    if (targetTokenRef.current) {
      if (t < 0.5) {
        // Wandering
        targetTokenRef.current.position.x = Math.sin(time) * 3;
        targetTokenRef.current.position.y = Math.cos(time * 0.8) * 3;
        targetTokenRef.current.position.z = Math.sin(time * 1.2) * 3;
      } else {
        // Pulled to center
        targetTokenRef.current.position.lerp(new THREE.Vector3(0, 0, 0), delta * 4);
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 10]} intensity={2} />
      
      <Points ref={pointsRef} positions={currentPositions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#50E3C2" size={0.05} sizeAttenuation={true} depthWrite={false} opacity={0.6} blending={THREE.AdditiveBlending} />
      </Points>

      {/* Target Token */}
      <Sphere ref={targetTokenRef} args={[0.4, 32, 32]}>
        <meshStandardMaterial color="#FF6B35" emissive="#FF6B35" emissiveIntensity={2} toneMapped={false} />
      </Sphere>

      {/* Center Black Hole (only visible when anchored) */}
      <Sphere args={[0.3, 32, 32]} scale={isAnchor ? 1 : 0}>
        <meshBasicMaterial color="#000000" />
      </Sphere>

      <EffectComposer>
        <Bloom luminanceThreshold={0.5} mipmapBlur intensity={2.0} />
      </EffectComposer>
    </>
  );
}

export default function LatentSpace3D() {
  const [isAnchor, setIsAnchor] = useState(false);

  return (
    <div className="my-16 border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded-sm overflow-hidden bg-[#050505] relative">
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 flex gap-2 p-1 bg-[#111111]/80 backdrop-blur rounded-full border border-white/10">
        <button
          onClick={() => setIsAnchor(false)}
          className={`px-4 py-2 rounded-full font-mono text-xs tracking-wider transition-colors ${
            !isAnchor ? "bg-[#50E3C2] text-black font-bold" : "text-white/50 hover:text-white"
          }`}
        >
          Common Prompt
        </button>
        <button
          onClick={() => setIsAnchor(true)}
          className={`px-4 py-2 rounded-full font-mono text-xs tracking-wider transition-colors ${
            isAnchor ? "bg-[#FF6B35] text-white font-bold shadow-[0_0_15px_#FF6B35]" : "text-white/50 hover:text-white"
          }`}
        >
          Anchor Prompt
        </button>
      </div>

      <div className="h-[500px] w-full">
        
          <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
            <Suspense fallback={null}>
            <ParticleNebula isAnchor={isAnchor} />
            </Suspense>
          </Canvas>
        
      </div>

      <div className="p-4 border-t border-white/10 bg-[#0D0D0B] flex items-center justify-center gap-3">
        <span className="w-3 h-3 rounded-full bg-[#FF6B35] shadow-[0_0_10px_#FF6B35]"></span>
        <span className="font-mono text-[10px] tracking-widest uppercase text-white/50">
          The Target Token
        </span>
      </div>
    </div>
  );
}
