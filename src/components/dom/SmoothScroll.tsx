'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '@/store/useStore';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const setScrollProgress = useStore((state) => state.setScrollProgress);
  const setScrollVelocity = useStore((state) => state.setScrollVelocity);
  const setPointer = useStore((state) => state.setPointer);

  useEffect(() => {
    // Initialize Lenis with tuned inertia and friction for luxury feel
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;

    // Connect Lenis to ScrollTrigger updates
    lenis.on('scroll', (e: { progress: number; velocity: number }) => {
      ScrollTrigger.update();
      setScrollProgress(e.progress);
      setScrollVelocity(e.velocity);
    });

    // Synchronize GSAP ticker with Lenis requestAnimationFrame
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Mouse movement listener to track normalized coordinates for parallax
    const handlePointerMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setPointer({ x, y });
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [setScrollProgress, setScrollVelocity, setPointer]);

  return <>{children}</>;
}

