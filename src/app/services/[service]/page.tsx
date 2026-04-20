"use client";

import Link from "next/link";
import { motion, useSpring, useMotionValue } from "framer-motion";
import LeadFunnel from "../../../components/sections/LeadFunnel";
import { useParams } from "next/navigation";
import { useRef, ReactNode } from "react";

// --- 1. MAGNETIC PHYSICS ---
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

// --- 2. DYNAMIC BACKGROUND ---
const InnerPageBackground = ({ themeColor }: { themeColor: string }) => {
  const getGlow = () => {
    if (themeColor === 'fuchsia') return 'from-fuchsia-600/30 via-purple-600/20 to-pink-600/10';
    if (themeColor === 'emerald') return 'from-emerald-600/30 via-teal-600/20 to-cyan-600/10';
    if (themeColor === 'indigo') return 'from-indigo-600/30 via-violet-600/20 to-purple-600/10';
    if (themeColor === 'amber') return 'from-amber-600/30 via-orange-600/20 to-red-600/10';
    if (themeColor === 'rose') return 'from-rose-600/30 via-red-600/20 to-orange-600/10';
    return 'from-cyan-600/30 via-blue-600/20 to-indigo-600/10'; // Default Cyan
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-start justify-end">
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-[-20%] right-[-10%] w-[70vw] h-[70vh] max-w-[800px] bg-gradient-to-bl ${getGlow()} blur-[130px] rounded-full mix-blend-screen transform-gpu`}
      />
      <div className="absolute inset-0 opacity-[0.03] z-10" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020308]/80 to-[#020308] z-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#020308] via-transparent to-transparent z-20"></div>
    </div>
  );
};

// --- 3. STRICT SERVICE REGISTRY (Fixes the spelling and missing icons) ---
function getServiceDetails(slug: string) {
  // Master Icon Library
  const icons = {
    web: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>,
    ai: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>,
    cart: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>,
    mobile: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>,
    design: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>,
    cloud: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>,
    search: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>,
    shield: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>,
    chat: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>,
    data: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
  };

  // Perfect Master Registry
  const registry: Record<string, any> = {
    "custom-websites": { title: "Custom Websites", color: "from-cyan-400 to-blue-600", theme: "cyan", icon: icons.web },
    "ecommerce": { title: "E-Commerce Stores", color: "from-emerald-400 to-teal-500", theme: "emerald", icon: icons.cart },
    "ios-apps": { title: "Mobile Apps (iOS)", color: "from-fuchsia-400 to-purple-600", theme: "fuchsia", icon: icons.mobile },
    "android-apps": { title: "Mobile Apps (Android)", color: "from-violet-400 to-indigo-600", theme: "indigo", icon: icons.mobile },
    "saas": { title: "SaaS Web Apps", color: "from-amber-400 to-orange-500", theme: "amber", icon: icons.web },
    "ui-ux": { title: "UI/UX Design", color: "from-rose-400 to-red-600", theme: "rose", icon: icons.design },
    "landing-pages": { title: "Landing Pages", color: "from-cyan-400 to-blue-600", theme: "cyan", icon: icons.web },
    "portfolios": { title: "Corporate Portfolios", color: "from-emerald-400 to-teal-500", theme: "emerald", icon: icons.web },
    "automation": { title: "Business Automation", color: "from-fuchsia-400 to-purple-600", theme: "fuchsia", icon: icons.ai },
    "chatbots": { title: "AI Chatbots", color: "from-violet-400 to-indigo-600", theme: "indigo", icon: icons.chat },
    "machine-learning": { title: "Machine Learning", color: "from-amber-400 to-orange-500", theme: "amber", icon: icons.ai },
    "crm": { title: "CRM Development", color: "from-rose-400 to-red-600", theme: "rose", icon: icons.data },
    "erp": { title: "ERP Systems", color: "from-cyan-400 to-blue-600", theme: "cyan", icon: icons.data },
    "api": { title: "API Development", color: "from-emerald-400 to-teal-500", theme: "emerald", icon: icons.web },
    "analytics": { title: "Data Analytics", color: "from-fuchsia-400 to-purple-600", theme: "fuchsia", icon: icons.data },
    "modernization": { title: "Legacy System Updates", color: "from-violet-400 to-indigo-600", theme: "indigo", icon: icons.ai },
    "hosting": { title: "Secure Cloud Hosting", color: "from-amber-400 to-orange-500", theme: "amber", icon: icons.cloud },
    "migration": { title: "Cloud Migration", color: "from-rose-400 to-red-600", theme: "rose", icon: icons.cloud },
    "database": { title: "Database Management", color: "from-cyan-400 to-blue-600", theme: "cyan", icon: icons.data },
    "devops": { title: "DevOps & CI/CD", color: "from-emerald-400 to-teal-500", theme: "emerald", icon: icons.cloud },
    "serverless": { title: "Serverless Architecture", color: "from-fuchsia-400 to-purple-600", theme: "fuchsia", icon: icons.cloud },
    "disaster-recovery": { title: "Disaster Recovery", color: "from-violet-400 to-indigo-600", theme: "indigo", icon: icons.shield },
    "edge": { title: "Edge Computing", color: "from-amber-400 to-orange-500", theme: "amber", icon: icons.cloud },
    "microservices": { title: "Microservices", color: "from-rose-400 to-red-600", theme: "rose", icon: icons.web },
    "maintenance": { title: "Website Maintenance", color: "from-cyan-400 to-blue-600", theme: "cyan", icon: icons.shield },
    "consulting": { title: "IT Consulting", color: "from-emerald-400 to-teal-500", theme: "emerald", icon: icons.chat },
    "cybersecurity": { title: "Cybersecurity Audits", color: "from-fuchsia-400 to-purple-600", theme: "fuchsia", icon: icons.shield },
    "network": { title: "Network Setup", color: "from-violet-400 to-indigo-600", theme: "indigo", icon: icons.cloud },
    "qa-testing": { title: "QA Testing", color: "from-amber-400 to-orange-500", theme: "amber", icon: icons.ai },
    "support": { title: "Tech Support Helpdesk", color: "from-rose-400 to-red-600", theme: "rose", icon: icons.chat },
    "iam": { title: "Identity Management", color: "from-cyan-400 to-blue-600", theme: "cyan", icon: icons.shield },
    "compliance": { title: "Compliance (GDPR/HIPAA)", color: "from-emerald-400 to-teal-500", theme: "emerald", icon: icons.shield },
    "seo": { title: "SEO Optimization", color: "from-fuchsia-400 to-purple-600", theme: "fuchsia", icon: icons.search },
    "cro": { title: "Conversion Rate (CRO)", color: "from-violet-400 to-indigo-600", theme: "indigo", icon: icons.data },
    "email": { title: "Email Automations", color: "from-amber-400 to-orange-500", theme: "amber", icon: icons.chat },
    "tracking": { title: "Performance Tracking", color: "from-rose-400 to-red-600", theme: "rose", icon: icons.data },
    "blockchain": { title: "Smart Contracts", color: "from-cyan-400 to-blue-600", theme: "cyan", icon: icons.cloud },
    "web3": { title: "Web3 Integration", color: "from-emerald-400 to-teal-500", theme: "emerald", icon: icons.web },
    "iot": { title: "IoT Development", color: "from-fuchsia-400 to-purple-600", theme: "fuchsia", icon: icons.ai },
    "ar-vr": { title: "AR/VR Experiences", color: "from-violet-400 to-indigo-600", theme: "indigo", icon: icons.design }
  };

  // Check if it exists in registry. If not, build a smart fallback.
  if (registry[slug]) {
    const data = registry[slug];
    return {
      title: data.title,
      tagline: `Professional ${data.title} designed to scale your operations.`,
      desc: `We specialize in delivering high-performance ${data.title.toLowerCase()} systems that automate your daily work, attract more customers, and drive serious revenue. Our elite team builds secure, fast, and reliable architecture tailored exactly to your business goals.`,
      icon: data.icon,
      colorGradient: data.color,
      themeColor: data.theme
    };
  }

  // Fallback for custom/unknown URLs
  const fallbackTitle = slug.split('-').map(word => {
    const w = word.toLowerCase();
    if (w === 'seo') return 'SEO';
    if (w === 'ai') return 'AI';
    if (w === 'ui') return 'UI';
    if (w === 'ux') return 'UX';
    if (w === 'crm') return 'CRM';
    if (w === 'erp') return 'ERP';
    if (w === 'api') return 'API';
    if (w === 'qa') return 'QA';
    if (w === 'ios') return 'iOS';
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');

  return {
    title: fallbackTitle,
    tagline: `Professional ${fallbackTitle} designed to scale your operations.`,
    desc: `We specialize in delivering high-performance ${fallbackTitle.toLowerCase()} systems that automate your daily work, attract more customers, and drive serious revenue.`,
    icon: icons.web,
    colorGradient: "from-cyan-400 to-blue-600",
    themeColor: "cyan"
  };
}

// --- MAIN DYNAMIC COMPONENT ---
export default function SingleServicePage() {
  const params = useParams();
  const slug = params.service as string;
  const service = getServiceDetails(slug);
  
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <main className="relative min-h-screen overflow-hidden selection:bg-cyan-500/30 bg-[#020308]">
      
      {/* Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#020308]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <InnerPageBackground themeColor={service.themeColor} />

      {/* --- HERO SECTION (LEFT ALIGNED, SLEEK FONT, VISIBLE ICON) --- */}
      <section className="relative pt-[20vh] pb-24 z-10 max-w-7xl mx-auto px-6 flex flex-col items-start text-left">
        
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-12">
          <Link href="/services" className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 font-medium text-sm transition-all backdrop-blur-md">
            <span>&larr;</span> View All Services
          </Link>
        </motion.div>

        {/* MASSIVE GLOWING ICON */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="mb-8">
          <div className={`w-20 h-20 md:w-24 md:h-24 rounded-[28px] bg-gradient-to-br ${service.colorGradient} flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.15)] text-white p-[2px]`}>
            <div className="w-full h-full bg-[#05070E]/60 backdrop-blur-md rounded-[26px] flex items-center justify-center shadow-inner">
              {/* Force the SVG to render using standard wrapping */}
              <div className="text-white drop-shadow-md">
                {service.icon}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* MASSIVE TITLE - Using font-bold for a sleeker, enterprise look */}
        <div className="max-w-5xl mb-6">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className={`text-5xl sm:text-7xl md:text-[5.5rem] font-bold tracking-tight leading-[1.05] text-transparent bg-clip-text bg-gradient-to-r ${service.colorGradient} pb-2 drop-shadow-xl`}>
             {service.title}
          </motion.h1>
        </div>
        
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-2xl md:text-3xl text-white mb-6 leading-relaxed max-w-3xl font-light drop-shadow-md">
          {service.tagline}
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="text-lg md:text-xl text-slate-400 mb-12 leading-relaxed max-w-2xl font-light">
          {service.desc}
        </motion.p>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-24 relative z-10 border-y border-white/5 bg-[#030409]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
            
            <motion.div variants={fadeUp} className="p-10 rounded-[32px] bg-gradient-to-br from-[#05070E] to-cyan-950/20 border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.05)] hover:border-cyan-500/50 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-500/20 shadow-inner">
                <span className="text-2xl text-cyan-400">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Lightning Fast</h3>
              <p className="text-slate-400 text-base leading-relaxed font-light">Built on modern, lightweight architecture to ensure zero lag and instant loading times for your customers.</p>
            </motion.div>
            
            <motion.div variants={fadeUp} className="p-10 rounded-[32px] bg-gradient-to-br from-[#05070E] to-fuchsia-950/20 border border-fuchsia-500/20 shadow-[0_0_30px_rgba(217,70,239,0.05)] hover:border-fuchsia-500/50 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-fuchsia-500/10 flex items-center justify-center mb-6 border border-fuchsia-500/20 shadow-inner">
                <span className="text-2xl text-fuchsia-400">🛡️</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Highly Secure</h3>
              <p className="text-slate-400 text-base leading-relaxed font-light">Top-tier security protocols to keep your business data and your customers completely safe from threats.</p>
            </motion.div>
            
            <motion.div variants={fadeUp} className="p-10 rounded-[32px] bg-gradient-to-br from-[#05070E] to-emerald-950/20 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.05)] hover:border-emerald-500/50 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20 shadow-inner">
                <span className="text-2xl text-emerald-400">📈</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Built to Convert</h3>
              <p className="text-slate-400 text-base leading-relaxed font-light">Designed specifically with user-psychology in mind to turn everyday visitors into loyal, paying clients.</p>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* --- THE FUNNEL --- */}
      <section className="relative z-10 py-32 lg:py-40">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-5xl mx-auto px-6">
          <div className="rounded-[48px] p-[2px] bg-gradient-to-b from-cyan-500/50 via-blue-500/20 to-transparent shadow-[0_0_100px_rgba(6,182,212,0.25)] relative overflow-hidden group hover:shadow-[0_0_150px_rgba(6,182,212,0.4)] transition-shadow duration-700">
            <div className="rounded-[46px] p-10 md:p-24 text-center relative overflow-hidden bg-[#020308]">
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] max-h-[800px] bg-gradient-to-r from-cyan-500/30 to-blue-600/30 blur-[120px] rounded-full pointer-events-none group-hover:opacity-100 opacity-70 transition-opacity duration-700 transform-gpu"></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-8 drop-shadow-2xl">Need {service.title}?</h2>
                <p className="text-slate-200 text-xl mb-14 max-w-2xl mx-auto font-light leading-relaxed">Enter your email below. Our team will review your needs and build a custom plan to make your project a reality.</p>
                
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

    </main>
  );
}