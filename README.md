# IGLOO // 3D Creative Engineering & Architecture

An Awwwards-caliber WebGL 3D interactive web application built with **Next.js 14 (App Router)**, **TypeScript**, **pnpm**, **Three.js**, **React Three Fiber**, **Drei**, **Lenis**, **GSAP**, and **Tailwind CSS**.

---

## ⚡ Tech Stack & Architecture

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Package Manager**: pnpm (`11.10.0`)
- **3D Engine**: Three.js via `@react-three/fiber` & `@react-three/drei`
- **Post-Processing**: `@react-three/postprocessing` (Bloom, Vignette, Chromatic Aberration)
- **Smooth Scrolling**: Lenis (`lenis`) synchronized with GSAP ScrollTrigger
- **Animations**: GSAP & Framer Motion
- **State Management**: Zustand
- **Styling**: Tailwind CSS with dark obsidian aesthetic and analog SVG film grain overlay

---

## 🚀 Key Features

- **10 Deep-Scrolling Sections**: From the kinetic typography hero to interactive 3D laboratory, blueprint methodology, case study gallery, hardware telemetry dashboard, and contact dispatch terminal.
- **Interactive 3D Geometry & Material Morphing**: Morph the central 3D sculpture in real time across 4 topologies (*Torus Knot*, *Cyber Torus*, *Dodecahedron*, *Orb*) and 4 PBR materials (*Physical Glass*, *Liquid Chrome*, *Iridescent*, *Gold*).
- **280-Particle Cyber Spiral Tunnel**: Deep-scroll procedural helix particle tunnel flowing past the camera.
- **20 Radial Exploding Satellite Shards**: Orbiting octahedrons with radial explosion choreographies.
- **Tri-Ring Gyroscopic Halo Array**: Concentric rings spinning along independent gimbal axes.
- **Dynamic Mobile FOV**: Auto-adapts camera field-of-view from 45° to 64° on mobile portrait screens.
- **Desktop Cursor Parallax**: Smooth lerped pointer offset tilting the camera and geometry.
- **Custom Drei Preloader**: Elegant numeric counter (`00%` -> `100%`) with smooth curtain reveal.
- **Live Wireframe / PBR Switcher**: Real-time holographic mesh toggle.

---

## 🛠️ Local Development

Clone the repository and install dependencies using `pnpm`:

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build

```bash
# Run typecheck and linter
pnpm exec tsc --noEmit
pnpm exec next lint

# Build optimized production bundle
pnpm run build

# Start production server
pnpm run start
```

---

## 🌐 Deploy to Vercel

This repository is pre-configured with `vercel.json`, `.vercelignore`, and `packageManager` specification for 1-click Vercel deployments.

### Option 1: Vercel Dashboard (Recommended)
1. Go to [vercel.com/new](https://vercel.com/new).
2. Import this GitHub repository: `https://github.com/PrateekSingh2/workshop-activity-1`.
3. Vercel will automatically detect **Next.js** and **pnpm**.
4. Click **Deploy**.

### Option 2: Vercel CLI
```bash
pnpm dlx vercel
```
