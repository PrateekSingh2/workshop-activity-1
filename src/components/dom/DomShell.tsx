'use client';

import React from 'react';
import SmoothScroll from './SmoothScroll';
import Header from './Header';
import FooterOverlay from './FooterOverlay';
import CustomLoader from './CustomLoader';
import SceneCanvas from '@/components/canvas/SceneCanvas';

interface DomShellProps {
  children: React.ReactNode;
  canvas?: React.ReactNode;
}

export default function DomShell({ children, canvas }: DomShellProps) {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#070709] text-white selection:bg-white selection:text-black overflow-x-hidden">
        {/* 0. Cinematic Asset Preloader Curtain */}
        <CustomLoader />

        {/* 1. Fixed Background 3D Canvas Layer */}
        <div
          id="canvas-container"
          className="fixed inset-0 w-screen h-screen z-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          {canvas ?? <SceneCanvas />}
        </div>

        {/* 2. Analog Film Grain Noise Overlay */}
        <div className="grain-overlay" aria-hidden="true" />

        {/* 3. Persistent Fixed HUD: Header & Telemetry Footer */}
        <Header />
        <FooterOverlay />

        {/* 4. Scrollable Transparent DOM Content Layer */}
        <main className="relative z-10 w-full min-h-screen pointer-events-none">
          {children}
        </main>
      </div>
    </SmoothScroll>
  );
}
