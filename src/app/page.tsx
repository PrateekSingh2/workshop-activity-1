'use client';

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [inquiryText, setInquiryText] = useState('');
  const [transmitted, setTransmitted] = useState(false);
  const toggleWireframeMode = useStore((state) => state.toggleWireframeMode);
  const wireframeMode = useStore((state) => state.wireframeMode);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@igloo-studio.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryText.trim()) return;
    setTransmitted(true);
    setTimeout(() => {
      setInquiryText('');
      setTransmitted(false);
    }, 3500);
  };

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO */}
      <section
        id="hero"
        className="min-h-screen w-full flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32"
      >
        <div className="max-w-4xl flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-white/50 tracking-[0.25em] uppercase">
              STUDIO ARCHITECTURE {"//"} VOL. 2026
            </span>
            <div className="h-[1px] w-12 bg-white/20" />
            <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              LIVE WEBGL2 CORE
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.88] text-white">
            SHAPING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-500">
              DIGITAL
            </span>{' '}
            TACTILITY
          </h1>

          <p className="max-w-xl text-sm sm:text-base md:text-lg text-neutral-400 font-light leading-relaxed">
            An elite creative engineering laboratory bridging algorithmic precision, physically based
            transmission materials, and deterministic scroll mechanics.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4 pointer-events-auto">
            <a
              href="#ethos"
              className="px-7 py-3.5 rounded-full text-xs font-mono font-bold tracking-wider bg-white text-black hover:bg-neutral-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(255,255,255,0.25)]"
            >
              EXPLORE ETHOS ↓
            </a>
            <a
              href="#showcase"
              className="px-7 py-3.5 rounded-full text-xs font-mono font-medium tracking-wider text-white/80 border border-white/15 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/30 backdrop-blur-md transition-all duration-300"
            >
              SHOWCASE ARCHIVE [04]
            </a>
            <button
              onClick={toggleWireframeMode}
              className="px-5 py-3.5 rounded-full text-xs font-mono font-medium tracking-wider text-indigo-400 border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/15 backdrop-blur-md transition-all duration-300"
            >
              {wireframeMode ? 'PBR RENDER' : 'INSPECT MESH'}
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: ETHOS */}
      <section
        id="ethos"
        className="min-h-screen w-full flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32"
      >
        <div className="max-w-4xl flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-indigo-400 tracking-[0.25em] uppercase">
              02 {"//"} PHILOSOPHY & SYSTEM
            </span>
            <div className="h-[1px] w-12 bg-indigo-500/30" />
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase leading-[0.95] text-white">
            DEFYING CONVENTIONAL <br />
            <span className="text-neutral-500">2D WEB BOUNDARIES</span>
          </h2>

          <p className="max-w-2xl text-base md:text-xl text-neutral-300 font-light leading-relaxed">
            By harmonizing custom GLSL shaders, procedural mesh generation, and deterministic scroll physics,
            every pixel behaves with physical presence, refraction, and organic weight.
          </p>

          {/* Metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 pointer-events-auto">
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl flex flex-col gap-2 hover:border-white/20 transition-colors">
              <span className="font-mono text-2xl md:text-3xl font-bold text-white">60 FPS</span>
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
                Uncapped Framerate
              </span>
              <p className="text-[11px] text-neutral-500 mt-1">
                Zero-drop RAF sync integrated directly with Lenis and GSAP Ticker.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl flex flex-col gap-2 hover:border-white/20 transition-colors">
              <span className="font-mono text-2xl md:text-3xl font-bold text-white">PBR CORE</span>
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
                Physical Transmission
              </span>
              <p className="text-[11px] text-neutral-500 mt-1">
                Multi-bounce optical refraction with volumetric glass thickness.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl flex flex-col gap-2 hover:border-white/20 transition-colors">
              <span className="font-mono text-2xl md:text-3xl font-bold text-white">ZERO JITTER</span>
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
                Deterministic Inertia
              </span>
              <p className="text-[11px] text-neutral-500 mt-1">
                Spring physics lerp eliminating hardware scroll deceleration quirks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SYSTEMS */}
      <section
        id="systems"
        className="min-h-screen w-full flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32"
      >
        <div className="max-w-5xl flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-cyan-400 tracking-[0.25em] uppercase">
              03 {"//"} PROCEDURAL & SPATIAL SYSTEMS
            </span>
            <div className="h-[1px] w-12 bg-cyan-500/30" />
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase leading-[0.95] text-white">
            MATHEMATICAL RIGOR, <br />
            <span className="text-neutral-500">ORGANIC REACTION</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 pointer-events-auto">
            <div className="p-7 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl flex flex-col justify-between h-80 hover:border-cyan-500/40 transition-all duration-500 group">
              <div className="flex justify-between items-start font-mono text-xs text-cyan-400">
                <span>SYSTEM // 01</span>
                <span>[IOR 1.52]</span>
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  Optical Refraction
                </h3>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  Realtime transmission computing dual-surface internal caustics and chromatic dispersion across complex curvature.
                </p>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 w-3/4 group-hover:w-full transition-all duration-500" />
              </div>
            </div>

            <div className="p-7 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl flex flex-col justify-between h-80 hover:border-indigo-500/40 transition-all duration-500 group">
              <div className="flex justify-between items-start font-mono text-xs text-indigo-400">
                <span>SYSTEM // 02</span>
                <span>[GIMBAL]</span>
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                  Gyroscopic Rings
                </h3>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  Concentric multi-axis orbital rings dynamically tilting with mouse coordinates and scroll velocity delta.
                </p>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-400 w-1/2 group-hover:w-full transition-all duration-500" />
              </div>
            </div>

            <div className="p-7 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl flex flex-col justify-between h-80 hover:border-emerald-500/40 transition-all duration-500 group">
              <div className="flex justify-between items-start font-mono text-xs text-emerald-400">
                <span>SYSTEM // 03</span>
                <span>[DPR 1-2]</span>
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                  Adaptive DPR
                </h3>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  Intelligent viewport rasterization balancing ultra-crisp retina typography with fluid 60 FPS 3D rendering.
                </p>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 w-5/6 group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SHOWCASE */}
      <section
        id="showcase"
        className="min-h-screen w-full flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32"
      >
        <div className="max-w-5xl flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-emerald-400 tracking-[0.25em] uppercase">
              04 {"//"} SELECTED ARCHITECTURE
            </span>
            <div className="h-[1px] w-12 bg-emerald-500/30" />
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase leading-[0.95] text-white">
            SCULPTED IN REALTIME
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 pointer-events-auto">
            <div className="p-8 rounded-3xl border border-white/10 bg-black/50 backdrop-blur-xl flex flex-col justify-between h-80 hover:border-white/30 transition-all duration-500 group">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-white/40">INSTALLATION {"//"} 01</span>
                <span className="text-xs font-mono text-emerald-400 group-hover:text-emerald-300 transition-colors">
                  CASE STUDY ↗
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  EXPERIMENTAL SPATIAL CANVAS
                </span>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white mt-1">
                  Procedural Monolith
                </h3>
                <p className="text-xs text-neutral-400 mt-2">
                  Dynamic noise displacement shaders with physical glass refraction and real-time vertex displacement.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl border border-white/10 bg-black/50 backdrop-blur-xl flex flex-col justify-between h-80 hover:border-white/30 transition-all duration-500 group">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-white/40">INSTALLATION {"//"} 02</span>
                <span className="text-xs font-mono text-indigo-400 group-hover:text-indigo-300 transition-colors">
                  CASE STUDY ↗
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  MULTI-CAMERA CHOREOGRAPHY
                </span>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white mt-1">
                  Hyper-Spatial Index
                </h3>
                <p className="text-xs text-neutral-400 mt-2">
                  Multi-waypoint camera interpolation synchronized with Lenis inertia and GSAP ScrollTrigger timeline.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl border border-white/10 bg-black/50 backdrop-blur-xl flex flex-col justify-between h-80 hover:border-white/30 transition-all duration-500 group">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-white/40">INSTALLATION {"//"} 03</span>
                <span className="text-xs font-mono text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  CASE STUDY ↗
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  VOLUMETRIC OPTICS
                </span>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white mt-1">
                  Chroma Caustics
                </h3>
                <p className="text-xs text-neutral-400 mt-2">
                  Multi-pass PostProcessing pipeline combining bloom, chromatic aberration, and vignette framing.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl border border-white/10 bg-black/50 backdrop-blur-xl flex flex-col justify-between h-80 hover:border-white/30 transition-all duration-500 group">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs text-white/40">INSTALLATION {"//"} 04</span>
                <span className="text-xs font-mono text-rose-400 group-hover:text-rose-300 transition-colors">
                  CASE STUDY ↗
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  AUDIO-REACTIVE LAB
                </span>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white mt-1">
                  Aether Resonance
                </h3>
                <p className="text-xs text-neutral-400 mt-2">
                  Real-time frequency domain audio processing perturbing 3D geometry vertices and orbital satellite shards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: TECH */}
      <section
        id="tech"
        className="min-h-screen w-full flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32"
      >
        <div className="max-w-5xl flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-violet-400 tracking-[0.25em] uppercase">
              05 {"//"} THE REALTIME WEBGL STACK
            </span>
            <div className="h-[1px] w-12 bg-violet-500/30" />
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase leading-[0.95] text-white">
            ARCHITECTURAL MATRIX
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 pointer-events-auto">
            {[
              { name: 'Three.js / WebGL2', desc: 'Physically based shaders & GPU rasterization', tag: 'CORE 3D' },
              { name: 'React Three Fiber', desc: 'Declarative high-performance component tree', tag: 'RECONCILER' },
              { name: '@react-three/drei', desc: 'HDR Environment & shader post-processing', tag: 'TOOLKIT' },
              { name: 'GSAP ScrollTrigger', desc: 'Deterministic timeline keyframe orchestration', tag: 'ANIMATION' },
              { name: 'Lenis Virtual Scroll', desc: 'Ultra-smooth hardware inertia synchronization', tag: 'PHYSICS' },
              { name: 'Zustand Store', desc: 'Zero-overhead cross-context state synchronization', tag: 'STATE' },
            ].map((tech, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl flex flex-col justify-between h-44 hover:border-violet-500/30 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] text-white/40 tracking-wider uppercase">
                    0{idx + 1}
                  </span>
                  <span className="font-mono text-[9px] text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full border border-violet-500/20">
                    {tech.tag}
                  </span>
                </div>
                <div>
                  <h4 className="font-mono text-sm font-bold text-white tracking-wide">{tech.name}</h4>
                  <p className="text-xs text-neutral-400 mt-1">{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: CONTACT */}
      <section
        id="contact"
        className="min-h-screen w-full flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32"
      >
        <div className="max-w-4xl flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-rose-400 tracking-[0.25em] uppercase">
              06 {"//"} DISPATCH & ENGAGEMENT
            </span>
            <div className="h-[1px] w-12 bg-rose-500/30" />
            <span className="font-mono text-[10px] text-white/40">
              WORLDWIDE DIGITAL COMMISSIONS
            </span>
          </div>

          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight uppercase leading-[0.88] text-white">
            READY TO BUILD <br />
            <span className="text-neutral-500">THE UNPRECEDENTED?</span>
          </h2>

          <p className="max-w-xl text-base md:text-lg text-neutral-400 font-light leading-relaxed">
            Currently accepting commissions and architectural consultations for breakthrough creative web platforms,
            interactive 3D products, and brand flagships.
          </p>

          {/* Interactive Transmission Terminal */}
          <form onSubmit={handleTransmit} className="flex flex-col sm:flex-row gap-3 pt-2 max-w-xl pointer-events-auto">
            <input
              type="text"
              placeholder="ENTER PROJECT BRIEF OR DIRECT INQUIRY..."
              value={inquiryText}
              onChange={(e) => setInquiryText(e.target.value)}
              className="flex-1 px-5 py-3.5 rounded-full border border-white/15 bg-white/[0.04] text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-white/50 backdrop-blur-xl transition-all"
            />
            <button
              type="submit"
              className="px-7 py-3.5 rounded-full text-xs font-mono font-bold tracking-wider bg-white text-black hover:bg-neutral-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.25)]"
            >
              {transmitted ? 'TRANSMITTED ✓' : 'TRANSMIT BRIEF ↗'}
            </button>
          </form>

          {/* Studio Coordinates & Copy Email Action */}
          <div className="flex flex-wrap items-center gap-4 pt-4 pointer-events-auto">
            <button
              onClick={handleCopyEmail}
              className="px-6 py-3.5 rounded-full text-xs font-mono font-medium tracking-wider text-white border border-white/20 bg-white/[0.04] hover:bg-white/[0.1] hover:border-white/40 backdrop-blur-md transition-all duration-300"
            >
              {copied ? 'EMAIL COPIED TO CLIPBOARD ✓' : 'HELLO@IGLOO-STUDIO.COM [COPY]'}
            </button>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-full text-xs font-mono font-medium tracking-wider text-white/60 border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] backdrop-blur-md transition-all duration-300"
            >
              BACK TO TOP ↑
            </button>
          </div>

          {/* Global Studio Coordinates */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10 font-mono text-[10px] text-white/40">
            <div>
              <span className="text-white/70 block">TOKYO HUB</span>
              <span>35.6762° N, 139.6503° E</span>
            </div>
            <div>
              <span className="text-white/70 block">ZURICH STUDIO</span>
              <span>47.3769° N, 8.5417° E</span>
            </div>
            <div>
              <span className="text-white/70 block">SAN FRANCISCO LAB</span>
              <span>37.7749° N, 122.4194° W</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
