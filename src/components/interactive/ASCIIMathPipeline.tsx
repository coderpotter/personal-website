import { useState, useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Torus, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function generateNoise(length: number) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function HashProcessor({ scrub, noiseString }: { scrub: number, noiseString: string }) {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 2;
      // Pulse scale when a character hits
      const scale = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.05;
      ringRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* The processing ring */}
      <Torus ref={ringRef} args={[1.5, 0.1, 16, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#000" emissive="#FF6B35" emissiveIntensity={2} wireframe />
      </Torus>

      {/* Characters flying in */}
      {noiseString.split("").map((char, i) => {
        // Compute position based on scrub
        // When scrub == i, char is at z=0 (inside ring)
        // When scrub < i, char is at z < 0 (waiting to enter)
        // When scrub > i, char is at z > 0 (has passed through and shattered)
        const zPos = (scrub - i) * 2;
        const passed = zPos > 0;
        
        // Random offset for shattering effect
        const hashVal = char.charCodeAt(0);
        const randX = (hashVal % 10 - 5) * 0.2;
        const randY = ((hashVal*2) % 10 - 5) * 0.2;

        return (
          <Text
            key={i}
            position={[passed ? randX * zPos : 0, passed ? randY * zPos : 0, -zPos]}
            rotation={[0, 0, passed ? zPos * 0.5 : 0]}
            fontSize={passed ? 0.8 : 1.2}
            color={passed ? "#50E3C2" : "#FFF"}
            anchorX="center"
            anchorY="middle"
            font="/fonts/Inter-Bold.ttf"
            material-transparent
            material-opacity={Math.max(0, 1 - Math.abs(zPos) * 0.15)}
          >
            {passed ? hashVal : char}
          </Text>
        );
      })}
    </group>
  );
}

export default function ASCIIMathPipeline() {
  const [noiseString, setNoiseString] = useState(() => generateNoise(16));
  const [scrub, setScrub] = useState(0);

  const regenerate = () => {
    setNoiseString(generateNoise(16));
    setScrub(0);
  };

  const currentSum = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < scrub; i++) {
      sum += noiseString.charCodeAt(i);
    }
    return sum;
  }, [noiseString, scrub]);

  const result = currentSum % 2 === 0 ? "Heads" : "Tails";
  const isDone = scrub === noiseString.length;

  return (
    <div className="my-16 border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded-sm bg-[#050505] overflow-hidden">
      
      <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-[#0D0D0B] border-b border-white/10 z-10 relative">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <label className="font-mono text-xs tracking-widest uppercase text-white/50 block mb-4">
            Hash Processing Pipeline
          </label>
          <input
            type="range"
            min="0"
            max={noiseString.length}
            value={scrub}
            onChange={(e) => setScrub(Number(e.target.value))}
            className="w-full accent-[#FF6B35]"
          />
        </div>
        <button
          onClick={regenerate}
          className="px-6 py-2 bg-[#FF6B35] text-white font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#C93D0E] transition-colors rounded shadow-[0_0_15px_rgba(255,107,53,0.4)]"
        >
          Generate Stream
        </button>
      </div>

      <div className="h-[400px] w-full relative cursor-crosshair">
        {/* Background glow */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to bottom, #050505, #112222)' }}></div>
        
        <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono text-xs tracking-widest">LOADING WEBGL PIPELINE...</div>}>
          <Canvas camera={{ position: [2, 1, 6], fov: 60 }}>
            <ambientLight intensity={0.2} />
            <directionalLight position={[0, 10, 5]} intensity={2} />
            <Environment preset="city" />
            
            <HashProcessor scrub={scrub} noiseString={noiseString} />

            <EffectComposer>
              <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
            </EffectComposer>
          </Canvas>
        </Suspense>

        {/* Floating HUD */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-4 text-right">
          <div className="bg-[#111]/80 backdrop-blur border border-white/10 px-4 py-2 rounded">
            <span className="font-mono text-[10px] tracking-widest text-white/40 block">ASCII SUM</span>
            <span className="font-mono text-3xl text-white">{currentSum}</span>
          </div>
          <div className="bg-[#111]/80 backdrop-blur border border-white/10 px-4 py-2 rounded flex items-center justify-end gap-3">
            <span className="font-mono text-[10px] tracking-widest text-white/40">MODULO 2</span>
            <span className={`font-serif text-2xl font-bold transition-colors ${isDone ? 'text-[#FF6B35] shadow-[0_0_10px_#FF6B35]' : 'text-white/20'}`}>
              {isDone ? result : '...'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
