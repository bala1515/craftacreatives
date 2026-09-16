import React, { useRef, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import standingAnimationData from './standingAnimationData.json';

// Preload the lightweight Walking model
if (typeof window !== 'undefined') {
  useGLTF.preload('/models/Walking.glb');
}

// Unified 3D Manager Character with Native AnimationMixer Crossfade
function UnifiedManager({ isWalking = false, rotationY = 0, onLoaded }) {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/Walking.glb');

  // 1. Clean standing animation clip from Mixamo idle
  const standingClip = useMemo(() => {
    try {
      return THREE.AnimationClip.parse(standingAnimationData);
    } catch (e) {
      console.warn("Failed to parse standing clip:", e);
      return null;
    }
  }, []);

  // 2. Lock forward root motion so walking cycle is strictly in-place
  useMemo(() => {
    if (!animations || animations.length === 0) return;
    animations.forEach((clip) => {
      clip.tracks.forEach((track) => {
        if (track.name.toLowerCase().includes('hips.position')) {
          const firstY = track.values[1] || 0;
          for (let i = 1; i < track.values.length; i += 3) {
            track.values[i] = firstY;
          }
        }
      });
    });
  }, [animations]);

  // 3. Combine both clips into single AnimationMixer
  const allClips = useMemo(() => {
    const clips = [];
    if (animations && animations[0]) clips.push(animations[0]);
    if (standingClip) clips.push(standingClip);
    return clips;
  }, [animations, standingClip]);

  const { actions } = useAnimations(allClips, group);

  // Notify parent immediately when 3D scene is ready
  useEffect(() => {
    if (scene && onLoaded) {
      onLoaded();
    }
  }, [scene, onLoaded]);

  // 4. Material fixes: restore stylish sunglasses, enable High-Def Normal Maps, realistic human skin PBR
  useMemo(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          const mat = child.material;
          mat.transparent = false;
          mat.depthWrite = true;
          mat.depthTest = true;
          mat.side = THREE.DoubleSide;

          // Activate high-definition normal maps (skin pores, muscle relief, cloth wrinkles)
          if (mat.normalScale) {
            mat.normalScale.set(1.2, 1.2);
          }

          // Kill harsh plastic/lacquer shine
          mat.specularIntensity = 0.0;
          mat.reflectivity = 0.0;
          mat.clearcoat = 0.0;

          if (child.name && child.name.toLowerCase().includes('eyewear')) {
            // Restore stylish sunglasses with clean alpha cutout & dark lenses
            child.visible = true;
            mat.transparent = true;
            mat.alphaTest = 0.45;
            mat.depthWrite = true;
            mat.roughness = 0.25;
            mat.metalness = 0.6;
            mat.specularIntensity = 0.4;
          } else if (mat.name === 'Bodymat') {
            // Natural human skin: soft, matte, zero oil/gloss shine
            mat.roughness = 0.85;
            mat.metalness = 0.0;
          } else if (mat.name === 'Topmat') {
            // Soft matte woven cotton T-shirt
            mat.roughness = 0.92;
            mat.metalness = 0.0;
          } else if (mat.name === 'Bottommat') {
            // Matte woven chino shorts
            mat.roughness = 0.88;
            mat.metalness = 0.0;
          } else if (mat.name === 'Shoesmat') {
            // Natural sneaker rubber/leather
            mat.roughness = 0.65;
            mat.specularIntensity = 0.1;
            mat.metalness = 0.0;
          } else if (mat.name === 'Hairmat') {
            // Natural human hair
            mat.transparent = true;
            mat.alphaTest = 0.4;
            mat.roughness = 0.75;
            mat.specularIntensity = 0.08;
            mat.metalness = 0.0;
          }

          mat.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  // 5. SEAMLESS NATIVE CROSSFADE (Mathematically impossible to see T-pose!)
  useEffect(() => {
    if (!actions) return;
    const walkAction = actions[animations?.[0]?.name];
    const standAction = actions[standingClip?.name] || actions['StandingIdle'];

    if (!walkAction || !standAction) {
      if (walkAction) {
        if (isWalking) walkAction.reset().play();
        else walkAction.paused = true;
      }
      return;
    }

    if (isWalking) {
      standAction.fadeOut(0.2);
      walkAction.reset().fadeIn(0.2).play();
    } else {
      walkAction.fadeOut(0.2);
      standAction.reset().fadeIn(0.2).play();
    }
  }, [isWalking, actions, animations, standingClip]);

  // 6. Smooth rotation interpolation
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += (rotationY - group.current.rotation.y) * 0.12;
      group.current.position.y = -1.0;
    }
  });

  return (
    <primitive
      ref={group}
      object={scene}
      scale={1.0}
      position={[0, -1.0, 0]}
    />
  );
}

// Smooth Dynamic Camera Controller: transitions between eye-level and top-angle view
function CameraController({ isTopAngle = false }) {
  useFrame((state, delta) => {
    // Eye-level view: position [0, -0.05, 3.2], lookAt [0, -0.05, 0]
    // Top-angle elevated view: position [0, 1.45, 2.65], lookAt [0, -0.45, 0]
    const targetY = isTopAngle ? 1.45 : -0.05;
    const targetZ = isTopAngle ? 2.65 : 3.2;
    const targetLookY = isTopAngle ? -0.45 : -0.05;

    const lerpSpeed = Math.min(1, delta * 3.5);
    state.camera.position.y += (targetY - state.camera.position.y) * lerpSpeed;
    state.camera.position.z += (targetZ - state.camera.position.z) * lerpSpeed;
    state.camera.lookAt(0, targetLookY, 0);
  });

  return null;
}

// Exported 3D Character Component with Soft Studio Lighting & Matte Skin
export default function ThreeManagerCharacter({ isWalking = false, rotationY = 0, onLoaded, isTopAngle = false }) {
  return (
    <div className="w-72 h-[420px] sm:w-80 sm:h-[470px] relative flex items-center justify-center pointer-events-auto">
      <Canvas
        shadows
        camera={{ position: [0, -0.05, 3.2], fov: 36 }}
        style={{ background: 'transparent' }}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
      >
        <CameraController isTopAngle={isTopAngle} />

        {/* 1. Soft Flattering Ambient Light: natural baseline, eliminates harsh dark holes */}
        <ambientLight intensity={1.3} color="#F8FAFC" />

        {/* 2. Soft Studio Key Light: Warm natural diffuse lighting with gentle cast shadows */}
        <directionalLight
          position={[2.0, 4.0, 2.5]}
          intensity={1.25}
          color="#FFF7ED"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0003}
          shadow-camera-near={0.5}
          shadow-camera-far={8.0}
          shadow-camera-left={-1.2}
          shadow-camera-right={1.2}
          shadow-camera-top={1.8}
          shadow-camera-bottom={-1.2}
        />

        {/* 3. Soft Cool Fill Light on shadow side */}
        <directionalLight
          position={[-2.5, 2.0, 1.8]}
          intensity={0.65}
          color="#E2E8F0"
        />

        {/* 4. Subtle Natural Rim Light (Gentle edge separation without blinding glow) */}
        <directionalLight
          position={[0, 2.8, -2.5]}
          intensity={0.9}
          color="#BFDBFE"
        />

        {/* 5. Soft Ground Shadow Plane under shoes */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.005, 0]} receiveShadow>
          <planeGeometry args={[2.5, 2.5]} />
          <shadowMaterial opacity={0.35} />
        </mesh>

        <Suspense fallback={null}>
          <UnifiedManager
            isWalking={isWalking}
            rotationY={rotationY}
            onLoaded={onLoaded}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}