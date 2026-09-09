'use client';

import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { useStore } from '@/store/useStore';

export default function CustomLoader() {
  const { progress } = useProgress();
  const setIsReady = useStore((state) => state.setIsReady);
  const setLoadProgress = useStore((state) => state.setLoadProgress);

  const [displayProgress, setDisplayProgress] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Smooth progress interpolation
    const target = Math.max(progress, displayProgress);
    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev >= 100 || (progress === 100 && prev >= 99)) {
          clearInterval(interval);
          setHasCompleted(true);
          setIsReady(true);
          return 100;
        }
        const step = (target - prev) * 0.15 + 1;
        return Math.min(100, Math.round(prev + step));
      });
    }, 25);

    return () => clearInterval(interval);
  }, [progress, displayProgress, setIsReady]);

  useEffect(() => {
    setLoadProgress(displayProgress);
  }, [displayProgress, setLoadProgress]);

  // Fallback safety timeout (experience opens within 1.8s maximum)
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      setDisplayProgress(100);
      setHasCompleted(true);
      setIsReady(true);
    }, 1800);

    return () => clearTimeout(safetyTimer);
  }, [setIsReady]);

  // Remove completely from DOM after curtain transition completes
  useEffect(() => {
    if (hasCompleted) {
      const exitTimer = setTimeout(() => {
        setRemoved(true);
      }, 1100);
      return () => clearTimeout(exitTimer);
    }
  }, [hasCompleted]);

  if (removed) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between p-8 md:p-14 bg-[#060608] text-white transition-all duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        hasCompleted
          ? 'opacity-0 -translate-y-6 pointer-events-none'
          : 'opacity-100 translate-y-0'
      }`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between font-mono text-xs text-white/50 tracking-widest">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
          <span>IGLOO // SPATIAL ARCHITECTURE</span>
        </div>
        <span className="hidden sm:inline">SYS_LOAD // 2026</span>
      </div>

      {/* Center Giant Percentage Counter */}
      <div className="flex flex-col items-center justify-center gap-4 my-auto">
        <div className="flex items-baseline">
          <span className="font-mono text-7xl sm:text-9xl md:text-[12rem] font-black tracking-tighter leading-none text-white">
            {displayProgress.toString().padStart(2, '0')}
          </span>
          <span className="font-mono text-2xl sm:text-4xl text-white/30 font-light ml-2">
            %
          </span>
        </div>

        {/* Minimalist Progress Track */}
        <div className="w-48 sm:w-72 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-150 ease-out shadow-[0_0_15px_rgba(255,255,255,0.9)]"
            style={{ width: `${displayProgress}%` }}
          />
        </div>

        <span className="font-mono text-[10px] text-white/40 tracking-[0.3em] uppercase mt-2">
          {displayProgress < 40
            ? 'ALLOCATING WEBGL2 BUFFERS'
            : displayProgress < 85
            ? 'COMPILING PHYSICAL SHADERS'
            : 'INITIALIZATION COMPLETE'}
        </span>
      </div>

      {/* Bottom Metadata */}
      <div className="flex items-center justify-between font-mono text-[10px] text-white/30 tracking-wider">
        <span>RENDER ENGINE: THREE.JS / R3F</span>
        <span>LATENCY OPTIMIZED</span>
      </div>
    </div>
  );
}
