'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useStore } from '@/store/useStore';

export default function CameraRig() {
  const scrollProgress = useStore((state) => state.scrollProgress);
  const pointer = useStore((state) => state.pointer);

  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));
  const targetCamPos = useRef(new THREE.Vector3(0, 0, 5.2));

  useFrame((state) => {
    const p = THREE.MathUtils.clamp(scrollProgress, 0, 1);
    const aspect = state.size.width / state.size.height;
    const isMobile = aspect < 1.0;

    // Mobile FOV adaptation
    const targetFov = isMobile ? 64 : 45;
    const persCam = state.camera as THREE.PerspectiveCamera;
    if (persCam.fov !== targetFov) {
      persCam.fov = THREE.MathUtils.lerp(persCam.fov, targetFov, 0.05);
      persCam.updateProjectionMatrix();
    }

    // 10-Waypoint Spatial Trajectory
    let targetX = 0;
    let targetY = 0;
    let targetZ = isMobile ? 6.2 : 5.2;

    let lookX = 0;
    let lookY = 0;
    const lookZ = 0;

    // Determine segment (0 to 8)
    const segmentIndex = Math.min(8, Math.floor(p * 9));
    const segmentProgress = (p * 9) - segmentIndex;

    const waypoints = [
      // 0: HERO
      { x: 0, y: 0, z: isMobile ? 6.2 : 5.2, lx: 0, ly: 0 },
      // 1: ETHOS
      { x: isMobile ? 0.3 : 1.7, y: 0.35, z: 4.4, lx: 0.35, ly: 0 },
      // 2: SYSTEMS
      { x: isMobile ? -0.3 : -1.6, y: -0.5, z: 4.6, lx: -0.3, ly: 0.2 },
      // 3: MORPH LAB
      { x: 0, y: 0.1, z: isMobile ? 5.8 : 4.8, lx: 0, ly: 0 },
      // 4: BLUEPRINT
      { x: isMobile ? 0.4 : 1.8, y: 0.9, z: 5.2, lx: 0.4, ly: -0.1 },
      // 5: GALLERY
      { x: isMobile ? -0.4 : -1.7, y: -0.3, z: 5.5, lx: -0.2, ly: 0.2 },
      // 6: TELEMETRY
      { x: 0, y: 0.7, z: 4.2, lx: 0, ly: 0 },
      // 7: RECOGNITION
      { x: isMobile ? 0.3 : 1.6, y: -0.4, z: 4.5, lx: 0.3, ly: 0.1 },
      // 8: FAQ
      { x: isMobile ? -0.3 : -1.5, y: 0.2, z: 3.8, lx: -0.2, ly: 0 },
      // 9: CONTACT PORTAL
      { x: 0, y: 0, z: isMobile ? 3.0 : 2.3, lx: 0, ly: 0 },
    ];

    const current = waypoints[segmentIndex];
    const next = waypoints[segmentIndex + 1] || waypoints[segmentIndex];

    targetX = THREE.MathUtils.lerp(current.x, next.x, segmentProgress);
    targetY = THREE.MathUtils.lerp(current.y, next.y, segmentProgress);
    targetZ = THREE.MathUtils.lerp(current.z, next.z, segmentProgress);

    lookX = THREE.MathUtils.lerp(current.lx, next.lx, segmentProgress);
    lookY = THREE.MathUtils.lerp(current.ly, next.ly, segmentProgress);

    // Responsive Desktop Parallax
    const parallaxStrength = isMobile ? 0.1 : 0.4;
    const parallaxX = pointer.x * parallaxStrength;
    const parallaxY = pointer.y * parallaxStrength;

    targetCamPos.current.set(
      targetX + parallaxX,
      targetY + parallaxY,
      targetZ
    );

    state.camera.position.lerp(targetCamPos.current, 0.06);

    currentTarget.current.lerp(new THREE.Vector3(lookX, lookY, lookZ), 0.08);
    state.camera.lookAt(currentTarget.current);
  });

  return null;
}
