import { useState, useRef, useMemo, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Cylinder, Points, PointMaterial, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function Cloud({ position, size }: { position: [number, number, number], size: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1000;
  
  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ph = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = Math.cbrt(Math.random()) * size;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      ph[i] = Math.random() * Math.PI * 2;
    }
    return [pos, ph];
  }, [size, count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      pointsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group position={position}>
      <Points ref={pointsRef} positions={new Float32Array(positions)} stride={3}>
        <PointMaterial transparent color="#50E3C2" size={0.05} opacity={0.6} depthWrite={false} blending={THREE.AdditiveBlending} />
      </Points>
    </group>
  );
}

function EruptionScene({ emInf }: { emInf: boolean }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const beamRef = useRef<THREE.Mesh>(null);
  const glassRef = useRef<THREE.Mesh>(null);
  const shardsRef = useRef<THREE.Group>(null);
  
  const targetT = emInf ? 1 : 0;
  const tRef = useRef(0);
  
  // Create static shards
  const shards = useMemo(() => {
    return Array.from({ length: 20 }).map(() => ({
      position: new THREE.Vector3((Math.random() - 0.5) * 2, 4, (Math.random() - 0.5) * 2),
      velocity: new THREE.Vector3((Math.random() - 0.5) * 10, Math.random() * 10 + 5, (Math.random() - 0.5) * 10),
      rotation: new THREE.Vector3(Math.random() * Math.PI, Math.random() * Math.PI, 0)
    }));
  }, []);

  useFrame((state, delta) => {
    tRef.current = THREE.MathUtils.lerp(tRef.current, targetT, delta * (emInf ? 2 : 1));
    const t = tRef.current;
    
    // Core logic
    if (coreRef.current) {
      // Shrinks slightly then gets very bright
      const scale = emInf ? 1 - t * 0.5 : 1;
      coreRef.current.scale.set(scale, scale, scale);
      
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.5 + t * 10;
    }
    
    // Beam logic
    if (beamRef.current) {
      beamRef.current.scale.y = t * 10; // Shoots up
      beamRef.current.position.y = -2 + (t * 10) / 2; // Keep base attached to core
      const mat = beamRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = t;
    }

    // Glass and Shards logic
    if (glassRef.current && shardsRef.current) {
      if (t > 0.8) {
        // Glass shatters
        glassRef.current.visible = false;
        shardsRef.current.visible = true;
        
        // Animate shards
        shardsRef.current.children.forEach((shard, i) => {
          const sData = shards[i];
          shard.position.addScaledVector(sData.velocity, delta);
          sData.velocity.y -= 9.8 * delta; // Gravity
          shard.rotation.x += delta * 2;
          shard.rotation.y += delta * 2;
        });
      } else {
        glassRef.current.visible = true;
        shardsRef.current.visible = false;
        
        // Reset shards
        shardsRef.current.children.forEach((shard, i) => {
          shard.position.copy(shards[i].position);
          shards[i].velocity.set((Math.random() - 0.5) * 10, Math.random() * 10 + 5, (Math.random() - 0.5) * 10);
        });
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 10, 5]} intensity={1} />
      <Environment preset="city" />

      {/* 32B Model Core */}
      <Sphere ref={coreRef} position={[-2, -2, 0]} args={[0.8, 32, 32]}>
        <meshStandardMaterial color="#000" emissive="#FF6B35" />
      </Sphere>

      {/* Energy Beam */}
      <Cylinder ref={beamRef} position={[-2, -2, 0]} args={[0.2, 0.2, 1, 16]}>
        <meshStandardMaterial color="#FF6B35" emissive="#FF6B35" emissiveIntensity={5} transparent opacity={0} />
      </Cylinder>

      {/* GPT-4 Cloud */}
      <Cloud position={[2, 2, 0]} size={2} />

      {/* The Performance Ceiling */}
      <mesh ref={glassRef} position={[-2, 4, 0]}>
        <boxGeometry args={[3, 0.1, 3]} />
        <meshPhysicalMaterial color="#fff" transmission={0.9} opacity={0.5} transparent roughness={0} />
      </mesh>

      {/* Shards */}
      <group ref={shardsRef} visible={false}>
        {shards.map((_, i) => (
          <mesh key={i}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshPhysicalMaterial color="#FF6B35" emissive="#FF6B35" emissiveIntensity={2} />
          </mesh>
        ))}
      </group>

      <EffectComposer>
        <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} />
      </EffectComposer>
    </>
  );
}

export default function PerformanceLeap() {
  const [emInf, setEmInf] = useState(false);

  const score32B = emInf ? 96 : 42;
  const scoreGPT4 = 95;

  return (
    <div className="my-16 border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded-sm bg-[#050505] overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 p-8 bg-[#0D0D0B] border-b border-white/10 relative z-10">
        <div>
          <h4 className="font-serif text-xl text-white mb-2">
            The Performance Leap
          </h4>
          <p className="text-[14px] text-white/60">
            Compare standard generation vs Entropy Minimization.
          </p>
        </div>
        <button
          onClick={() => setEmInf(!emInf)}
          className={`relative inline-flex h-8 w-16 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            emInf ? "bg-[#FF6B35] shadow-[0_0_15px_rgba(255,107,53,0.5)]" : "bg-white/20"
          }`}
        >
          <span className="sr-only">Apply Entropy Minimization</span>
          <span
            aria-hidden="true"
            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              emInf ? "translate-x-4" : "-translate-x-4"
            }`}
          />
        </button>
      </div>

      <div className="relative h-[500px] w-full cursor-crosshair">
        <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono text-xs tracking-widest">LOADING VOLUMETRIC SCENE...</div>}>
          <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
            <EruptionScene emInf={emInf} />
          </Canvas>
        </Suspense>

        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
          <span className={`font-mono text-5xl tabular-nums transition-all duration-1000 ${emInf ? 'text-[#FF6B35] drop-shadow-[0_0_20px_#FF6B35] -translate-y-16 scale-125' : 'text-[#FF6B35]/80'}`}>
            {score32B}%
          </span>
          <div className="mt-8 font-mono text-xs tracking-widest text-white/60 uppercase">
            32B Model
          </div>
        </div>

        <div className="absolute top-1/4 right-1/4 translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
          <span className="font-mono text-5xl tabular-nums text-[#50E3C2]/80 drop-shadow-[0_0_10px_#50E3C2]">
            {scoreGPT4}%
          </span>
          <div className="mt-4 font-mono text-xs tracking-widest text-white/60 uppercase">
            GPT-4o (Zero-Shot)
          </div>
        </div>
      </div>
    </div>
  );
}
