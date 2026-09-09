'use client';

import React from 'react';
import { useStore } from '@/store/useStore';

export default function FooterOverlay() {
  const scrollProgress = useStore((state) => state.scrollProgress);
  const activeSection = useStore((state) => state.activeSection);
  const pointer = useStore((state) => state.pointer);

  const percentage = Math.round(scrollProgress * 100);

  return (
    <footer className="fixed bottom-0 left-0 w-full z-40 px-6 md:px-12 py-6 flex items-end justify-between pointer-events-none select-none">
      {/* Scroll Progress Meter */}
      <div className="flex flex-col gap-2 pointer-events-auto">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xl md:text-2xl font-bold tracking-tight text-white">
            {percentage.toString().padStart(2, '0')}%
          </span>
          <div className="flex flex-col">
            <span className="font-mono text-[9px] text-white/40 tracking-widest uppercase">
              SCROLL DEPTH
            </span>
            <span className="font-mono text-[10px] text-white/70 tracking-wider">
              SECTION {activeSection + 1 < 10 ? '0' : ''}{activeSection + 1} {"//"} 10
            </span>
          </div>
        </div>

        {/* Minimalist Progress Track */}
        <div className="w-36 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-150 ease-out shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Center Scroll Prompt (fades out after scrolling starts) */}
      <div
        className={`hidden md:flex flex-col items-center gap-2 transition-opacity duration-700 ${
          scrollProgress > 0.05 ? 'opacity-0 pointer-events-none' : 'opacity-80'
        }`}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-white/60 uppercase animate-pulse">
          SCROLL TO EXPLORE
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/60 via-white/20 to-transparent animate-pulse" />
      </div>

      {/* Right Telemetry: Cursor & Coordinates */}
      <div className="flex flex-col items-end gap-1 font-mono text-[10px] text-white/40 tracking-wider pointer-events-auto">
        <div className="flex items-center gap-2">
          <span>PTR_X: {pointer.x >= 0 ? `+${pointer.x.toFixed(2)}` : pointer.x.toFixed(2)}</span>
          <span className="text-white/20">|</span>
          <span>PTR_Y: {pointer.y >= 0 ? `+${pointer.y.toFixed(2)}` : pointer.y.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
          <span className="text-white/60">WEBGL2 CORE {"//"} 60 FPS</span>
        </div>
      </div>
    </footer>
  );
}
