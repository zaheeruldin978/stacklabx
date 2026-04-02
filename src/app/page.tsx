"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

// Retaining your 3D engineering with strict relative path
const Scene = dynamic(() => import("../components/canvas/Scene"), { ssr: false });

export default function Home() {
  return (
    <main className="relative flex flex-col items-center overflow-hidden">
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-20 px-6">
        <div className="absolute inset-0 w-full h-full bg-grid -z-20"></div>
        <div className="absolute inset-0 opacity-40 -z-10 mix-blend-screen pointer-events-none">
          <Scene />
        </div>

        <div className="z-10 flex flex-col items-center text-center max-w-4xl">
          <div className="px-3 py-1 mb-6 border border-white/10 rounded-full bg-white/5 backdrop-blur-md">
            <p className="text-[11px] font-medium tracking-widest text-slate-300 uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Accepting Enterprise Clients
            </p>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] mb-8">
            Build the <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">Impossible.</span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-slate-400 font-light mb-10">
            StacklabX engineers high-performance web applications, seamless AI automations, and futuristic digital experiences for companies that refuse to settle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/services" className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:scale-105 transition-transform flex items-center justify-center">
              Start a Project
            </Link>
            <Link href="/tutorials" className="px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-colors flex items-center justify-center">
              View Architecture
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full max-w-7xl px-6 py-24 z-10">
        <div className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Engineered for Scale.</h2>
          <p className="text-slate-400">Our core competencies span the entire modern stack.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bento-card p-8 md:col-span-2 flex flex-col justify-end min-h-[300px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
            <h3 className="text-2xl font-bold text-white mb-2">Full-Stack Web Development</h3>
            <p className="text-slate-400 max-w-md">Next.js, React, and Node architectures deployed globally on Vercel with absolute minimal latency.</p>
          </div>
          <div className="bento-card p-8 flex flex-col justify-end min-h-[300px]">
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-6 border border-white/10">
              <span className="text-white font-black tracking-tighter">AI</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Workflow Automation</h3>
            <p className="text-slate-400 text-sm">Custom LLM pipelines and automated agents replacing manual bottlenecks.</p>
          </div>
        </div>
      </section>
    </main>
  );
}