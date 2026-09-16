import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, PerspectiveCamera } from '@react-three/drei';

// Luxury Shimmering 3D Glitter Particle Field
function GlitterField() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle cinematic swaying motion
      groupRef.current.rotation.y += delta * 0.04;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Primary Royal Cobalt Sparkling Glitter */}
      <Sparkles
        count={120}
        scale={[14, 8, 6]}
        size={3.8}
        speed={0.5}
        color="#0071E3"
        opacity={0.8}
        noise={0.3}
      />

      {/* 2. Warm Luxury Golden Glitter Particles */}
      <Sparkles
        count={80}
        scale={[12, 7, 5]}
        size={2.8}
        speed={0.4}
        color="#F59E0B"
        opacity={0.7}
        noise={0.35}
      />

      {/* 3. Sky Blue / Cyan Star Dust Particles */}
      <Sparkles
        count={150}
        scale={[16, 10, 7]}
        size={1.8}
        speed={0.25}
        color="#0284C7"
        opacity={0.55}
        noise={0.2}
      />

      {/* 4. Foreground Floating Bokeh Glitter */}
      <Sparkles
        count={35}
        scale={[10, 6, 4]}
        size={6.0}
        speed={0.65}
        color="#0071E3"
        opacity={0.45}
        noise={0.4}
      />
    </group>
  );
}

// Exported 3D Glitter Canvas for Hero
export default function Hero3DCanvas() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none z-0">
      <Canvas gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        
        <ambientLight intensity={1.5} color="#FFFFFF" />

        <GlitterField />
      </Canvas>
    </div>
  );
}
