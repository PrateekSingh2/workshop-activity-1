'use client';

import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useStore } from '@/store/useStore';

export default function SpiralTunnel({ count = 280 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const scrollProgress = useStore((state) => state.scrollProgress);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const c1 = new THREE.Color('#818cf8');
    const c2 = new THREE.Color('#38bdf8');
    const c3 = new THREE.Color('#c084fc');

    for (let i = 0; i < count; i++) {
      // Helix / Spiral distribution
      const t = (i / count) * Math.PI * 18;
      const radius = 2.4 + (i % 5) * 0.4;
      const z = ((i / count) - 0.5) * 28;

      pos[i * 3] = Math.cos(t) * radius;
      pos[i * 3 + 1] = Math.sin(t) * radius;
      pos[i * 3 + 2] = z;

      // Color gradation along helix
      const mixedColor = c1.clone().lerp(c2, Math.sin(t * 0.3) * 0.5 + 0.5);
      if (i % 3 === 0) mixedColor.lerp(c3, 0.4);

      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Visibility dynamically scales with deep scrolling (blooms between p 0.35 and 0.9)
    const visibilityFactor = THREE.MathUtils.clamp(
      Math.sin(scrollProgress * Math.PI),
      0,
      1
    );

    pointsRef.current.rotation.z += delta * (0.15 + scrollProgress * 0.4);

    // Continuous flow along z-axis synced with scroll
    const posAttr = pointsRef.current.geometry.attributes.position;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      let z = array[i * 3 + 2];
      z += delta * (2.0 + scrollProgress * 6.0);
      if (z > 14) z -= 28;
      array[i * 3 + 2] = z;
    }
    posAttr.needsUpdate = true;

    // Fade opacity
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = THREE.MathUtils.lerp(mat.opacity, visibilityFactor * 0.8, 0.08);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
