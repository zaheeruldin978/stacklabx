"use client";

import Link from "next/link";
import { motion, useSpring, useMotionValue } from "framer-motion";
import LeadFunnel from "../../../components/sections/LeadFunnel";
import { useRef, ReactNode, useEffect, useState } from "react";
import { servicesConfig, ServiceData } from "@/lib/servicesData";

function Magnetic({ children, strength = 0.15 }: { children: ReactNode, strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((e.clientX - (left + width / 2)) * strength);
    y.set((e.clientY - (top + height / 2)) * strength);
  };

  return (
    <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ x: springX, y: springY }} className="will-change-transform z-20 relative">
      {children}
    </motion.div>
  );
}

// --- DYNAMIC THEME ENGINE ---
const themeMap: Record<string, any> = {
  cyan: {
    badgeBorder: 'border-cyan-500/20', badgeBg: 'bg-cyan-950/30', badgeText: 'text-cyan-300', badgeDot: 'bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]',
    hoverBorder: 'hover:border-cyan-500/30', hoverShadow: 'hover:shadow-[0_10px_30px_rgba(6,182,212,0.2)]', hoverBoxShadow: 'hover:shadow-cyan-500/20',
    pricingGlow: 'shadow-[0_0_50px_rgba(6,182,212,0.15)]', pricingBadge: 'shadow-[0_0_20px_rgba(6,182,212,0.5)]',
    textColor: 'text-cyan-400', textHover: 'group-hover:text-cyan-100', funnelLine: 'via-cyan-400',
    bgOrb1: 'from-cyan-500/30 via-blue-600/20 to-indigo-600/20', bgOrb2: 'from-cyan-600/20 via-indigo-600/10 to-teal-500/10',
  },
  emerald: {
    badgeBorder: 'border-emerald-500/20', badgeBg: 'bg-emerald-950/30', badgeText: 'text-emerald-300', badgeDot: 'bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]',
    hoverBorder: 'hover:border-emerald-500/30', hoverShadow: 'hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)]', hoverBoxShadow: 'hover:shadow-emerald-500/20',
    pricingGlow: 'shadow-[0_0_50px_rgba(16,185,129,0.15)]', pricingBadge: 'shadow-[0_0_20px_rgba(16,185,129,0.5)]',
    textColor: 'text-emerald-400', textHover: 'group-hover:text-emerald-100', funnelLine: 'via-emerald-400',
    bgOrb1: 'from-emerald-500/30 via-teal-600/20 to-cyan-600/20', bgOrb2: 'from-emerald-600/20 via-cyan-600/10 to-teal-500/10',
  },
  fuchsia: {
    badgeBorder: 'border-fuchsia-500/20', badgeBg: 'bg-fuchsia-950/30', badgeText: 'text-fuchsia-300', badgeDot: 'bg-fuchsia-400 shadow-[0_0_10px_rgba(217,70,239,0.8)]',
    hoverBorder: 'hover:border-fuchsia-500/30', hoverShadow: 'hover:shadow-[0_10px_30px_rgba(217,70,239,0.2)]', hoverBoxShadow: 'hover:shadow-fuchsia-500/20',
    pricingGlow: 'shadow-[0_0_50px_rgba(217,70,239,0.15)]', pricingBadge: 'shadow-[0_0_20px_rgba(217,70,239,0.5)]',
    textColor: 'text-fuchsia-400', textHover: 'group-hover:text-fuchsia-100', funnelLine: 'via-fuchsia-400',
    bgOrb1: 'from-fuchsia-500/30 via-purple-600/20 to-pink-600/20', bgOrb2: 'from-fuchsia-600/20 via-pink-600/10 to-purple-500/10',
  },
  indigo: {
    badgeBorder: 'border-indigo-500/20', badgeBg: 'bg-indigo-950/30', badgeText: 'text-indigo-300', badgeDot: 'bg-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.8)]',
    hoverBorder: 'hover:border-indigo-500/30', hoverShadow: 'hover:shadow-[0_10px_30px_rgba(99,102,241,0.2)]', hoverBoxShadow: 'hover:shadow-indigo-500/20',
    pricingGlow: 'shadow-[0_0_50px_rgba(99,102,241,0.15)]', pricingBadge: 'shadow-[0_0_20px_rgba(99,102,241,0.5)]',
    textColor: 'text-indigo-400', textHover: 'group-hover:text-indigo-100', funnelLine: 'via-indigo-400',
    bgOrb1: 'from-indigo-500/30 via-violet-600/20 to-purple-600/20', bgOrb2: 'from-indigo-600/20 via-purple-600/10 to-violet-500/10',
  },
  amber: {
    badgeBorder: 'border-amber-500/20', badgeBg: 'bg-amber-950/30', badgeText: 'text-amber-300', badgeDot: 'bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.8)]',
    hoverBorder: 'hover:border-amber-500/30', hoverShadow: 'hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)]', hoverBoxShadow: 'hover:shadow-amber-500/20',
    pricingGlow: 'shadow-[0_0_50px_rgba(245,158,11,0.15)]', pricingBadge: 'shadow-[0_0_20px_rgba(245,158,11,0.5)]',
    textColor: 'text-amber-400', textHover: 'group-hover:text-amber-100', funnelLine: 'via-amber-400',
    bgOrb1: 'from-amber-500/30 via-orange-600/20 to-red-600/20', bgOrb2: 'from-amber-600/20 via-red-600/10 to-orange-500/10',
  },
  rose: {
    badgeBorder: 'border-rose-500/20', badgeBg: 'bg-rose-950/30', badgeText: 'text-rose-300', badgeDot: 'bg-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.8)]',
    hoverBorder: 'hover:border-rose-500/30', hoverShadow: 'hover:shadow-[0_10px_30px_rgba(244,63,94,0.2)]', hoverBoxShadow: 'hover:shadow-rose-500/20',
    pricingGlow: 'shadow-[0_0_50px_rgba(244,63,94,0.15)]', pricingBadge: 'shadow-[0_0_20px_rgba(244,63,94,0.5)]',
    textColor: 'text-rose-400', textHover: 'group-hover:text-rose-100', funnelLine: 'via-rose-400',
    bgOrb1: 'from-rose-500/30 via-red-600/20 to-pink-600/20', bgOrb2: 'from-rose-600/20 via-pink-600/10 to-red-500/10',
  }
};

const InnerPageBackground = ({ theme }: { theme: any }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.15, 1], x: [0, 40, 0], y: [0, -40, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className={`absolute top-[-10%] right-[-5%] w-[65vw] h-[65vh] max-w-[800px] bg-gradient-to-br ${theme.bgOrb1} blur-[140px] rounded-full mix-blend-screen transform-gpu`} />
    <motion.div animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1], x: [0, -50, 0], y: [0, 60, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 1 }} className={`absolute top-[25%] left-[-15%] w-[55vw] h-[55vh] max-w-[700px] bg-gradient-to-tr ${theme.bgOrb2} blur-[130px] rounded-full mix-blend-screen transform-gpu`} />
    <div className="absolute inset-0 opacity-[0.04] z-10" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '48px 48px' }}></div>
    <div className="absolute inset-0 bg-gradient-to-b from-[#020308]/40 via-[#020308]/80 to-[#020308] z-20"></div>
  </div>
);

// --- PREMIUM DUOTONE ICONS ---
// These use a solid primary stroke and a 40% opacity secondary fill/stroke to create a beautiful 3D glass effect.
const getIcon = (key: string) => {
  const icons = {
    web: <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" className="opacity-40" d="M8.25 12h.008v.008H8.25V12zm3.75 0h.008v.008H12V12zm3.75 0h.008v.008h-.008V12z" /></svg>,
    ai: <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" className="opacity-40" d="M12 5.25v13.5" /></svg>,
    cart: <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" className="opacity-40" d="M9.75 8.25h4.5m-4.5 3h4.5" /></svg>,
    mobile: <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /><path fill="currentColor" className="opacity-40" d="M6 6h12v12H6z" /></svg>,
    design: <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" className="opacity-40" d="M15 9l2-2m-2 2l-2-2" /></svg>,
    cloud: <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" className="opacity-40" d="M8.25 12h7.5m-7.5 3h7.5" /></svg>,
    search: <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" className="opacity-40" d="M10.5 7.5v6m3-3h-6" /></svg>,
    shield: <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" className="opacity-40" d="M12 4.5v15M4.5 12h15" /></svg>,
    chat: <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.84 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" className="opacity-40" d="M8.25 10.5h3m-3 3h7.5" /></svg>,
    data: <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" className="opacity-40" d="M12 10.5v8" /></svg>
  };
  return icons[key as keyof typeof icons] || icons.web;
};

export default function ServiceClient({ slug }: { slug: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const service = servicesConfig.find(s => s.slug === slug) as ServiceData;

  if (!service) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#020308] text-white">
        <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
        <Link href="/services" className="text-cyan-400 hover:underline">&larr; Return to Capabilities</Link>
      </main>
    );
  }
  
  const theme = themeMap[service.themeColor] || themeMap.cyan;
  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };
  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen overflow-hidden selection:bg-white/30 bg-[#020308] font-sans text-slate-300">
      <InnerPageBackground theme={theme} />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-[22vh] pb-28 z-10 max-w-7xl mx-auto px-6 flex flex-col items-start text-left border-b border-white/5">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-10">
          <Link href="/services" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-slate-400 hover:text-white font-medium text-xs tracking-wide transition-all backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
            <span>&larr;</span> Explore All Capabilities
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-8 flex flex-wrap gap-4">
          <div className={`px-5 py-2 rounded-full border ${theme.badgeBorder} ${theme.badgeBg} backdrop-blur-md text-[10px] uppercase tracking-widest font-bold ${theme.badgeText} flex items-center gap-3 shadow-xl`}>
            <span className={`w-2.5 h-2.5 rounded-full ${theme.badgeDot} animate-pulse`}></span>
            Enterprise Grade Infrastructure
          </div>
          <div className="px-5 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md text-[10px] uppercase tracking-widest font-medium text-slate-400 flex items-center gap-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
            Backed by Custom SLAs
          </div>
        </motion.div>
        
        <div className="max-w-6xl mb-8 flex flex-col lg:flex-row items-start lg:items-center gap-8">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative group shrink-0 perspective-1000">
            <div className={`absolute inset-0 bg-gradient-to-br ${service.colorGradient} blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-700 rounded-full`}></div>
            <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br ${service.colorGradient} flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.1)] text-white p-[1px] transform-gpu transition-transform duration-500 group-hover:rotate-y-12 group-hover:rotate-x-12`}>
              <div className="w-full h-full bg-[#05070E]/40 backdrop-blur-md rounded-[22px] flex items-center justify-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
                <div className="text-white drop-shadow-lg opacity-95 group-hover:scale-110 transition-transform duration-500">
                  {getIcon(service.iconKey)}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-5xl sm:text-7xl md:text-[5.5rem] lg:text-[6rem] font-semibold tracking-tight leading-[1.05] text-white drop-shadow-2xl">
             {service.title}
          </motion.h1>
        </div>
        
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className={`text-xl md:text-3xl font-medium tracking-tight mb-8 leading-relaxed max-w-4xl text-transparent bg-clip-text bg-gradient-to-r ${service.colorGradient}`}>
          {service.tagline}
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="text-base md:text-xl text-slate-400 mb-12 leading-relaxed max-w-3xl font-light">
          {service.description}
        </motion.p>
      </section>

      {/* --- BENTO GRID: DELIVERABLES & STACK --- */}
      <section className="py-32 relative z-10 border-y border-white/5 bg-[#020308]/50 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          <div className="lg:col-span-5 flex flex-col">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-tight">Scope of Work</h2>
            <p className="text-slate-400 mb-10 text-base font-light">The enterprise-grade assets and systems included in this deployment.</p>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="flex flex-col gap-4 flex-grow">
              {service.deliverables.map((item, i) => (
                <motion.div key={i} variants={fadeUp} className={`group bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex items-center gap-5 hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] ${theme.hoverBoxShadow} hover:-translate-y-1 cursor-default`}>
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${service.colorGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.colorGradient} p-[1px] shrink-0 shadow-lg`}>
                    <div className="w-full h-full bg-[#05070E]/40 backdrop-blur-md rounded-[11px] flex items-center justify-center text-lg shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]">✨</div>
                  </div>
                  <h3 className={`text-white font-medium text-lg tracking-tight ${theme.textHover} transition-colors`}>{item}</h3>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="lg:col-span-7 flex flex-col">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-tight">Core Technologies</h2>
            <p className="text-slate-400 mb-10 text-base font-light">The modern, scalable infrastructure we utilize for this specific architecture.</p>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 gap-4 flex-grow">
              {service.techStack.map((tech, i) => (
                <motion.div key={i} variants={fadeUp} className={`bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-5 transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.04] ${theme.hoverBorder} ${theme.hoverShadow} shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] group relative overflow-hidden cursor-default`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.colorGradient} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`}></div>
                  <span className="text-5xl filter drop-shadow-md group-hover:scale-110 transition-transform duration-500 relative z-10">{tech.icon}</span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-300 relative z-10 text-center group-hover:text-white transition-colors">{tech.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section className="py-32 relative z-10 bg-[#020308]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-5 tracking-tight">Investment Tiers</h2>
            <p className="text-slate-400 text-lg font-light max-w-2xl mx-auto">Transparent, competitive pricing designed to deliver maximum ROI.</p>
          </div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="grid lg:grid-cols-3 gap-8 items-center">
            {service.pricingPlans.map((plan, i) => (
              <motion.div key={i} variants={fadeUp} className={`relative p-8 md:p-10 rounded-[32px] flex flex-col transition-all duration-700 backdrop-blur-xl
                ${plan.popular 
                  ? 'bg-[#05070E] lg:scale-105 z-10 py-12 shadow-[0_0_50px_rgba(6,182,212,0.15)] border-transparent' 
                  : 'border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:-translate-y-2 z-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]'}
              `}>
                
                {plan.popular && <div className={`absolute -inset-[1.5px] rounded-[33.5px] bg-gradient-to-br ${service.colorGradient} opacity-70 pointer-events-none`}></div>}
                {plan.popular && <div className={`absolute inset-0 rounded-[32px] bg-[#05070E] pointer-events-none shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]`}></div>}
                
                {plan.popular && (
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r ${service.colorGradient} px-6 py-2 rounded-full text-[10px] font-black text-white uppercase tracking-widest ${theme.pricingBadge} whitespace-nowrap animate-pulse z-20`}>
                    Industry Standard
                  </div>
                )}
                
                <div className="relative z-10 flex flex-col h-full">
                  <h3 className={`text-2xl font-semibold mb-3 tracking-tight ${plan.popular ? 'text-white' : 'text-slate-200'}`}>{plan.name}</h3>
                  <p className={`text-sm mb-8 leading-relaxed font-light min-h-[60px] ${plan.popular ? 'text-white/80' : 'text-slate-400'}`}>{plan.desc}</p>
                  
                  <div className="mb-8 pb-8 border-b border-white/10 flex flex-col sm:flex-row sm:items-baseline gap-2">
                    <span className={`text-5xl font-semibold tracking-tighter ${plan.popular ? 'text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70' : 'text-white'}`}>{plan.price}</span>
                    <span className={`text-xs font-bold uppercase tracking-widest ${plan.popular ? theme.textColor : 'text-slate-500'}`}>{plan.interval}</span>
                  </div>
                  
                  <ul className="space-y-4 mb-10 flex-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm font-medium">
                        <div className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center mt-0.5 ${plan.popular ? `bg-gradient-to-br ${service.colorGradient} shadow-md` : 'bg-white/10'}`}>
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <span className={plan.popular ? 'text-white/95' : 'text-slate-300 font-light'}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a href="#contact" className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest text-center transition-all duration-500
                    ${plan.popular 
                      ? `bg-white text-[#05070E] hover:scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:bg-slate-100` 
                      : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    Initiate Project
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- THE FUNNEL --- */}
      <section id="contact" className="relative z-10 py-32 lg:py-40">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-5xl mx-auto px-6">
          <div className="rounded-[48px] p-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent shadow-[0_0_100px_rgba(255,255,255,0.03)] relative overflow-hidden group hover:shadow-[0_0_150px_rgba(255,255,255,0.08)] transition-shadow duration-1000">
            <div className="rounded-[47px] p-10 md:p-24 text-center relative overflow-hidden bg-[#030409]">
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] max-h-[800px] bg-gradient-to-r ${service.colorGradient} blur-[140px] rounded-full pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-1000 transform-gpu`}></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-tight mb-8 drop-shadow-2xl">Deploy {service.title}.</h2>
                <p className="text-slate-300 text-lg md:text-xl mb-14 max-w-2xl mx-auto font-light leading-relaxed">Enter your corporate email below. Our senior engineering team will review your requirements and architect a deployment roadmap.</p>
                
                <Magnetic strength={0.05}>
                  <div className="max-w-lg mx-auto bg-[#05070E]/60 backdrop-blur-3xl p-8 rounded-[32px] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.1)] relative transform-gpu hover:scale-[1.02] transition-transform duration-500">
                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent ${theme.funnelLine} to-transparent`}></div>
                    <LeadFunnel />
                  </div>
                </Magnetic>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}