import { useState, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Text, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function OrbitalRing({ radius, speed, axis, baseRotation, syncFactor, text }: any) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create a circle of text
  const numItems = 8;
  const items = useMemo(() => {
    return Array.from({ length: numItems }).map((_, i) => {
      const angle = (i / numItems) * Math.PI * 2;
      return {
        position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius] as [number, number, number],
        rotation: [0, -angle + Math.PI/2, 0] as [number, number, number]
      };
    });
  }, [radius, numItems]);

  const currentAxis = useRef(axis.clone());

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Interpolate axis towards Y-axis (0,1,0) based on syncFactor (0 to 1)
      const targetAxis = new THREE.Vector3(0, 1, 0);
      currentAxis.current.lerp(targetAxis, delta * (syncFactor * 2));
      
      // Interpolate base rotation to 0 based on syncFactor
      const targetRotation = new THREE.Euler(
        THREE.MathUtils.lerp(baseRotation[0], 0, syncFactor),
        THREE.MathUtils.lerp(baseRotation[1], 0, syncFactor),
        THREE.MathUtils.lerp(baseRotation[2], 0, syncFactor)
      );
      
      groupRef.current.setRotationFromEuler(targetRotation);
      groupRef.current.rotateOnAxis(currentAxis.current.normalize(), state.clock.elapsedTime * speed);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Visual ring line */}
      <mesh rotation={[Math.PI/2, 0, 0]}>
        <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
        <meshBasicMaterial color="#FF6B35" transparent opacity={0.2 + syncFactor * 0.3} />
      </mesh>
      
      {/* Text items */}
      {items.map((item, i) => (
        <Text
          key={i}
          position={item.position}
          rotation={item.rotation}
          fontSize={0.2}
          color={syncFactor > 0.8 ? "#FF6B35" : "#FFF"}
          anchorX="center"
          anchorY="middle"
          material-transparent
          material-opacity={0.4 + syncFactor * 0.6}
        >
          {text}
        </Text>
      ))}
    </group>
  );
}

function Scene({ injections }: { injections: number }) {
  const syncFactor = injections / 5; // 0 to 1

  const rings = useMemo(() => [
    { radius: 2, speed: 0.5, axis: new THREE.Vector3(1, 1, 0).normalize(), baseRotation: [0.5, 0.2, 1], text: "STATE" },
    { radius: 3, speed: -0.3, axis: new THREE.Vector3(0, 1, 1).normalize(), baseRotation: [-0.8, 0.5, 0.2], text: "CONTEXT" },
    { radius: 4, speed: 0.2, axis: new THREE.Vector3(1, 0, 1).normalize(), baseRotation: [0.2, -0.6, 0.8], text: "TOKEN" },
  ], []);

  const coreRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (coreRef.current) {
      // Pulse core based on syncFactor
      const pulse = 1 + Math.sin(state.clock.elapsedTime * (10 * syncFactor)) * (0.1 * syncFactor);
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 10, 5]} intensity={1} />
      <Environment preset="city" />

      {/* The Central LLM Core */}
      <Sphere ref={coreRef} args={[0.5, 32, 32]}>
        <meshStandardMaterial 
          color="#000" 
          emissive="#FF6B35" 
          emissiveIntensity={0.5 + syncFactor * 4} // Gets blindingly bright
        />
      </Sphere>

      {/* The Attention Rings */}
      {rings.map((ring, i) => (
        <OrbitalRing key={i} {...ring} syncFactor={syncFactor} />
      ))}

      <EffectComposer>
        <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5 + syncFactor * 2} />
      </EffectComposer>
    </>
  );
}

export default function EchoChamber() {
  const [injections, setInjections] = useState(0);

  const handleInject = () => {
    if (injections < 5) setInjections(i => i + 1);
  };

  const handleReset = () => {
    setInjections(0);
  };

  const variance = Math.max(0.01, 2 - injections * 0.45);

  return (
    <div className="my-16 border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded-sm bg-[#050505] overflow-hidden">
      <div className="p-8 border-b border-white/10 bg-[#0D0D0B] flex flex-col md:flex-row justify-between items-end gap-6 relative z-10">
        <div>
          <h4 className="font-serif text-xl text-white mb-2">
            The Echo Chamber
          </h4>
          <p className="text-[14px] text-white/60">
            Inject state matrix back into the context to induce State Collapse.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleReset}
            className="px-4 py-2 border border-white/20 text-white/60 rounded font-mono text-xs tracking-widest hover:bg-white/5 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleInject}
            disabled={injections >= 5}
            className="px-6 py-2 bg-[#FF6B35] text-white font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#C93D0E] transition-colors rounded shadow-[0_0_15px_rgba(255,107,53,0.4)] disabled:opacity-50"
          >
            Inject State
          </button>
        </div>
      </div>

      <div className="relative h-[400px] w-full cursor-crosshair">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse at center, #FF6B35 0%, transparent 60%)' }}></div>
        
        
          <Canvas camera={{ position: [0, 5, 8], fov: 60 }}>
            <Suspense fallback={null}>
            <Scene injections={injections} />
            </Suspense>
          </Canvas>
        

        <div className="absolute top-6 left-6 font-mono text-[10px] text-white/40 tracking-widest uppercase bg-[#111]/80 px-3 py-1 rounded backdrop-blur">
          Probability Distribution (Entropy)
        </div>
        <div className="absolute top-6 right-6 font-mono text-[10px] text-[#FF6B35] bg-[#111]/80 px-3 py-1 rounded backdrop-blur border border-[#FF6B35]/30">
          Variance: {variance.toFixed(2)}
        </div>
        
        {injections === 5 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-serif text-xl text-[#FF6B35] font-bold tracking-widest uppercase drop-shadow-[0_0_10px_#FF6B35]">
            STATE COLLAPSE ACHIEVED
          </div>
        )}
      </div>
    </div>
  );
}
