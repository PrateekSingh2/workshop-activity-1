'use client';

import React from 'react';

export default function Lights() {
  return (
    <>
      {/* Ambient Fill */}
      <ambientLight intensity={0.4} color="#0d1117" />

      {/* Key Sun/Studio Directional Light */}
      <directionalLight
        position={[6, 8, 6]}
        intensity={1.8}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      {/* Rim / Edge Light (Cyberpunk indigo tone) */}
      <directionalLight
        position={[-6, -4, -4]}
        intensity={1.2}
        color="#6366f1"
      />

      {/* Specular Glint Accent */}
      <pointLight
        position={[0, -2, 3]}
        intensity={1.5}
        distance={15}
        color="#38bdf8"
      />
    </>
  );
}
