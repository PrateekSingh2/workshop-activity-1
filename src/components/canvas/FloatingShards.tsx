'use client';

import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useStore } from '@/store/useStore';

interface ShardData {
  initialPos: THREE.Vector3;
  direction: THREE.Vector3;
  rotationSpeed: THREE.Vector3;
  scale: number;
}

export default function FloatingShards({ count = 20 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const scrollProgress = useStore((state) => state.scrollProgress);
  const wireframeMode = useStore((state) => state.wireframeMode);

  // Generate deterministic trajectories for satellite shards
  const shards = useMemo<ShardData[]>(() => {
    const data: ShardData[] = [];
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const radius = 2.0 + (i % 4) * 0.35;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      const initialPos = new THREE.Vector3(x, y, z);
      const direction = initialPos.clone().normalize();
      const rotationSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * 1.8,
        (Math.random() - 0.5) * 1.8,
        (Math.random() - 0.5) * 1.8
      );
      const scale = 0.12 + (i % 4) * 0.07;

      data.push({ initialPos, direction, rotationSpeed, scale });
    }
    return data;
  }, [count]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Showcase section explosion factor (peaks around section 04: p ~ 0.55 - 0.7)
    const showcaseFactor = Math.max(0, 1 - Math.abs(scrollProgress - 0.6) * 3.5);
    const explosionDist = showcaseFactor * 2.8;

    groupRef.current.children.forEach((child, idx) => {
      const shard = shards[idx];
      if (!shard) return;

      child.rotation.x += shard.rotationSpeed.x * delta;
      child.rotation.y += shard.rotationSpeed.y * delta;
      child.rotation.z += shard.rotationSpeed.z * delta;

      const targetPos = shard.initialPos
        .clone()
        .addScaledVector(shard.direction, explosionDist);

      child.position.lerp(targetPos, 0.08);
    });

    groupRef.current.rotation.y += delta * 0.12;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.15;
  });

  return (
    <group ref={groupRef}>
      {shards.map((shard, idx) => (
        <mesh key={idx} scale={shard.scale} castShadow receiveShadow>
          <octahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color={wireframeMode ? '#818cf8' : '#ffffff'}
            wireframe={wireframeMode}
            roughness={0.12}
            metalness={0.85}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
            transmission={wireframeMode ? 0 : 0.35}
            thickness={0.8}
            ior={1.65}
            iridescence={0.85}
            iridescenceIOR={1.4}
          />
        </mesh>
      ))}
    </group>
  );
}
