import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Low-poly floating geometric particle constellation
const FloatingConstellation = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  // Logo gradient colors: #7C3AED (violet), #6366F1 (indigo), #06B6D4 (cyan)
  const colorsList = useMemo(
    () => [
      new THREE.Color('#7C3AED'),
      new THREE.Color('#6366F1'),
      new THREE.Color('#06B6D4'),
      new THREE.Color('#A78BFA'),
    ],
    []
  );

  const COUNT = 65; // Capped for low GPU overhead

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      // Spread across a 3D volume
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const chosenColor = colorsList[i % colorsList.length];
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return { positions: pos, colors: col };
  }, [colorsList]);

  // Subtle continuous drift
  useFrame((_state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x += delta * 0.02;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y -= delta * 0.03;
      meshRef.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <group>
      {/* Subtle depth wireframe icosahedron */}
      <mesh ref={meshRef} position={[2, 0.5, -3]}>
        <icosahedronGeometry args={[2.4, 1]} />
        <meshBasicMaterial 
          wireframe 
          color="#6366F1" 
          transparent 
          opacity={0.07} 
        />
      </mesh>

      {/* Floating 3D particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={COUNT}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={COUNT}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          vertexColors
          transparent
          opacity={0.35}
          sizeAttenuation
        />
      </points>
    </group>
  );
};

const ThreeHeroBackground: React.FC = () => {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Disable on mobile/touch or reduced-motion devices to maintain 60-120fps
    if (
      window.innerWidth < 768 ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setShouldRender(false);
    }
  }, []);

  if (!shouldRender) return null;

  return (
    <div 
      className="three-hero-canvas-wrap" 
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{
          antialias: false,
          powerPreference: 'low-power',
          alpha: true,
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <FloatingConstellation />
      </Canvas>
    </div>
  );
};

export default ThreeHeroBackground;
