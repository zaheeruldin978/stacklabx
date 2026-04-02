"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

// Using a direct relative path (../) to bypass the broken @/ alias
const Scene = dynamic(() => import("../components/canvas/Scene"), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#020617] -z-10" /> 
});

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <Scene />
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-5xl">
        <div className="glass-panel px-6 py-2 rounded-full text-xs md:text-sm mb-8 uppercase tracking-[0.3em] text-blue-400 border border-blue-500/30">
          StacklabX Limited UK
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-white">
          Engineering the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400">
            Digital Future
          </span>
        </h1>
        <p className="max-w-2xl text-slate-300 text-lg md:text-xl mb-12 font-light">
          We architect high-performance web applications, seamless AI automations, and futuristic digital experiences.
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <Link href="/services" className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all">
            Explore Services
          </Link>
          <Link href="/tutorials" className="px-8 py-4 glass-panel text-white font-semibold rounded-lg hover:bg-white/10 transition-all border border-white/20">
            Access Academy
          </Link>
        </div>
      </div>
    </main>
  );
}