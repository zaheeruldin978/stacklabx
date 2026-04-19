"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import LeadFunnel from "../components/sections/LeadFunnel";
import { useEffect, useState, useRef, ReactNode } from "react";

// --- 1. MAGNETIC PHYSICS COMPONENT ---
function Magnetic({ children, strength = 0.15 }: { children: ReactNode, strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={reset} style={{ x: springX, y: springY }}>
      {children}
    </motion.div>
  );
}

// --- 2. SMOOTH TEXT REVEAL ---
const AnimatedText = ({ text, className = "" }: { text: string, className?: string }) => {
  const words = text.split(" ");
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className={`flex flex-wrap justify-center ${className}`}>
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden pb-2 mr-[0.25em]">
          <motion.div
            variants={{
              hidden: { y: "100%", opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.03 } }
            }}
            className="inline-block"
          >
            {word}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
};

// --- 3. VIBRANT INTERACTIVE BENTO CARD ---
function VibrantCard({ title, desc, icon, colorGradient, borderHover }: { title: string, desc: string, icon: ReactNode, colorGradient: string, borderHover: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group rounded-[32px] p-[2px] w-full h-full perspective-1000"
    >
      <div className={`absolute inset-0 rounded-[32px] opacity-10 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${borderHover}`}></div>
      
      <div className="relative h-full w-full bg-[#05070E] rounded-[30px] p-8 md:p-10 flex flex-col shadow-2xl overflow-hidden">
        <div className="relative z-10 flex flex-col h-full transform-gpu group-hover:translate-z-[20px] transition-transform duration-500">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorGradient} flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-500 text-white p-[1px]`}>
            <div className="w-full h-full bg-[#05070E]/20 backdrop-blur-md rounded-[15px] flex items-center justify-center shadow-inner">
              {icon}
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-4 tracking-tight drop-shadow-md">{title}</h3>
          <p className="text-slate-400 text-lg leading-relaxed font-light mb-8 flex-grow">{desc}</p>
          
          <div className="mt-auto flex items-center text-sm font-bold text-white uppercase tracking-widest gap-2 group-hover:gap-4 transition-all opacity-50 group-hover:opacity-100">
            Initialize <span className="text-xl leading-none">&rarr;</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- MAIN PAGE LAYOUT ---
export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -80]);
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="relative overflow-hidden selection:bg-cyan-500/30 bg-[#020308]">
      
      {/* --- 1. CLEAN, PREMIUM DARK BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#020308]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      {/* --- 2. THE HERO: EXACT PDF WORDING --- */}
      <section className="relative pt-[20vh] pb-24 z-10 max-w-7xl mx-auto px-6 min-h-[85vh] flex flex-col justify-center items-center text-center">
        
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="mb-8">
          <div className="group relative inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.15)] cursor-default hover:bg-cyan-500/20 transition-colors">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span>
            </span>
            <span className="text-sm font-bold text-cyan-300 tracking-wide uppercase">ENGINEERING THE IMPOSSIBLE</span>
          </div>
        </motion.div>
        
        <div className="max-w-4xl mx-auto mb-8">
          <AnimatedText 
            text="We engineer unfair" 
            className="text-5xl sm:text-6xl md:text-[5.5rem] font-bold tracking-tighter text-white leading-[1.05]" 
          />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
             <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-bold tracking-tighter leading-[1.05] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 pb-2 drop-shadow-lg">
               digital advantages.
             </h1>
          </motion.div>
        </div>
        
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="text-lg md:text-xl text-slate-400 mb-12 leading-relaxed max-w-3xl font-light">
          Architecting military-grade web applications, custom software ecosystems, and intelligent AI automation for enterprises that refuse to settle.
        </motion.p>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }} className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto items-center">
          <Magnetic strength={0.2}>
            <Link href="/contact" className="relative group px-10 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base hover:scale-105 transition-all duration-500 shadow-[0_10px_40px_rgba(6,182,212,0.3)] flex items-center justify-center gap-3">
              Deploy Your Vision
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
            </Link>
          </Magnetic>
          <Magnetic strength={0.1}>
            <Link href="#capabilities" className="px-10 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl text-white font-semibold text-base hover:bg-white/10 transition-colors duration-500 text-center">
              View Capabilities
            </Link>
          </Magnetic>
        </motion.div>
      </section>

      {/* --- 3. EXACT METRICS --- */}
      <section className="py-16 relative z-10 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center md:justify-around items-center gap-12 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="group cursor-default">
              <motion.div variants={fadeUp} className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-500 mb-2 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">200+</motion.div>
              <motion.div variants={fadeUp} className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">GLOBAL PROJECTS</motion.div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="group cursor-default">
              <motion.div variants={fadeUp} className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-indigo-500 mb-2 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]">100%</motion.div>
              <motion.div variants={fadeUp} className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">SECURE ARCHITECTURE</motion.div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="group cursor-default">
              <motion.div variants={fadeUp} className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-purple-500 mb-2 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(99,102,241,0.4)]">15+</motion.div>
              <motion.div variants={fadeUp} className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">ELITE ENGINEERS</motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- NEW ADDITION: ENTERPRISE TECH STACK MARQUEE --- */}
      <section className="py-12 overflow-hidden border-b border-white/5 bg-[#020308] relative z-10">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#020308] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#020308] to-transparent z-20 pointer-events-none"></div>
        
        <div className="flex w-max">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }} 
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            className="flex gap-16 md:gap-32 items-center px-8 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
          >
            {/* Duplicated list for seamless looping */}
            {[1, 2].map((set) => (
              <div key={set} className="flex gap-16 md:gap-32 items-center">
                <span className="text-2xl font-bold tracking-tight text-white flex items-center gap-2"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2z"/></svg> NEXT.JS</span>
                <span className="text-2xl font-bold tracking-tighter text-white">TypeScript</span>
                <span className="text-2xl font-black italic text-white">AWS Cloud</span>
                <span className="text-2xl font-bold tracking-widest text-white">PostgreSQL</span>
                <span className="text-2xl font-black text-white flex items-center gap-2">STRIPE <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg></span>
                <span className="text-2xl font-serif text-white">OpenAI</span>
                <span className="text-2xl font-bold tracking-tight text-white">VERCEL ▲</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- 4. SERVICE MATRIX (EXACT PDF TEXT) --- */}
      <section className="py-32 relative z-10" id="capabilities">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <AnimatedText text="Elite Capabilities." className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6" />
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-slate-400 text-xl font-light">We solve complex business bottlenecks with brilliant engineering.</motion.p>
          </div>

          <motion.div style={{ y: yParallax }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <VibrantCard 
              title="Web Ecosystems"
              desc="We architect beautifully fluid, high-performance web applications. Engineered on Next.js to deliver uncompromised speed, security, and global SEO dominance."
              colorGradient="from-cyan-400 to-blue-600"
              borderHover="from-cyan-500 via-blue-500 to-indigo-500"
              icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>}
            />
            <VibrantCard 
              title="Custom Software & AI"
              desc="Eradicate manual workflows. We develop proprietary software and integrate advanced AI models that automate operations and drastically reduce your corporate overhead."
              colorGradient="from-fuchsia-400 to-purple-600"
              borderHover="from-fuchsia-500 via-purple-500 to-pink-500"
              icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>}
            />
            <VibrantCard 
              title="Headless Commerce"
              desc="Transform how you sell. We architect decoupled, lightning-fast e-commerce storefronts that eliminate cart abandonment and maximize your conversion rates globally."
              colorGradient="from-emerald-400 to-teal-500"
              borderHover="from-emerald-400 via-teal-500 to-cyan-500"
              icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>}
            />
            <VibrantCard 
              title="Enterprise Cloud"
              desc="Absolute data sovereignty. We deploy applications on military-grade cloud architecture, ensuring zero downtime and impenetrable security against cyber threats."
              colorGradient="from-orange-400 to-rose-500"
              borderHover="from-orange-400 via-rose-500 to-pink-500"
              icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>}
            />
          </motion.div>
        </div>
      </section>

      {/* --- NEW ADDITION: THE STACKLABX PROTOCOL (Process Section) --- */}
      <section className="py-24 relative z-10 border-y border-white/5 bg-[#03050C]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="mb-20 text-center">
            <motion.h2 variants={fadeUp} className="text-xs font-bold text-indigo-400 uppercase tracking-[0.2em] mb-4">THE STACKLABX PROTOCOL</motion.h2>
            <motion.h3 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white tracking-tight">How we deploy digital empires.</motion.h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative p-8 rounded-3xl border border-white/10 bg-[#05070E] shadow-2xl">
              <div className="text-6xl font-black text-white/5 absolute top-6 right-8">01</div>
              <h4 className="text-xl font-bold text-white mb-4 relative z-10">Architectural Audit</h4>
              <p className="text-slate-400 text-base font-light leading-relaxed">We analyze your current bottlenecks, map your infrastructure requirements, and blueprint a high-performance system designed specifically for scale.</p>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative p-8 rounded-3xl border border-white/10 bg-[#05070E] shadow-2xl">
              <div className="text-6xl font-black text-white/5 absolute top-6 right-8">02</div>
              <h4 className="text-xl font-bold text-cyan-400 mb-4 relative z-10">Core Engineering</h4>
              <p className="text-slate-400 text-base font-light leading-relaxed">Our elite engineering team builds your custom platform using modern frameworks, ensuring zero technical debt and uncompromised security.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative p-8 rounded-3xl border border-white/10 bg-[#05070E] shadow-2xl">
              <div className="text-6xl font-black text-white/5 absolute top-6 right-8">03</div>
              <h4 className="text-xl font-bold text-white mb-4 relative z-10">Global Deployment</h4>
              <p className="text-slate-400 text-base font-light leading-relaxed">We launch your architecture across distributed cloud edge networks, establishing zero downtime, ultra-low latency, and continuous monitoring.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 5. TESTIMONIALS (EXACT PDF TEXT) --- */}
      <section className="py-32 relative z-10 bg-[#020308]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="text-center mb-20 max-w-2xl mx-auto">
            <motion.h2 variants={fadeUp} className="text-xs font-bold text-cyan-400 uppercase tracking-[0.2em] mb-4">VERIFIED IMPACT</motion.h2>
            <motion.h3 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white tracking-tight">Trusted by industry leaders.</motion.h3>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeUp} className="p-10 md:p-14 rounded-[32px] bg-[#05070E] border border-white/5 shadow-2xl flex flex-col h-full relative overflow-hidden group hover:border-cyan-500/30 transition-colors duration-500">
              <div className="absolute -top-6 -right-6 text-[150px] font-serif text-white/[0.02] leading-none group-hover:text-cyan-500/10 transition-colors duration-500">&quot;</div>
              <div className="flex text-yellow-400 mb-8 gap-1">
                {[...Array(5)].map((_, i) => <svg key={i} className="w-6 h-6 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>)}
              </div>
              <p className="text-slate-300 text-xl leading-relaxed font-light mb-12 flex-grow relative z-10">&quot;We required a complete architectural overhaul of our commerce platform. StacklabX delivered a flawless, lightning-fast system ahead of schedule. Our global sales metrics improved immediately.&quot;</p>
              <div className="flex items-center gap-5 border-t border-white/10 pt-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-white text-xl shadow-[0_0_15px_rgba(6,182,212,0.4)]">SJ</div>
                <div>
                  <div className="font-bold text-white text-xl tracking-tight">Sarah Jenkins</div>
                  <div className="text-sm text-cyan-400 font-medium">Director of Engineering, RetailTech</div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="p-10 md:p-14 rounded-[32px] bg-[#05070E] border border-white/5 shadow-2xl flex flex-col h-full relative overflow-hidden group hover:border-indigo-500/30 transition-colors duration-500">
              <div className="absolute -top-6 -right-6 text-[150px] font-serif text-white/[0.02] leading-none group-hover:text-indigo-500/10 transition-colors duration-500">&quot;</div>
              <div className="flex text-yellow-400 mb-8 gap-1">
                {[...Array(5)].map((_, i) => <svg key={i} className="w-6 h-6 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>)}
              </div>
              <p className="text-slate-300 text-xl leading-relaxed font-light mb-12 flex-grow relative z-10">&quot;We commissioned a custom operational dashboard and backend infrastructure. The execution was pristine. StacklabX is now our exclusive partner for all digital infrastructure scaling.&quot;</p>
              <div className="flex items-center gap-5 border-t border-white/10 pt-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center font-bold text-white text-xl shadow-[0_0_15px_rgba(99,102,241,0.4)]">MA</div>
                <div>
                  <div className="font-bold text-white text-xl tracking-tight">Marcus Alvarez</div>
                  <div className="text-sm text-indigo-400 font-medium">CEO, Nexus Logistics Global</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- 6. COLORFUL BLOG FEED (EXACT PDF TEXT) --- */}
      <section className="py-32 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6">
            <div>
              <motion.h2 variants={fadeUp} className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3">KNOWLEDGE BASE</motion.h2>
              <motion.h3 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white tracking-tight">Industry Insights</motion.h3>
            </div>
            <motion.div variants={fadeUp}>
              <Link href="/blog" className="px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold transition-colors duration-500 w-max">
                View All Publications
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
            {[
              { tag: "STRATEGY", color: "from-cyan-400 to-blue-600", title: "Why Performance Architecture Drives Revenue", desc: "Discover how fractional delays in load times directly sabotage your customer acquisition metrics." },
              { tag: "AUTOMATION", color: "from-fuchsia-400 to-purple-600", title: "Deploying AI to Eradicate Manual Overhead", desc: "A strategic guide to replacing outdated spreadsheet workflows with intelligent, self-sustaining software" },
              { tag: "INFRASTRUCTURE", color: "from-emerald-400 to-teal-500", title: "The Zero-Trust Security Imperative", desc: "How modern enterprises are hardening their digital borders against increasingly complex cyber threats." }
            ].map((article, i) => (
              <motion.div variants={fadeUp} key={i} className="h-full">
                <Link href="/blog" className="group block rounded-[32px] p-6 border border-white/5 bg-[#05070E] hover:border-white/20 transition-all duration-500 hover:-translate-y-2 shadow-xl h-full flex flex-col">
                  <div className={`h-56 rounded-[24px] bg-gradient-to-br ${article.color} mb-6 overflow-hidden relative opacity-90 group-hover:opacity-100 transition-opacity shadow-lg`}>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">{article.tag}</div>
                  <h4 className="text-2xl font-bold text-white mb-4 tracking-tight leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">{article.title}</h4>
                  <p className="text-slate-400 text-base font-light leading-relaxed flex-grow">{article.desc}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- 7. THE COLORFUL MEGA FUNNEL (EXACT PDF TEXT) --- */}
      <section className="relative z-10 py-32 lg:py-48">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-5xl mx-auto px-6">
          <div className="rounded-[48px] p-[2px] bg-gradient-to-b from-blue-500/50 to-transparent shadow-[0_0_100px_rgba(59,130,246,0.15)] relative overflow-hidden group hover:shadow-[0_0_150px_rgba(6,182,212,0.2)] transition-shadow duration-700">
            <div className="rounded-[46px] p-10 md:p-24 text-center relative overflow-hidden bg-[#020308]">
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] max-h-[800px] bg-gradient-to-r from-blue-600/30 to-cyan-600/30 blur-[120px] rounded-full pointer-events-none group-hover:opacity-100 opacity-60 transition-opacity duration-700"></div>
              
              <div className="relative z-10">
                <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 drop-shadow-2xl">Ready to Scale?</h2>
                <p className="text-slate-300 text-xl mb-14 max-w-2xl mx-auto font-light leading-relaxed">Input your corporate email below. Our elite architectural team will review your objectives and provide a clear, technical roadmap for dominance.</p>
                
                <Magnetic strength={0.05}>
                  <div className="max-w-lg mx-auto bg-[#05070E]/80 backdrop-blur-3xl p-8 rounded-[32px] border border-white/10 shadow-2xl relative transform-gpu hover:scale-[1.02] transition-transform duration-500">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                    <LeadFunnel />
                  </div>
                </Magnetic>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}