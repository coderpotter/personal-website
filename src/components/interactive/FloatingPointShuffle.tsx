import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider, InstancedRigidBodies } from "@react-three/rapier";
import { Environment, Text, ContactShadows, Box, Sphere } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useState, useRef, useEffect, useMemo, Suspense } from "react";
import * as THREE from "three";

function Funnel() {
  return (
    <RigidBody type="fixed" friction={0} restitution={0.2}>
      {/* Left Wall */}
      <CuboidCollider position={[-3, 2, 0]} rotation={[0, 0, -Math.PI / 6]} args={[0.5, 4, 1]} />
      {/* Right Wall */}
      <CuboidCollider position={[3, 2, 0]} rotation={[0, 0, Math.PI / 6]} args={[0.5, 4, 1]} />
      {/* Back/Front Walls to keep blocks in 2D plane */}
      <CuboidCollider position={[0, 3, -1]} args={[5, 5, 0.5]} />
      <CuboidCollider position={[0, 3, 1]} args={[5, 5, 0.5]} />
      {/* Bottom Chute */}
      <CuboidCollider position={[-1.5, -2, 0]} rotation={[0, 0, -Math.PI / 2.5]} args={[0.5, 3, 1]} />
      <CuboidCollider position={[1.5, -2, 0]} rotation={[0, 0, Math.PI / 2.5]} args={[0.5, 3, 1]} />
    </RigidBody>
  );
}

function FallingBlock({ position, label, color, delay }: { position: [number, number, number], label: string, color: string, delay: number }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  if (!active) return null;

  return (
    <RigidBody colliders="cuboid" position={position} restitution={0.6} friction={0.1}>
      <Box args={[1.2, 1.2, 0.8]}>
        <meshPhysicalMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.5} 
          transparent 
          opacity={0.8} 
          roughness={0.2} 
          metalness={0.8} 
        />
        <Text position={[0, 0, 0.41]} fontSize={0.6} color="white" font="/fonts/Inter-Bold.ttf" anchorX="center" anchorY="middle">
          {label}
        </Text>
      </Box>
    </RigidBody>
  );
}

function Scene({ keyCount, load }: { keyCount: number, load: number }) {
  // We use load to alter the drop positions slightly, causing different collisions
  const dropOffset = (load - 50) / 25; // -2 to +2

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />
      <Environment preset="city" />

      <Physics gravity={[0, -9.81, 0]}>
        <Funnel />
        
        {/* We key these by keyCount so they remount and drop again */}
        <FallingBlock key={`A-${keyCount}`} label="A" color="#FF6B35" position={[-2 + dropOffset, 8, 0]} delay={0} />
        <FallingBlock key={`B-${keyCount}`} label="B" color="#4A90E2" position={[dropOffset, 10, 0]} delay={load > 50 ? 200 : 0} />
        <FallingBlock key={`C-${keyCount}`} label="C" color="#50E3C2" position={[2 + dropOffset, 9, 0]} delay={load > 50 ? 0 : 200} />

        {/* The Accumulator Core */}
        <RigidBody type="fixed" position={[0, -4, 0]} colliders="hull">
          <Sphere args={[1, 32, 32]}>
            <meshStandardMaterial color="#111" emissive="#C93D0E" emissiveIntensity={load > 50 ? 0.8 : 0.2} wireframe />
          </Sphere>
        </RigidBody>
      </Physics>

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
        <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={new THREE.Vector2(0.002 * (load/100), 0.002)} />
        <Noise opacity={0.15 + (load/100)*0.2} />
      </EffectComposer>
    </>
  );
}

export default function FloatingPointShuffle() {
  const [load, setLoad] = useState(50);
  const [keyCount, setKeyCount] = useState(0);
  const [isGroupedLeft, setIsGroupedLeft] = useState(true);

  // Re-run simulation when load changes significantly
  useEffect(() => {
    setIsGroupedLeft(load < 50);
    setKeyCount(k => k + 1);
  }, [load]);

  const a = 0.1;
  const b = 0.2;
  const c = 0.3;

  const resLeft = (a + b) + c; // 0.6000000000000001
  const resRight = a + (b + c); // 0.6
  const currentResult = isGroupedLeft ? resLeft : resRight;

  return (
    <div className="my-16 border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded-sm bg-[#111111]/[0.02] dark:bg-[#EDE9E1]/[0.02] overflow-hidden">
      
      {/* Top Controls */}
      <div className="p-8 border-b border-[#111111]/10 dark:border-[#EDE9E1]/10 bg-[#0D0D0B] z-10 relative">
        <label className="font-mono text-xs tracking-widest uppercase text-white/50 block mb-4">
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
        <div className="flex justify-between mt-2 font-mono text-[10px] text-white/30">
          <span>Low Traffic (A+B)+C</span>
          <span>High Traffic A+(B+C)</span>
        </div>
      </div>

      {/* 3D Viewport */}
      <div className="h-[400px] w-full bg-[#050505] relative cursor-crosshair">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #FF6B35 0%, transparent 60%)' }}></div>
        <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono text-xs tracking-widest">LOADING PHYSICS ENGINE...</div>}>
          <Canvas camera={{ position: [0, 2, 12], fov: 50 }}>
            <Scene keyCount={keyCount} load={load} />
          </Canvas>
        </Suspense>

        {/* Floating Overlay for Math */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#111]/80 backdrop-blur-md border border-white/10 px-6 py-4 rounded text-center min-w-[280px]">
          <p className="font-mono text-[10px] tracking-widest uppercase text-white/40 mb-2">
            Computed Output
          </p>
          <p className={`font-mono text-2xl transition-all duration-300 ${isGroupedLeft ? 'text-[#FF6B35] scale-105' : 'text-[#50E3C2]'}`}>
            {currentResult.toString()}
          </p>
        </div>
      </div>
    </div>
  );
}
