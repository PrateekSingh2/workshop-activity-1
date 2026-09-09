'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
} from '@react-three/postprocessing';

export default function Effects() {
  const chromaticAberrationOffset = useMemo(
    () => new THREE.Vector2(0.0006, 0.0006),
    []
  );

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={0.8}
        luminanceSmoothing={0.35}
        intensity={0.5}
        mipmapBlur
      />
      <Vignette eskil={false} offset={0.2} darkness={0.7} />
      <ChromaticAberration
        offset={chromaticAberrationOffset}
        radialModulation={false}
        modulationOffset={0.15}
      />
    </EffectComposer>
  );
}
