import { create } from 'zustand';

export type SectionId =
  | 'HERO'
  | 'ETHOS'
  | 'SYSTEMS'
  | 'MORPH'
  | 'BLUEPRINT'
  | 'GALLERY'
  | 'TELEMETRY'
  | 'RECOGNITION'
  | 'FAQ'
  | 'CONTACT';

export type GeometryShape = 'knot' | 'torus' | 'dodeca' | 'sphere';
export type MaterialPreset = 'glass' | 'chrome' | 'iridescent' | 'gold';

export interface AppState {
  // Scroll progress normalized [0, 1]
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;

  // Scroll velocity
  scrollVelocity: number;
  setScrollVelocity: (velocity: number) => void;

  // Active section index [0, 9] and identifier
  activeSection: number;
  activeSectionName: SectionId;
  setActiveSection: (index: number) => void;

  // Mouse / Pointer normalized coordinates [-1, 1]
  pointer: { x: number; y: number };
  setPointer: (coords: { x: number; y: number }) => void;

  // Global scene loading / ready state
  isReady: boolean;
  setIsReady: (ready: boolean) => void;
  loadProgress: number;
  setLoadProgress: (progress: number) => void;

  // Interactive 3D toggles & Morph Controls
  wireframeMode: boolean;
  toggleWireframeMode: () => void;
  audioActive: boolean;
  toggleAudioActive: () => void;

  // Dynamic 3D Geometry & Material Controls
  geometryShape: GeometryShape;
  setGeometryShape: (shape: GeometryShape) => void;
  materialPreset: MaterialPreset;
  setMaterialPreset: (preset: MaterialPreset) => void;
}

const SECTION_NAMES: SectionId[] = [
  'HERO',
  'ETHOS',
  'SYSTEMS',
  'MORPH',
  'BLUEPRINT',
  'GALLERY',
  'TELEMETRY',
  'RECOGNITION',
  'FAQ',
  'CONTACT',
];

export const useStore = create<AppState>((set) => ({
  scrollProgress: 0,
  setScrollProgress: (scrollProgress) => {
    // Automatically derive active section based on 10 progress deciles
    const activeSection = Math.min(9, Math.floor(scrollProgress * 10));
    set({
      scrollProgress,
      activeSection,
      activeSectionName: SECTION_NAMES[activeSection],
    });
  },

  scrollVelocity: 0,
  setScrollVelocity: (scrollVelocity) => set({ scrollVelocity }),

  activeSection: 0,
  activeSectionName: 'HERO',
  setActiveSection: (activeSection) =>
    set({
      activeSection,
      activeSectionName: SECTION_NAMES[activeSection] || 'HERO',
    }),

  pointer: { x: 0, y: 0 },
  setPointer: (pointer) => set({ pointer }),

  isReady: false,
  setIsReady: (isReady) => set({ isReady }),

  loadProgress: 0,
  setLoadProgress: (loadProgress) => set({ loadProgress }),

  wireframeMode: false,
  toggleWireframeMode: () =>
    set((state) => ({ wireframeMode: !state.wireframeMode })),

  audioActive: false,
  toggleAudioActive: () =>
    set((state) => ({ audioActive: !state.audioActive })),

  geometryShape: 'knot',
  setGeometryShape: (geometryShape) => set({ geometryShape }),

  materialPreset: 'glass',
  setMaterialPreset: (materialPreset) => set({ materialPreset }),
}));

