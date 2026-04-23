"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import LeadFunnel from "../components/sections/LeadFunnel";
import { useRef, ReactNode } from "react";

// --- 1. OPTIMIZED MAGNETIC PHYSICS ---
function Magnetic({ children, strength = 0.15 }: { children: ReactNode, strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 20, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 100, damping: 20, mass: 0.1 });

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
    <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={reset} style={{ x: springX, y: springY }} className="will-change-transform">
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
              visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.02 } }
            }}
            className="inline-block will-change-transform"
          >
            {word}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
};

// --- 3. OPTIMIZED GRID BACKGROUND ---
const AnimatedGridBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute inset-0 bg-[#020308] z-0"></div>
    <div className="absolute inset-0 opacity-[0.04] z-10" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px)', backgroundSize: '40px 100%' }}></div>
    <motion.div 
      animate={{ y: [0, 40] }} 
      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      className="absolute inset-0 opacity-[0.04] z-10 h-[200%] transform-gpu will-change-transform" 
      style={{ backgroundImage: 'linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '100% 40px' }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-[#020308] via-transparent to-[#020308] z-20"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-[#020308] via-transparent to-[#020308] z-20"></div>
  </div>
);

// --- 4. PERFORMANCE-OPTIMIZED MESH BACKGROUND ---
const BreathtakingHeroBackground = () => {
  const nodes = Array.from({ length: 12 }).map((_, i) => {
    const colorClass = 
      i % 4 === 0 ? 'bg-fuchsia-400 shadow-[0_0_25px_rgba(217,70,239,0.9)]' : 
      i % 3 === 0 ? 'bg-violet-400 shadow-[0_0_25px_rgba(139,92,246,0.9)]' : 
      i % 2 === 0 ? 'bg-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.9)]' : 
      'bg-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.9)]';

    return {
      id: i,
      size: (i % 3) === 0 ? 6 : (i % 2) === 0 ? 3 : 5,
      x: (i * 37) % 100, 
      y: (i * 29) % 100, 
      duration: (i % 5) + 12, 
      delay: (i % 10) * -1, 
      colorClass
    };
  });

  const streams = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    top: (i * 15) % 120 - 10, 
    duration: (i % 3) + 3, 
    delay: (i % 8) * 1.5, 
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360, opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute w-[80vw] h-[80vh] max-w-[1000px] bg-gradient-to-tr from-cyan-500/40 via-blue-600/30 to-fuchsia-600/20 blur-[120px] rounded-full mix-blend-screen transform-gpu will-change-transform"
      />
      <motion.div
        animate={{ rotate: -360, opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        className="absolute w-[70vw] h-[70vh] max-w-[900px] bg-gradient-to-bl from-indigo-500/30 via-purple-600/20 to-blue-500/20 blur-[130px] rounded-full mix-blend-screen transform-gpu will-change-transform"
      />

      <div className="absolute inset-0 rotate-[-35deg] scale-150">
        {streams.map((s) => (
          <motion.div
            key={`stream-${s.id}`}
            className="absolute h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_20px_rgba(6,182,212,1)] transform-gpu will-change-transform"
            style={{ top: `${s.top}%`, left: 0, width: '35%' }}
            animate={{ x: ['-100vw', '200vw'], opacity: [0, 1, 0] }}
            transition={{ duration: s.duration, repeat: Infinity, ease: "linear", delay: s.delay }}
          />
        ))}
      </div>

      {nodes.map((n) => (
        <motion.div
          key={`node-${n.id}`}
          className={`absolute rounded-full transform-gpu will-change-transform ${n.colorClass}`}
          style={{ width: n.size, height: n.size, left: `${n.x}%`, top: `${n.y}%` }}
          animate={{ y: [0, -80, 0], x: [0, 40, 0], opacity: [0.2, 1, 0.2] }}
          transition={{ duration: n.duration, repeat: Infinity, ease: "easeInOut", delay: n.delay }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020308] z-20"></div>
    </div>
  );
};

// --- 5. VIBRANT INTERACTIVE BENTO CARD ---
function VibrantCard({ title, desc, icon, colorGradient, laserColor, linkHref }: { title: string, desc: string, icon: ReactNode, colorGradient: string, laserColor: string, linkHref: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-4, 4]);

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
      className="relative group rounded-[32px] p-[2px] w-full h-full perspective-1000 overflow-hidden block will-change-transform"
    >
      <Link href={linkHref} className="absolute inset-0 z-30"><span className="sr-only">Learn more about {title}</span></Link>
      
      <div className="absolute inset-0 rounded-[32px] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
         <div
           className="absolute -inset-[100%] z-0 animate-[spin_4s_linear_infinite]"
           style={{ background: `conic-gradient(from 0deg, transparent 0 300deg, ${laserColor} 360deg)` }}
         />
      </div>
      
      <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/[0.08] to-white/[0.02] z-0 group-hover:bg-transparent transition-colors duration-500"></div>
      
      <div className="relative z-10 h-full w-full bg-[#05070E]/90 backdrop-blur-2xl rounded-[30px] p-6 md:p-8 flex flex-col shadow-2xl overflow-hidden">
        <div className="relative z-20 flex flex-col h-full transform-gpu group-hover:translate-z-[15px] transition-transform duration-500 pointer-events-none">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorGradient} flex items-center justify-center mb-5 shadow-[0_0_25px_rgba(255,255,255,0.15)] group-hover:scale-110 transition-transform duration-500 text-white p-[1px]`}>
            <div className="w-full h-full bg-[#05070E]/40 backdrop-blur-md rounded-[15px] flex items-center justify-center shadow-inner">
              {icon}
            </div>
          </div>
          <h3 className="text-xl font-bold text-white mb-3 tracking-tight drop-shadow-md">{title}</h3>
          <p className="text-slate-300 text-base leading-relaxed font-light mb-6 flex-grow">{desc}</p>
          <div className="mt-auto flex items-center text-xs font-bold text-white uppercase tracking-widest gap-2 group-hover:gap-4 transition-all opacity-70 group-hover:opacity-100">
            Learn More <span className="text-lg leading-none">&rarr;</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- FIX: HYDRATION-SAFE HTML STRIPPER ---
const stripHtml = (html: string) => {
  if (!html) return "";
  let text = html.replace(/<[^>]*>?/gm, ''); 
  text = text.replace(/&#8217;/g, "’")
             .replace(/&#8216;/g, "‘")
             .replace(/&#8220;/g, "“")
             .replace(/&#8221;/g, "”")
             .replace(/&nbsp;/g, " ")
             .replace(/&amp;/g, "&")
             .replace(/&quot;/g, '"')
             .replace(/&apos;/g, "'")
             .replace(/&#39;/g, "'");
  return text;
};

// --- MAIN CLIENT COMPONENT ---
export default function HomeClient({ recentPosts }: { recentPosts: any[] }) {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -60]);
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="relative overflow-hidden selection:bg-cyan-500/30 bg-[#020308]">
      
      {/* --- 1. CLEAN DARK HERO BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#020308]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      {/* --- 2. THE HERO --- */}
      <section className="relative pt-[20vh] pb-24 z-10 max-w-7xl mx-auto px-6 min-h-[85vh] flex flex-col justify-center items-center text-center">
        <BreathtakingHeroBackground />
        
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mb-8 relative z-10">
          <div className="group relative inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.25)] cursor-default hover:bg-cyan-500/20 transition-colors backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,1)]"></span>
            </span>
            <span className="text-sm font-bold text-cyan-300 tracking-wide uppercase">Ready To Build Your Vision</span>
          </div>
        </motion.div>
        
        <div className="max-w-5xl mx-auto mb-8 relative z-10">
          <AnimatedText text="Custom software &" className="text-5xl sm:text-6xl md:text-[5.5rem] font-bold tracking-tighter text-white leading-[1.05]" />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
             <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-bold tracking-tighter leading-[1.05] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-500 pb-2 drop-shadow-xl">
               high-converting websites.
             </h1>
          </motion.div>
        </div>
        
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-lg md:text-xl text-slate-200 mb-12 leading-relaxed max-w-3xl font-light relative z-10 drop-shadow-md">
          We help your business grow by building stunning websites, highly secure online stores, and smart AI tools that automate your daily work.
        </motion.p>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto items-center relative z-10">
          <Magnetic strength={0.2}>
            <Link href="/contact" className="relative group px-10 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base hover:scale-105 transition-all duration-500 shadow-[0_10px_40px_rgba(6,182,212,0.4)] flex items-center justify-center gap-3">
              Start Your Project
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
            </Link>
          </Magnetic>
          <Magnetic strength={0.1}>
            <Link href="#capabilities" className="px-10 py-4 rounded-full border border-white/20 bg-[#05070E]/70 backdrop-blur-xl text-white font-semibold text-base hover:bg-white/10 transition-colors duration-500 text-center shadow-xl">
              See Our Services
            </Link>
          </Magnetic>
        </motion.div>
      </section>

      {/* --- 3. CLEAR BUSINESS METRICS --- */}
      <section className="py-16 relative z-10 border-y border-cyan-500/20 bg-gradient-to-r from-cyan-900/10 via-[#020308] to-fuchsia-900/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center md:justify-around items-center gap-12 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="group cursor-default">
              <motion.div variants={fadeUp} className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-500 mb-2 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">200+</motion.div>
              <motion.div variants={fadeUp} className="text-xs text-slate-300 font-bold uppercase tracking-[0.2em]">Happy Clients</motion.div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="group cursor-default">
              <motion.div variants={fadeUp} className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-indigo-500 mb-2 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]">100%</motion.div>
              <motion.div variants={fadeUp} className="text-xs text-slate-300 font-bold uppercase tracking-[0.2em]">Secure Systems</motion.div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="group cursor-default">
              <motion.div variants={fadeUp} className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-400 to-purple-500 mb-2 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(217,70,239,0.4)]">15+</motion.div>
              <motion.div variants={fadeUp} className="text-xs text-slate-300 font-bold uppercase tracking-[0.2em]">Expert Developers</motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- ENTERPRISE TECH STACK MARQUEE --- */}
      <section className="py-12 overflow-hidden border-b border-white/5 bg-[#020308] relative z-10">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#020308] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#020308] to-transparent z-20 pointer-events-none"></div>
        <div className="flex w-max">
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 30 }} className="flex gap-16 md:gap-32 items-center px-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 transform-gpu will-change-transform">
            {[1, 2].map((set) => (
              <div key={set} className="flex gap-16 md:gap-32 items-center">
                <span className="text-2xl font-bold tracking-tight text-white flex items-center gap-2"><svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2z"/></svg> NEXT.JS</span>
                <span className="text-2xl font-bold tracking-tighter text-blue-400">TypeScript</span>
                <span className="text-2xl font-black italic text-orange-400">AWS Cloud</span>
                <span className="text-2xl font-bold tracking-widest text-indigo-400">PostgreSQL</span>
                <span className="text-2xl font-black text-violet-400 flex items-center gap-2">STRIPE <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg></span>
                <span className="text-2xl font-serif text-emerald-400">OpenAI</span>
                <span className="text-2xl font-bold tracking-tight text-white">VERCEL ▲</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- 4. SERVICE MATRIX --- */}
      <section className="py-32 relative z-10" id="capabilities">
        <AnimatedGridBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <AnimatedText text="What we do for you." className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6" />
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-slate-300 text-xl font-light">We solve complex business problems with smart, fast, and beautiful technology.</motion.p>
          </div>

          <motion.div style={{ y: yParallax }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <VibrantCard 
              title="Custom Websites"
              desc="Fast, responsive, and beautifully designed websites that attract new visitors and rank highly on Google search results."
              colorGradient="from-cyan-400 to-blue-600" laserColor="rgba(6,182,212,1)" linkHref="/services"
              icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>}
            />
            <VibrantCard 
              title="Software & AI Bots"
              desc="Stop doing manual work. We build custom software and AI tools that automate your daily tasks, saving you hours of time every week."
              colorGradient="from-fuchsia-400 to-purple-600" laserColor="rgba(217,70,239,1)" linkHref="/services"
              icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>}
            />
            <VibrantCard 
              title="E-Commerce Stores"
              desc="Start selling online securely. We build powerful, easy-to-manage online stores that turn everyday visitors into paying customers."
              colorGradient="from-emerald-400 to-teal-500" laserColor="rgba(16,185,129,1)" linkHref="/services"
              icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>}
            />
            <VibrantCard 
              title="Mobile Apps"
              desc="We develop stunning native and cross-platform mobile apps for iOS and Android that keep your customers engaged."
              colorGradient="from-violet-400 to-indigo-600" laserColor="rgba(139,92,246,1)" linkHref="/services"
              icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>}
            />
            <VibrantCard 
              title="UI/UX Design"
              desc="We design intuitive, world-class user interfaces that turn complex business workflows into simple, beautiful digital experiences."
              colorGradient="from-amber-400 to-orange-500" laserColor="rgba(245,158,11,1)" linkHref="/services"
              icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>}
            />
            <VibrantCard 
              title="Secure Cloud Hosting"
              desc="Keep your business online 24/7. We provide lightning-fast, ultra-secure cloud hosting so your website never crashes."
              colorGradient="from-rose-400 to-red-600" laserColor="rgba(244,63,94,1)" linkHref="/services"
              icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>}
            />
          </motion.div>
        </div>
      </section>

      {/* --- PROTOCOL SECTION --- */}
      <section className="py-32 relative z-10 border-y border-white/5 bg-[#03050C]">
        <div className="max-w-7xl mx-auto px-6 relative">
          
          <div className="absolute top-[60%] left-0 right-0 hidden md:block h-px bg-white/5 pointer-events-none">
             <motion.div animate={{ x: ["-100%", "1000%"] }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className="w-32 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_rgba(6,182,212,0.8)] transform-gpu will-change-transform"></motion.div>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="mb-24 text-center relative z-10">
            <motion.h2 variants={fadeUp} className="text-xs font-bold text-fuchsia-400 uppercase tracking-[0.2em] mb-4">OUR PROCESS</motion.h2>
            <motion.h3 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white tracking-tight">How we bring your ideas to life.</motion.h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative p-10 rounded-[32px] border border-cyan-500/30 bg-gradient-to-br from-[#05070E] to-cyan-900/10 shadow-[0_0_30px_rgba(6,182,212,0.1)] overflow-hidden group hover:border-cyan-400/50 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 blur-3xl group-hover:bg-cyan-500/30 transition-colors"></div>
              <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 to-blue-600 opacity-40 mb-6 group-hover:opacity-70 transition-opacity">01</div>
              <h4 className="text-2xl font-bold text-white mb-4 relative z-10">Discovery & Planning</h4>
              <p className="text-slate-300 text-lg font-light leading-relaxed">We listen to your exact needs, understand your business goals, and create a clear roadmap for your project.</p>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative p-10 rounded-[32px] border border-fuchsia-500/30 bg-gradient-to-br from-[#05070E] to-fuchsia-900/10 shadow-[0_0_30px_rgba(217,70,239,0.1)] overflow-hidden group hover:border-fuchsia-400/50 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/20 blur-3xl group-hover:bg-fuchsia-500/30 transition-colors"></div>
              <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-fuchsia-400 to-purple-600 opacity-40 mb-6 group-hover:opacity-70 transition-opacity">02</div>
              <h4 className="text-2xl font-bold text-white mb-4 relative z-10">Design & Development</h4>
              <p className="text-slate-300 text-lg font-light leading-relaxed">Our expert developers build your project using the latest, fastest, and most secure technologies available today.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative p-10 rounded-[32px] border border-emerald-500/30 bg-gradient-to-br from-[#05070E] to-emerald-900/10 shadow-[0_0_30px_rgba(16,185,129,0.1)] overflow-hidden group hover:border-emerald-400/50 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl group-hover:bg-emerald-500/30 transition-colors"></div>
              <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-teal-600 opacity-40 mb-6 group-hover:opacity-70 transition-opacity">03</div>
              <h4 className="text-2xl font-bold text-white mb-4 relative z-10">Testing & Launch</h4>
              <p className="text-slate-300 text-lg font-light leading-relaxed">We rigorously test every feature to ensure it works perfectly on all devices before confidently launching it to the world.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 5. TESTIMONIALS --- */}
      <section className="py-32 relative z-10 bg-[#020308]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="text-center mb-20 max-w-2xl mx-auto">
            <motion.h2 variants={fadeUp} className="text-xs font-bold text-cyan-400 uppercase tracking-[0.2em] mb-4">CLIENT REVIEWS</motion.h2>
            <motion.h3 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white tracking-tight">Hear from our happy clients.</motion.h3>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeUp} className="p-10 md:p-14 rounded-[32px] bg-gradient-to-br from-[#05070E] to-cyan-950/30 border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.05)] flex flex-col h-full relative overflow-hidden group hover:border-cyan-500/50 transition-colors duration-500">
              <div className="absolute -top-6 -right-6 text-[150px] font-serif text-cyan-500/10 leading-none group-hover:text-cyan-500/20 transition-colors duration-500">&quot;</div>
              <div className="flex text-yellow-400 mb-8 gap-1 relative z-10">
                {[...Array(5)].map((_, i) => <svg key={i} className="w-6 h-6 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>)}
              </div>
              <p className="text-slate-200 text-xl leading-relaxed font-light mb-12 flex-grow relative z-10">&quot;We needed a completely new online store. StacklabX delivered an amazing, fast-loading website ahead of schedule. Our sales jumped immediately after launch!&quot;</p>
              <div className="flex items-center gap-5 border-t border-cyan-500/20 pt-8 relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-white text-xl shadow-[0_0_15px_rgba(6,182,212,0.4)]">SJ</div>
                <div>
                  <div className="font-bold text-white text-xl tracking-tight">Sarah Jenkins</div>
                  <div className="text-sm text-cyan-400 font-medium">Retail Store Owner</div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="p-10 md:p-14 rounded-[32px] bg-gradient-to-br from-[#05070E] to-fuchsia-950/20 border border-fuchsia-500/20 shadow-[0_0_40px_rgba(217,70,239,0.05)] flex flex-col h-full relative overflow-hidden group hover:border-fuchsia-500/50 transition-colors duration-500">
              <div className="absolute -top-6 -right-6 text-[150px] font-serif text-fuchsia-500/10 leading-none group-hover:text-fuchsia-500/20 transition-colors duration-500">&quot;</div>
              <div className="flex text-yellow-400 mb-8 gap-1 relative z-10">
                {[...Array(5)].map((_, i) => <svg key={i} className="w-6 h-6 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>)}
              </div>
              <p className="text-slate-200 text-xl leading-relaxed font-light mb-12 flex-grow relative z-10">&quot;We ordered a custom dashboard to manage our daily operations. The team built it perfectly and it is so easy to use. StacklabX is incredible.&quot;</p>
              <div className="flex items-center gap-5 border-t border-fuchsia-500/20 pt-8 relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-fuchsia-400 to-purple-600 flex items-center justify-center font-bold text-white text-xl shadow-[0_0_15px_rgba(217,70,239,0.4)]">MA</div>
                <div>
                  <div className="font-bold text-white text-xl tracking-tight">Marcus Alvarez</div>
                  <div className="text-sm text-fuchsia-400 font-medium">Logistics Manager</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- 6. REAL DYNAMIC BLOG FEED --- */}
      <section className="py-32 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6">
            <div>
              <motion.h2 variants={fadeUp} className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">OUR BLOG</motion.h2>
              <motion.h3 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white tracking-tight">Helpful Tips & Guides</motion.h3>
            </div>
            <motion.div variants={fadeUp}>
              <Link href="/blog" className="px-8 py-4 rounded-full border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-white font-semibold transition-colors duration-500 w-max shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                View All Articles
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
            {recentPosts.length > 0 ? (
              recentPosts.map((post, i) => {
                const colorMap = ["from-cyan-400 to-blue-600", "from-fuchsia-400 to-purple-600", "from-emerald-400 to-teal-500"];
                const gradientColor = colorMap[i % colorMap.length];
                
                const cleanExcerpt = post.excerpt ? stripHtml(post.excerpt) : "Read full article inside...";

                return (
                  <motion.div variants={fadeUp} key={post.id} className="h-full">
                    <Link href={`/blog/${post.slug}`} className="group block rounded-[32px] p-6 border border-white/5 bg-[#05070E] hover:border-white/20 transition-all duration-500 hover:-translate-y-2 shadow-xl h-full flex flex-col">
                      <div className="aspect-video w-full rounded-[16px] overflow-hidden relative mb-6 border border-white/5 bg-[#020408]">
                        {post.imageUrl ? (
                          <Image 
                            src={post.imageUrl} 
                            alt={post.title || "StacklabX Article"} 
                            fill
                            priority={i === 0}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                            className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-90" 
                          />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${gradientColor} opacity-90 group-hover:opacity-100 transition-opacity`}>
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                          </div>
                        )}
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">{post.category?.name || "ARTICLE"}</div>
                      <h4 className="text-2xl font-bold text-white mb-4 tracking-tight leading-snug group-hover:text-cyan-400 transition-colors line-clamp-2" dangerouslySetInnerHTML={{ __html: post.title }} />
                      <div className="text-slate-300 text-base font-light leading-relaxed flex-grow line-clamp-3 prose-p:m-0">
                        {cleanExcerpt}
                      </div>
                    </Link>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-3 text-center py-20 border border-white/10 rounded-[32px] bg-white/[0.02]">
                <p className="text-slate-400 text-lg">New insights are being published soon. Stay tuned!</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* --- 7. THE COLORFUL MEGA FUNNEL --- */}
      <section className="relative z-10 py-32 lg:py-48">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-5xl mx-auto px-6">
          <div className="rounded-[48px] p-[2px] bg-gradient-to-b from-cyan-500/50 via-blue-500/20 to-transparent shadow-[0_0_100px_rgba(6,182,212,0.25)] relative overflow-hidden group hover:shadow-[0_0_150px_rgba(6,182,212,0.4)] transition-shadow duration-700">
            <div className="rounded-[46px] p-10 md:p-24 text-center relative overflow-hidden bg-[#020308]">
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] max-h-[800px] bg-gradient-to-r from-cyan-500/30 to-blue-600/30 blur-[120px] rounded-full pointer-events-none group-hover:opacity-100 opacity-70 transition-opacity duration-700 transform-gpu will-change-transform"></div>
              
              <div className="relative z-10">
                <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 drop-shadow-2xl">Ready to grow?</h2>
                <p className="text-slate-200 text-xl mb-14 max-w-2xl mx-auto font-light leading-relaxed">Enter your email below. Our team will review your ideas and help you build a clear plan for your business success.</p>
                
                <Magnetic strength={0.05}>
                  <div className="max-w-lg mx-auto bg-[#05070E]/80 backdrop-blur-3xl p-8 rounded-[32px] border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)] relative transform-gpu hover:scale-[1.02] transition-transform duration-500">
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