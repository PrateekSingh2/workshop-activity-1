'use client';

import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface Bubble {
  pos: THREE.Vector3;
  speed: number;
  scale: number;
}

export default function FloatingBubbles({ count = 8 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const bubbles = useMemo<Bubble[]>(() => {
    const arr: Bubble[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3.5 + (i % 3) * 0.8;
      const x = Math.cos(angle) * radius;
      const y = ((i % 4) - 1.5) * 1.8;
      const z = -1.5 - (i % 3) * 1.5;
      arr.push({
        pos: new THREE.Vector3(x, y, z),
        speed: 0.2 + (i % 3) * 0.1,
        scale: 0.12 + (i % 4) * 0.08,
      });
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((mesh, idx) => {
      const b = bubbles[idx];
      if (!b) return;
      mesh.position.y = b.pos.y + Math.sin(state.clock.elapsedTime * b.speed + idx) * 0.4;
      mesh.rotation.x += delta * 0.2;
      mesh.rotation.y += delta * 0.3;
    });
    groupRef.current.rotation.y += delta * 0.05;
  });

  return (
    <group ref={groupRef}>
      {bubbles.map((b, idx) => (
        <mesh key={idx} position={b.pos} scale={b.scale} castShadow receiveShadow>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhysicalMaterial
            color="#ffffff"
            roughness={0.05}
            metalness={0.1}
            transmission={0.8}
            ior={1.4}
            thickness={1.0}
            clearcoat={1.0}
            iridescence={0.6}
            iridescenceIOR={1.3}
          />
        </mesh>
      ))}
    </group>
  );
}
