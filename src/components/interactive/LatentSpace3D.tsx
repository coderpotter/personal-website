import { useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Simple procedural noise for the bumpy state
function hash(n: number) {
  return Math.sin(n) * 43758.5453;
}

function noise(x: number, y: number) {
  return hash(x * 12.9898 + y * 78.233);
}

function Scene({ isAnchor }: { isAnchor: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  
  // Transition value (0 = common, 1 = anchor)
  const targetT = isAnchor ? 1 : 0;
  const tRef = useRef(0);

  // Ball physics state
  const ballPos = useRef(new THREE.Vector3(0, 5, 0));
  const ballVelocity = useRef(new THREE.Vector3(0, 0, 0));

  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(10, 10, 64, 64);
  }, []);

  const originalPositions = useMemo(() => {
    return new Float32Array(geometry.attributes.position.array);
  }, [geometry]);

  useFrame((state, delta) => {
    // Smooth transition between states
    tRef.current = THREE.MathUtils.lerp(tRef.current, targetT, delta * 3);
    const t = tRef.current;

    // 1. Morph the mesh
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = originalPositions[i];
        const y = originalPositions[i + 1];
        
        // Bumpy state (t=0)
        const n = noise(x, y) * 0.5;
        
        // Funnel state (t=1)
        const distSq = x * x + y * y;
        const funnelZ = -5 / (distSq * 0.5 + 1); // Gravity well

        // Interpolate z
        positions[i + 2] = THREE.MathUtils.lerp(n, funnelZ, t);
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
      meshRef.current.geometry.computeVertexNormals();
    }

    // 2. Animate the ball
    if (sphereRef.current) {
      if (t < 0.5) {
        // Bouncing randomly in common mode
        ballPos.current.x = Math.sin(state.clock.elapsedTime * 2) * 2;
        ballPos.current.z = Math.cos(state.clock.elapsedTime * 1.5) * 2;
        ballPos.current.y = Math.abs(Math.sin(state.clock.elapsedTime * 4)) * 2 + 1;
      } else {
        // Falling into the well
        ballPos.current.x = THREE.MathUtils.lerp(ballPos.current.x, 0, delta * 5);
        ballPos.current.z = THREE.MathUtils.lerp(ballPos.current.z, 0, delta * 5);
        ballPos.current.y = THREE.MathUtils.lerp(ballPos.current.y, -4.5, delta * 5);
      }

      sphereRef.current.position.copy(ballPos.current);
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="city" />

      {/* The Morphing Surface */}
      <mesh ref={meshRef} rotation={[-Math.PI / 2.2, 0, 0]} geometry={geometry}>
        <meshStandardMaterial
          color="#222"
          wireframe={true}
          emissive="#C93D0E"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* The Token Sphere */}
      <Sphere ref={sphereRef} args={[0.3, 32, 32]}>
        <meshStandardMaterial color="#FF6B35" emissive="#FF6B35" emissiveIntensity={0.5} />
      </Sphere>
    </>
  );
}

export default function LatentSpace3D() {
  const [isAnchor, setIsAnchor] = useState(false);

  return (
    <div className="my-16 border border-[#111111]/10 dark:border-[#EDE9E1]/10 rounded-sm overflow-hidden bg-[#0D0D0B] relative">
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 flex gap-2 p-1 bg-[#111111]/80 backdrop-blur rounded-full border border-white/10">
        <button
          onClick={() => setIsAnchor(false)}
          className={`px-4 py-2 rounded-full font-mono text-xs tracking-wider transition-colors ${
            !isAnchor ? "bg-[#C93D0E] text-white" : "text-white/50 hover:text-white"
          }`}
        >
          Common Prompt
        </button>
        <button
          onClick={() => setIsAnchor(true)}
          className={`px-4 py-2 rounded-full font-mono text-xs tracking-wider transition-colors ${
            isAnchor ? "bg-[#C93D0E] text-white" : "text-white/50 hover:text-white"
          }`}
        >
          Anchor Prompt
        </button>
      </div>

      <div className="h-[400px] w-full">
        <Canvas camera={{ position: [0, 4, 8], fov: 45 }}>
          <Scene isAnchor={isAnchor} />
        </Canvas>
      </div>

      <div className="p-4 border-t border-white/10 bg-[#111111]/90 flex items-center justify-center gap-3">
        <span className="w-3 h-3 rounded-full bg-[#FF6B35] shadow-[0_0_10px_#FF6B35]"></span>
        <span className="font-mono text-[10px] tracking-widest uppercase text-white/50">
          The Target Token
        </span>
      </div>
    </div>
  );
}
