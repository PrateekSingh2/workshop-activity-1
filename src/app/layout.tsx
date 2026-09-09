import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import DomShell from "@/components/dom/DomShell";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "IGLOO // 3D Creative Engineering & Architecture",
  description:
    "An immersive Awwwards-caliber WebGL 3D digital experience powered by Next.js, Three.js, GSAP, and Lenis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-[#070709]">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[#070709] text-white selection:bg-white selection:text-black`}
      >
        <DomShell>{children}</DomShell>
      </body>
    </html>
  );
}
