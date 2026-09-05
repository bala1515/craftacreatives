import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, OrbitControls, Environment } from '@react-three/drei';

// 3D Model Renderer with Bone Animations
function Model({ modelUrl, activePose, isWalking }) {
  const group = useRef();
  
  // Load 3D GLTF/GLB Model file
  const { scene, animations } = useGLTF(modelUrl);
  const { actions, names } = useAnimations(animations, group);

  // Trigger Bone Actions (Walk, Wave, Idle, Talk) dynamically
  useEffect(() => {
    if (!actions || names.length === 0) return;

    // Reset all bone actions
    Object.values(actions).forEach(action => action?.stop());

    // Play target animation clip based on active pose / walk state
    let targetAction = actions[isWalking ? 'Walk' : activePose] || actions[names[0]];
    if (targetAction) {
      targetAction.reset().fadeIn(0.3).play();
    }
  }, [activePose, isWalking, actions, names]);

  // Subtle continuous 3D rotation / movement in WebGL scene
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.15;
    }
  });

  return (
    <primitive
      ref={group}
      object={scene}
      scale={1.8}
      position={[0, -1.8, 0]}
    />
  );
}

// Main 3D Canvas Container Component
export default function ThreeManagerCharacter({ modelUrl = "/models/manager.glb", activePose = "idle", isWalking = false }) {
  return (
    <div className="w-48 h-64 sm:w-56 sm:h-72 relative">
      <Canvas
        camera={{ position: [0, 0.5, 3.5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} />
        <pointLight position={[-5, 5, -5]} intensity={0.8} color="#00F0FF" />

        <Suspense fallback={null}>
          <Model modelUrl={modelUrl} activePose={activePose} isWalking={isWalking} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}