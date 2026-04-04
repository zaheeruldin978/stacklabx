"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import LeadFunnel from "../components/sections/LeadFunnel";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Premium hover tracking for the dynamic glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-cyan-500/30 overflow-x-hidden font-sans relative">
      
      {/* --- 1. AMBIENT ENGINE (Interactive Light) --- */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* FIXED: Upgraded to Spring Physics. Removes the 'ease' error and adds weight. */}
        <motion.div 
          className="absolute w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"
          animate={{ x: mousePosition.x - 300, y: mousePosition.y - 300 }}
          transition={{ type: "spring", stiffness: 40, damping: 30, restDelta: 0.001 }}
        />
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[800px] bg-cyan-900/20 blur-[150px] rounded-[100%]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-screen"></div>
      </div>

      {/* --- 2. HERO ARCHITECTURE (The Command Line) --- */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center z-10 max-w-7xl mx-auto px-6 pt-20">
        
        {/* Background Animated SVG Grid */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none -z-10">
          <svg width="100%" height="100%" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path 
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 4, ease: "easeInOut" as const }}
              d="M100,500 Q300,200 500,500 T900,500" stroke="#00E5FF" strokeWidth="1" strokeDasharray="4 4"
            />
            <motion.path 
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 5, ease: "easeInOut" as const, delay: 0.5 }}
              d="M100,600 Q400,800 600,400 T900,600" stroke="#0066FF" strokeWidth="1" 
            />
            <motion.circle initial={{ scale: 0 }} animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 2 }} cx="500" cy="500" r="4" fill="#00E5FF" />
            <motion.circle initial={{ scale: 0 }} animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 3 }} cx="600" cy="400" r="4" fill="#0066FF" />
          </svg>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-3 px-5 py-2 mb-10 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_0_30px_rgba(0,229,255,0.1)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
          </span>
          <p className="text-[10px] font-mono tracking-[0.25em] text-slate-300 uppercase">
            Global Network: Synchronized
          </p>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, filter: "blur(10px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 1, delay: 0.2 }}
          className="text-6xl md:text-[140px] font-black tracking-[-0.05em] leading-[0.85] mb-8"
        >
          Code the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-blue-500">
            Impossible.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
          className="max-w-2xl text-slate-400 text-lg md:text-2xl font-light leading-relaxed mb-12 tracking-tight"
        >
          We architect <span className="text-white font-medium">military-grade web applications</span> and <span className="text-white font-medium">autonomous AI pipelines</span> for enterprises that refuse to settle.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-col sm:flex-row items-center gap-6">
          <Link href="/services" className="group relative px-10 py-5 bg-white text-black font-black text-[11px] uppercase tracking-[0.2em] rounded overflow-hidden">
            <span className="relative z-10 transition-colors group-hover:text-white">Initialize Systems</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
          </Link>
          <Link href="/blog" className="px-10 py-5 text-white font-bold text-[11px] uppercase tracking-[0.2em] hover:text-cyan-400 transition-colors flex items-center gap-2">
            Read The Docs <span className="font-serif italic text-lg opacity-50">&rarr;</span>
          </Link>
        </motion.div>
      </section>

      {/* --- 3. THE "NO COMPETITOR" BENTO DATA GRID --- */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:auto-rows-[340px]">
          
          <Link href="/services" className="md:col-span-4 group relative p-px rounded-[32px] overflow-hidden bg-gradient-to-b from-white/20 via-white/5 to-transparent hover:from-cyan-500/50 transition-colors duration-700">
            <div className="absolute inset-0 bg-[#030303] rounded-[31px]"></div>
            <div className="relative h-full p-10 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(0,229,255,0.1)_0%,transparent_50%)]"></div>
              
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[60%] h-[150%] opacity-30 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  <motion.path d="M50,200 L150,100 L250,250 L350,150" stroke="url(#cyan-grad)" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2 }} />
                  <motion.path d="M50,200 L150,300 L250,250 L350,350" stroke="url(#blue-grad)" strokeWidth="1" strokeDasharray="4 4" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }} />
                  <defs>
                    <linearGradient id="cyan-grad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#00E5FF" stopOpacity="0"/><stop offset="100%" stopColor="#00E5FF" stopOpacity="1"/></linearGradient>
                    <linearGradient id="blue-grad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#0066FF" stopOpacity="0"/><stop offset="100%" stopColor="#0066FF" stopOpacity="1"/></linearGradient>
                  </defs>
                  <circle cx="150" cy="100" r="4" fill="#00E5FF" className="animate-pulse" />
                  <circle cx="250" cy="250" r="6" fill="#fff" className="animate-pulse" />
                  <circle cx="350" cy="150" r="4" fill="#00E5FF" className="animate-pulse" />
                </svg>
              </div>

              <div className="relative z-10 w-2/3">
                <div className="px-3 py-1 mb-6 rounded text-[9px] font-black uppercase tracking-widest bg-cyan-500/10 text-cyan-400 inline-block border border-cyan-500/20">34 Active Protocols</div>
                <h3 className="text-4xl font-black text-white mb-4 tracking-tighter">Enterprise <br/>Architecture</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">From Headless E-Commerce to Zero-Trust Networks. We build the physical and digital backbone of your organization.</p>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white flex items-center gap-2 group-hover:text-cyan-400 transition-colors">
                  Explore Directory <span className="group-hover:translate-x-2 transition-transform">&rarr;</span>
                </div>
              </div>
            </div>
          </Link>

          <div className="md:col-span-2 relative p-px rounded-[32px] overflow-hidden bg-gradient-to-b from-white/20 via-white/5 to-transparent">
            <div className="absolute inset-0 bg-[#030303] rounded-[31px]"></div>
            <div className="relative h-full p-10 flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-2">Edge Routing Latency</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-6xl font-black tracking-tighter text-white">12</h3>
                  <span className="text-xl font-bold text-slate-600">ms</span>
                </div>
              </div>
              
              <div className="h-24 w-full mt-auto relative">
                 <svg viewBox="0 0 200 100" className="w-full h-full opacity-50">
                    <motion.path 
                      d="M0,50 Q25,20 50,50 T100,50 T150,50 T200,50" 
                      fill="none" stroke="#10B981" strokeWidth="2"
                      animate={{ d: ["M0,50 Q25,20 50,50 T100,50 T150,50 T200,50", "M0,50 Q25,80 50,50 T100,50 T150,50 T200,50"] }}
                      transition={{ repeat: Infinity, duration: 2, repeatType: "reverse", ease: "easeInOut" as const }}
                    />
                 </svg>
                 <div className="absolute bottom-0 left-0 flex items-center gap-2 text-[9px] font-bold text-emerald-500 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Node Optimized
                 </div>
              </div>
            </div>
          </div>

          <Link href="/blog" className="md:col-span-3 group relative p-px rounded-[32px] overflow-hidden bg-gradient-to-b from-white/20 via-white/5 to-transparent hover:from-blue-600/50 transition-colors duration-700">
             <div className="absolute inset-0 bg-[#030303] rounded-[31px]"></div>
             <div className="relative h-full p-10 flex flex-col">
                <div className="flex justify-between items-start mb-auto">
                  <div>
                    <h4 className="text-3xl font-black text-white mb-2 group-hover:text-blue-400 transition-colors">88 Insights</h4>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Technical Documentation</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all text-white">
                    &rarr;
                  </div>
                </div>
                
                <div className="mt-8 bg-[#000000] border border-white/10 rounded-lg p-4 font-mono text-[10px] text-slate-400 leading-relaxed group-hover:border-blue-500/30 transition-colors">
                  <div className="flex gap-1 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                  </div>
                  <span className="text-blue-400">const</span> <span className="text-white">knowledgeBase</span> = await fetch(<span className="text-emerald-400">'/api/insights'</span>);<br/>
                  <span className="text-blue-400">return</span> <span className="text-white">knowledgeBase.filter</span>(post =&gt; post.type === <span className="text-emerald-400">'AI'</span>);
                  <span className="animate-pulse text-white inline-block w-1.5 h-3 bg-white ml-1 align-middle"></span>
                </div>
             </div>
          </Link>

          <Link href="/academy" className="md:col-span-3 group relative p-px rounded-[32px] overflow-hidden bg-gradient-to-b from-white/20 via-white/5 to-transparent hover:from-white/40 transition-colors duration-700">
             <div className="absolute inset-0 bg-[#030303] rounded-[31px]"></div>
             <div className="relative h-full p-10 flex flex-col justify-between">
                <div className="absolute bottom-[-20%] right-[-10%] w-64 h-64 bg-white/5 blur-[50px] rounded-full group-hover:bg-white/10 transition-colors"></div>
                
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">StacklabX Academy</p>
                <h4 className="text-4xl font-black text-white leading-tight mb-8">Engineer the<br/>Next Generation.</h4>
                
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    <div className="w-8 h-8 rounded-full border-2 border-[#030303] bg-blue-500"></div>
                    <div className="w-8 h-8 rounded-full border-2 border-[#030303] bg-cyan-400"></div>
                    <div className="w-8 h-8 rounded-full border-2 border-[#030303] bg-emerald-500"></div>
                  </div>
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Join the Protocol</span>
                </div>
             </div>
          </Link>

        </div>
      </section>

      {/* --- 4. LEAD ACQUISITION (Technical Terminal Style) --- */}
      <section className="relative z-10 pt-20 pb-40">
        <div className="max-w-4xl mx-auto px-6">
          <div className="border-t border-white/5 pt-32 flex flex-col items-center">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 text-center">Initiate Handshake.</h2>
            <p className="text-slate-400 text-lg md:text-xl font-light mb-16 text-center max-w-xl">Establish a secure, encrypted channel with our core architectural team to scope your infrastructure.</p>
            <div className="w-full">
              <LeadFunnel />
            </div>
          </div>
        </div>
      </section>
      
    </main>
  );
}