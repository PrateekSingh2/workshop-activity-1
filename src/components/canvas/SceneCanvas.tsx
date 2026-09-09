'use client';

import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Scene from './Scene';

export default function SceneCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full bg-[#070709]" />;
  }

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{
        position: [0, 0, 5],
        fov: 45,
        near: 0.1,
        far: 100,
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      className="w-full h-full"
    >
      <Scene />
    </Canvas>
  );
}
