'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Environment, Float, Sparkles } from '@react-three/drei';
import Lights from './Lights';
import Effects from './Effects';
import CameraRig from './CameraRig';
import FloatingShards from './FloatingShards';
import FloatingBubbles from './FloatingBubbles';
import SpiralTunnel from './SpiralTunnel';
import { useStore } from '@/store/useStore';

export default function Scene() {
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);
  const ringGroupRef = useRef<THREE.Group>(null);
  const mainGroupRef = useRef<THREE.Group>(null);

  const scrollProgress = useStore((state) => state.scrollProgress);
  const pointer = useStore((state) => state.pointer);
  const wireframeMode = useStore((state) => state.wireframeMode);
  const geometryShape = useStore((state) => state.geometryShape);
  const materialPreset = useStore((state) => state.materialPreset);

  useFrame((state, delta) => {
    const p = scrollProgress;
    const aspect = state.size.width / state.size.height;
    const isMobile = aspect < 1.0;

    // 1. Group Translation across the 10-section spectrum
    if (mainGroupRef.current) {
      // Lateral shift based on scroll progress sine/cosine curves
      const wave = Math.sin(p * Math.PI * 4);
      const targetX = isMobile ? wave * 0.25 : wave * 0.95;
      const targetY = Math.cos(p * Math.PI * 3) * 0.22;
      const targetScale = isMobile
        ? THREE.MathUtils.lerp(0.85, 1.35, p)
        : THREE.MathUtils.lerp(1.05, 1.75, p);

      mainGroupRef.current.position.x = THREE.MathUtils.lerp(
        mainGroupRef.current.position.x,
        targetX,
        0.06
      );
      mainGroupRef.current.position.y = THREE.MathUtils.lerp(
        mainGroupRef.current.position.y,
        targetY,
        0.06
      );
      mainGroupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.06
      );
    }

    // 2. Continuous Organic Rotations
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.x += delta * (0.16 + p * 0.4);
      outerMeshRef.current.rotation.y += delta * (0.2 + p * 0.5);
      outerMeshRef.current.rotation.z += delta * 0.08;
    }

    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x -= delta * (0.25 + p * 0.45);
      innerMeshRef.current.rotation.y -= delta * (0.32 + p * 0.5);
    }

    // 3. Gyroscopic Ring Array
    if (ringGroupRef.current) {
      ringGroupRef.current.rotation.z += delta * 0.2;
      ringGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        ringGroupRef.current.rotation.y,
        p * Math.PI * 5 + pointer.x * 0.45,
        0.05
      );
    }
  });

  // Dynamic Geometry Selector
  const renderGeometry = () => {
    switch (geometryShape) {
      case 'torus':
        return <torusGeometry args={[1.05, 0.35, 32, 120]} />;
      case 'dodeca':
        return <dodecahedronGeometry args={[1.15, 1]} />;
      case 'sphere':
        return <sphereGeometry args={[1.1, 64, 64]} />;
      case 'knot':
      default:
        return <torusKnotGeometry args={[0.9, 0.32, 160, 36, 2, 3]} />;
    }
  };

  // Dynamic Material Props
  const getMaterialProps = () => {
    if (wireframeMode) {
      return {
        color: '#6366f1',
        wireframe: true,
        metalness: 0.9,
        roughness: 0.1,
      };
    }

    switch (materialPreset) {
      case 'chrome':
        return {
          color: '#e2e8f0',
          wireframe: false,
          roughness: 0.03,
          metalness: 0.98,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
          transmission: 0,
        };
      case 'iridescent':
        return {
          color: '#ffffff',
          wireframe: false,
          roughness: 0.1,
          metalness: 0.8,
          clearcoat: 1.0,
          iridescence: 1.0,
          iridescenceIOR: 1.6,
          transmission: 0.2,
        };
      case 'gold':
        return {
          color: '#f59e0b',
          wireframe: false,
          roughness: 0.15,
          metalness: 0.95,
          clearcoat: 0.8,
          transmission: 0,
        };
      case 'glass':
      default:
        return {
          color: '#ffffff',
          wireframe: false,
          roughness: 0.08,
          metalness: 0.15,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
          transmission: 0.72,
          ior: 1.52,
          thickness: 1.9,
          specularIntensity: 1.0,
          specularColor: '#ffffff',
          iridescence: 0.5,
          iridescenceIOR: 1.38,
        };
    }
  };

  return (
    <>
      <CameraRig />

      {/* Environment & Studio Lighting */}
      <Environment preset="city" />
      <Lights />

      {/* Background Depth Elements */}
      <FloatingBubbles count={8} />

      {/* Infinite Cyber Spiral Tunnel */}
      <SpiralTunnel count={280} />

      {/* Master 3D Sculpture Group */}
      <Float
        speed={1.6}
        rotationIntensity={0.35}
        floatIntensity={0.5}
        floatingRange={[-0.12, 0.12]}
      >
        <group ref={mainGroupRef}>
          {/* Main Morphable Sculpture */}
          <mesh ref={outerMeshRef} castShadow receiveShadow>
            {renderGeometry()}
            <meshPhysicalMaterial {...getMaterialProps()} />
          </mesh>

          {/* Inner Glowing Crystalline Core */}
          <mesh ref={innerMeshRef} scale={0.48}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
              color="#6366f1"
              emissive="#818cf8"
              emissiveIntensity={wireframeMode ? 1.6 : 0.95}
              wireframe
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>

          {/* Tri-Ring Gyroscopic Array */}
          <group ref={ringGroupRef}>
            <mesh rotation={[Math.PI / 4, 0, 0]}>
              <torusGeometry args={[2.2, 0.016, 16, 120]} />
              <meshStandardMaterial
                color="#c7d2fe"
                emissive="#6366f1"
                emissiveIntensity={0.5}
                metalness={0.95}
                roughness={0.1}
              />
            </mesh>
            <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
              <torusGeometry args={[2.5, 0.012, 16, 120]} />
              <meshStandardMaterial
                color="#38bdf8"
                emissive="#0284c7"
                emissiveIntensity={0.45}
                metalness={0.95}
                roughness={0.1}
              />
            </mesh>
            <mesh rotation={[0, Math.PI / 6, Math.PI / 2]}>
              <torusGeometry args={[2.8, 0.009, 16, 120]} />
              <meshStandardMaterial
                color="#e0e7ff"
                emissive="#4338ca"
                emissiveIntensity={0.35}
                metalness={0.95}
                roughness={0.1}
              />
            </mesh>
          </group>

          {/* 20 Satellite Exploding Shards */}
          <FloatingShards count={20} />
        </group>
      </Float>

      {/* Cyber Dust Starfield */}
      <Sparkles
        count={140}
        scale={14}
        size={2.4}
        speed={0.35}
        opacity={0.4}
        color="#c7d2fe"
      />

      <Effects />
    </>
  );
}
