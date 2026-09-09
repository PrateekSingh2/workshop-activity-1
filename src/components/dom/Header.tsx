'use client';

import React from 'react';
import { useStore } from '@/store/useStore';

const SECTIONS = [
  { id: 0, label: 'HERO', hash: '#hero' },
  { id: 1, label: 'ETHOS', hash: '#ethos' },
  { id: 2, label: 'SYSTEMS', hash: '#systems' },
  { id: 3, label: 'MORPH', hash: '#morph' },
  { id: 4, label: 'BLUEPRINT', hash: '#blueprint' },
  { id: 5, label: 'GALLERY', hash: '#gallery' },
  { id: 6, label: 'TELEMETRY', hash: '#telemetry' },
  { id: 7, label: 'HONORS', hash: '#honors' },
  { id: 8, label: 'FAQ', hash: '#faq' },
  { id: 9, label: 'CONTACT', hash: '#contact' },
];

export default function Header() {
  const activeSection = useStore((state) => state.activeSection);
  const wireframeMode = useStore((state) => state.wireframeMode);
  const toggleWireframeMode = useStore((state) => state.toggleWireframeMode);
  const audioActive = useStore((state) => state.audioActive);
  const toggleAudioActive = useStore((state) => state.toggleAudioActive);

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-4 md:px-10 py-5 flex items-center justify-between pointer-events-none select-none">
      {/* Brand Logo & Telemetry Indicator */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full border border-white/15 bg-black/50 backdrop-blur-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-xs font-bold tracking-widest text-white">
            IGLOO<span className="text-white/40">{"//"}</span>STUDIO
          </span>
          <span className="font-mono text-[9px] text-white/40 tracking-wider uppercase">
            3D SPATIAL ARCHITECTURE
          </span>
        </div>
      </div>

      {/* Center 10-Section Navigation Bar */}
      <nav className="hidden xl:flex items-center gap-1 p-1 rounded-full border border-white/10 bg-black/50 backdrop-blur-2xl pointer-events-auto max-w-2xl overflow-x-auto">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <a
              key={sec.id}
              href={sec.hash}
              className={`px-2.5 py-1 rounded-full font-mono text-[9px] tracking-wider transition-all duration-300 whitespace-nowrap ${
                isActive
                  ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-105'
                  : 'text-white/50 hover:text-white/90 hover:bg-white/[0.04]'
              }`}
            >
              0{sec.id + 1} {sec.label}
            </a>
          );
        })}
      </nav>

      {/* Current Active Section Badge for medium/small screens */}
      <div className="flex xl:hidden items-center px-3 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-md font-mono text-[10px] text-white/80 pointer-events-auto">
        <span className="text-white/40 mr-1.5">ACTIVE:</span>
        <span className="text-white font-bold">{SECTIONS[activeSection]?.label || '01 HERO'}</span>
      </div>

      {/* Right Controls: Wireframe Toggle, Sound Toggle & Contact CTA */}
      <div className="flex items-center gap-2.5 pointer-events-auto">
        {/* Wireframe Switcher */}
        <button
          onClick={toggleWireframeMode}
          title="Toggle 3D Wireframe View"
          className={`px-3 py-1.5 rounded-full border font-mono text-[10px] tracking-wider transition-all duration-300 backdrop-blur-md ${
            wireframeMode
              ? 'border-indigo-400 text-indigo-300 bg-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.5)]'
              : 'border-white/10 text-white/60 bg-white/[0.03] hover:text-white hover:border-white/25'
          }`}
        >
          MESH {"//"} {wireframeMode ? 'ON' : 'PBR'}
        </button>

        {/* Audio Visualizer Pill */}
        <button
          onClick={toggleAudioActive}
          title="Toggle Ambient Audio Experience"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-white/25 transition-all"
        >
          <div className="flex items-end gap-[2px] h-3">
            <span
              className={`w-[2px] bg-white/70 rounded-full transition-all ${
                audioActive ? 'h-full animate-pulse' : 'h-1'
              }`}
            />
            <span
              className={`w-[2px] bg-white/70 rounded-full transition-all ${
                audioActive ? 'h-2 animate-bounce' : 'h-2'
              }`}
            />
            <span
              className={`w-[2px] bg-white/70 rounded-full transition-all ${
                audioActive ? 'h-3 animate-pulse' : 'h-1.5'
              }`}
            />
          </div>
          <span className="font-mono text-[9px] text-white/60 tracking-wider">
            {audioActive ? 'SFX: ON' : 'SFX: OFF'}
          </span>
        </button>

        {/* Contact CTA */}
        <a
          href="#contact"
          className="px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider text-black bg-white hover:bg-neutral-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          INITIATE
        </a>
      </div>
    </header>
  );
}
