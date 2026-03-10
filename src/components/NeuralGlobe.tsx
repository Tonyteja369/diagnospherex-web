import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import './NeuralGlobe.css';

const NODE_COUNT = 1500;
const RADIUS = 3;

const SphereNetwork = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  // Generate nodes on a sphere
  const { positions, lines_indices } = useMemo(() => {
    const pos = new Float32Array(NODE_COUNT * 3);
    const nodes: THREE.Vector3[] = [];

    // Fibonacci sphere distribution
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      pos[i * 3] = x * RADIUS;
      pos[i * 3 + 1] = y * RADIUS;
      pos[i * 3 + 2] = z * RADIUS;

      nodes.push(new THREE.Vector3(x * RADIUS, y * RADIUS, z * RADIUS));
    }

    // Connect nearby nodes
    const indices: number[] = [];
    const maxDistance = 0.55;

    for (let i = 0; i < NODE_COUNT; i++) {
      let connections = 0;
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (connections > 4) break; // Limit connections per node
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < maxDistance) {
          indices.push(i, j);
          connections++;
        }
      }
    }

    return { positions: pos, lines_indices: new Uint16Array(indices) };
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      // Slow constant rotation (45 seconds per revolution -> 2*Math.PI / 45 rads per second)
      // We'll approximate this by multiplying a very small amount by delta if we had useFrame((state, delta)),
      // but groupRef.current.rotation.y += (2 * Math.PI) / (45 * 60) is approx 0.0023.
      groupRef.current.rotation.y += 0.0023;
      
      // Mouse interaction tilt
      const targetRotationX = (mouse.y * Math.PI) / 8;
      const targetRotationY = (mouse.x * Math.PI) / 8;

      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.05;
    }
  });

  const linesGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setIndex(new THREE.BufferAttribute(lines_indices, 1));
    return geo;
  }, [positions, lines_indices]);

  return (
    <group ref={groupRef}>
      {/* Container Hologram Glass Shell */}
      <mesh>
        <sphereGeometry args={[RADIUS + 0.1, 64, 64]} />
        <meshPhysicalMaterial 
          color="#6236FF"
          transparent 
          opacity={0.05} 
          roughness={0} 
          transmission={0.9} 
          thickness={1} 
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Nodes */}
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial 
          transparent 
          color="#3B82F6" 
          size={0.05} 
          sizeAttenuation={true} 
          depthWrite={false} 
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Connections array logic in ThreeJS uses LineSegments */}
      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial 
          color="#6236FF" 
          transparent 
          opacity={0.15} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false} 
        />
      </lineSegments>

      {/* Core AI Engine Center */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
};

// Floating background particles
const ParticleField = () => {
  const ref = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const pos = new Float32Array(3000 * 3);
    for(let i=0; i<3000; i++) {
      pos[i*3] = (Math.random() - 0.5) * 15;
      pos[i*3+1] = (Math.random() - 0.5) * 15;
      pos[i*3+2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if(ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#ffffff" size={0.02} sizeAttenuation={true} depthWrite={false} opacity={0.3} />
    </Points>
  );
};

export default function NeuralGlobe() {
  const [rippleActive, setRippleActive] = useState(false);

  const handleClick = () => {
    setRippleActive(true);
    setTimeout(() => setRippleActive(false), 1000);
  };

  useEffect(() => {
    const handleSignature = () => {
      setRippleActive(true);
      setTimeout(() => setRippleActive(false), 2000);
    };
    window.addEventListener('signatureActivated', handleSignature);
    return () => window.removeEventListener('signatureActivated', handleSignature);
  }, []);

  return (
    <div className="neural-globe-container" onClick={handleClick}>
      {rippleActive && <div className="canvas-ripple" />}
      <Canvas 
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['transparent']} />
        
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#6236FF" intensity={2} />
        <pointLight position={[-10, -10, -10]} color="#22D3EE" intensity={1} />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1.5}>
          <SphereNetwork />
        </Float>
        
        <ParticleField />
      </Canvas>
    </div>
  );
}
