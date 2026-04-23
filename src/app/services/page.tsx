"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import LeadFunnel from "../../components/sections/LeadFunnel";
import { useRef, ReactNode } from "react";

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
              visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.03 } }
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

// --- 3. SERVICES HERO BACKGROUND ---
const ServicesHeroBackground = () => {
  const nodes = Array.from({ length: 20 }).map((_, i) => {
    const colorClass = 
      i % 3 === 0 ? 'bg-fuchsia-400 shadow-[0_0_25px_rgba(217,70,239,0.9)]' : 
      i % 2 === 0 ? 'bg-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.9)]' : 
      'bg-indigo-400 shadow-[0_0_25px_rgba(99,102,241,0.9)]';

    return {
      id: i,
      size: (i % 3) === 0 ? 5 : (i % 2) === 0 ? 3 : 4,
      x: (i * 31) % 100, 
      y: (i * 23) % 100, 
      duration: (i % 4) + 12, 
      delay: (i % 8) * -1, 
      colorClass
    };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360, opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute w-[80vw] h-[80vh] max-w-[1000px] bg-gradient-to-tr from-blue-600/30 via-indigo-600/20 to-fuchsia-600/20 blur-[120px] rounded-full mix-blend-screen transform-gpu will-change-transform"
      />
      <motion.div
        animate={{ rotate: -360, opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        className="absolute w-[70vw] h-[70vh] max-w-[900px] bg-gradient-to-bl from-cyan-500/20 via-blue-600/20 to-purple-500/20 blur-[130px] rounded-full mix-blend-screen transform-gpu will-change-transform"
      />

      {nodes.map((n) => (
        <motion.div
          key={`srv-node-${n.id}`}
          className={`absolute rounded-full transform-gpu will-change-transform ${n.colorClass}`}
          style={{
            width: n.size,
            height: n.size,
            left: `${n.x}%`,
            top: `${n.y}%`,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, 30, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: n.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: n.delay,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-[#020308]/50 via-transparent to-[#020308] z-20"></div>
    </div>
  );
};

// --- 4. VIBRANT INTERACTIVE BENTO CARD (Optimized for 4-Column Layout) ---
function VibrantCard({ title, desc, icon, colorGradient, laserColor, link }: { title: string, desc: string, icon: ReactNode, colorGradient: string, laserColor: string, link: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <Link href={link} prefetch={false} className="block w-full h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative group rounded-[28px] p-[1.5px] w-full h-full perspective-1000 overflow-hidden cursor-pointer transform-gpu will-change-transform"
      >
        <div className="absolute inset-0 rounded-[28px] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
           <div
             className="absolute -inset-[100%] z-0 animate-[spin_4s_linear_infinite]"
             style={{ background: `conic-gradient(from 0deg, transparent 0 300deg, ${laserColor} 360deg)` }}
           />
        </div>
        
        <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/[0.08] to-white/[0.02] z-0 group-hover:bg-transparent transition-colors duration-500"></div>
        
        <div className="relative z-10 h-full w-full bg-[#05070E]/90 backdrop-blur-2xl rounded-[26px] p-5 md:p-6 flex flex-col shadow-2xl overflow-hidden">
          <div className="relative z-20 flex flex-col h-full transform-gpu group-hover:translate-z-[12px] transition-transform duration-500">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorGradient} flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(255,255,255,0.15)] group-hover:scale-110 transition-transform duration-500 text-white p-[1px]`}>
              <div className="w-full h-full bg-[#05070E]/40 backdrop-blur-md rounded-[11px] flex items-center justify-center shadow-inner">
                {icon}
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-white mb-2 tracking-tight drop-shadow-md">{title}</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-light mb-5 flex-grow">{desc}</p>
            
            <div className="mt-auto flex items-center text-[11px] font-bold text-white uppercase tracking-widest gap-2 group-hover:gap-3 transition-all opacity-70 group-hover:opacity-100">
              View Service <span className="text-base leading-none">&rarr;</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// --- MAIN PAGE LAYOUT ---
export default function ServicesPage() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -60]);
  
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  // SVG Icon Templates for clean code reuse
  const iconWeb = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>;
  const iconAI = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>;
  const iconCart = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>;
  const iconMobile = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>;
  const iconDesign = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>;
  const iconCloud = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>;
  const iconSearch = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>;
  const iconShield = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>;
  const iconChat = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>;
  const iconData = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>;

  // 40 Comprehensive B2B IT Services
  const allServices = [
    // --- WEB & APP CORE ---
    { title: "Custom Websites", desc: "Fast, responsive websites that rank high on Google and drive customer sales.", colorGradient: "from-cyan-400 to-blue-600", laserColor: "rgba(6,182,212,1)", link: "/services/custom-websites", icon: iconWeb },
    { title: "E-Commerce Stores", desc: "Secure, highly-converting online shops built on Shopify, WooCommerce, or custom platforms.", colorGradient: "from-emerald-400 to-teal-500", laserColor: "rgba(16,185,129,1)", link: "/services/ecommerce", icon: iconCart },
    { title: "Mobile Apps (iOS)", desc: "Beautiful, native Apple applications that keep your mobile customers engaged.", colorGradient: "from-fuchsia-400 to-purple-600", laserColor: "rgba(217,70,239,1)", link: "/services/ios-apps", icon: iconMobile },
    { title: "Mobile Apps (Android)", desc: "High-performance Android applications built to scale across all devices globally.", colorGradient: "from-violet-400 to-indigo-600", laserColor: "rgba(139,92,246,1)", link: "/services/android-apps", icon: iconMobile },
    { title: "SaaS Web Apps", desc: "Complex web applications and software-as-a-service platforms built with Next.js.", colorGradient: "from-amber-400 to-orange-500", laserColor: "rgba(245,158,11,1)", link: "/services/saas", icon: iconWeb },
    { title: "UI/UX Design", desc: "World-class interface design that makes your digital products easy and beautiful to use.", colorGradient: "from-rose-400 to-red-600", laserColor: "rgba(244,63,94,1)", link: "/services/ui-ux", icon: iconDesign },
    { title: "Landing Pages", desc: "Single-page websites highly optimized to capture leads and drive ad conversions.", colorGradient: "from-cyan-400 to-blue-600", laserColor: "rgba(6,182,212,1)", link: "/services/landing-pages", icon: iconWeb },
    { title: "Corporate Portfolios", desc: "Premium digital portfolios to showcase your agency, real estate, or firm's best work.", colorGradient: "from-emerald-400 to-teal-500", laserColor: "rgba(16,185,129,1)", link: "/services/portfolios", icon: iconWeb },

    // --- AI & AUTOMATION ---
    { title: "Business Automation", desc: "Stop doing manual work. We use scripts and APIs to automate your daily office tasks.", colorGradient: "from-fuchsia-400 to-purple-600", laserColor: "rgba(217,70,239,1)", link: "/services/automation", icon: iconAI },
    { title: "AI Chatbots", desc: "Smart customer service bots that answer questions and capture leads 24/7.", colorGradient: "from-violet-400 to-indigo-600", laserColor: "rgba(139,92,246,1)", link: "/services/chatbots", icon: iconChat },
    { title: "Machine Learning", desc: "Custom AI models that predict trends, analyze data, and optimize your business.", colorGradient: "from-amber-400 to-orange-500", laserColor: "rgba(245,158,11,1)", link: "/services/machine-learning", icon: iconAI },
    { title: "CRM Development", desc: "Custom Customer Relationship Management software tailored exactly to your sales process.", colorGradient: "from-rose-400 to-red-600", laserColor: "rgba(244,63,94,1)", link: "/services/crm", icon: iconData },
    { title: "ERP Systems", desc: "Enterprise Resource Planning software to manage your inventory, HR, and accounting.", colorGradient: "from-cyan-400 to-blue-600", laserColor: "rgba(6,182,212,1)", link: "/services/erp", icon: iconData },
    { title: "API Development", desc: "Secure, fast connections that allow your different software tools to talk to each other.", colorGradient: "from-emerald-400 to-teal-500", laserColor: "rgba(16,185,129,1)", link: "/services/api", icon: iconWeb },
    { title: "Data Analytics Dashboards", desc: "Beautiful internal tools that turn your messy business data into clear, readable charts.", colorGradient: "from-fuchsia-400 to-purple-600", laserColor: "rgba(217,70,239,1)", link: "/services/analytics", icon: iconData },
    { title: "Legacy System Updates", desc: "We take your old, slow, outdated software and rebuild it using modern, fast code.", colorGradient: "from-violet-400 to-indigo-600", laserColor: "rgba(139,92,246,1)", link: "/services/modernization", icon: iconAI },

    // --- CLOUD & INFRASTRUCTURE ---
    { title: "Secure Cloud Hosting", desc: "Keep your business online. We provide lightning-fast, highly secure server hosting.", colorGradient: "from-amber-400 to-orange-500", laserColor: "rgba(245,158,11,1)", link: "/services/hosting", icon: iconCloud },
    { title: "Cloud Migration", desc: "Safely move your physical data and old servers into AWS, Google Cloud, or Azure.", colorGradient: "from-rose-400 to-red-600", laserColor: "rgba(244,63,94,1)", link: "/services/migration", icon: iconCloud },
    { title: "Database Management", desc: "Optimization, backup, and scaling of your PostgreSQL, MySQL, or MongoDB databases.", colorGradient: "from-cyan-400 to-blue-600", laserColor: "rgba(6,182,212,1)", link: "/services/database", icon: iconData },
    { title: "DevOps & CI/CD", desc: "Automated software deployment pipelines so you can release updates instantly and safely.", colorGradient: "from-emerald-400 to-teal-500", laserColor: "rgba(16,185,129,1)", link: "/services/devops", icon: iconCloud },
    { title: "Serverless Architecture", desc: "Pay only for what you use. We build highly scalable apps that run without traditional servers.", colorGradient: "from-fuchsia-400 to-purple-600", laserColor: "rgba(217,70,239,1)", link: "/services/serverless", icon: iconCloud },
    { title: "Disaster Recovery", desc: "Automated backup systems that ensure your business data is never permanently lost.", colorGradient: "from-violet-400 to-indigo-600", laserColor: "rgba(139,92,246,1)", link: "/services/disaster-recovery", icon: iconShield },
    { title: "Edge Computing", desc: "Deploy your web applications globally closer to users for ultra-low loading times.", colorGradient: "from-amber-400 to-orange-500", laserColor: "rgba(245,158,11,1)", link: "/services/edge", icon: iconCloud },
    { title: "Microservices", desc: "Break down your giant, slow software into small, fast, easily manageable pieces.", colorGradient: "from-rose-400 to-red-600", laserColor: "rgba(244,63,94,1)", link: "/services/microservices", icon: iconWeb },

    // --- SECURITY & SUPPORT ---
    { title: "Website Maintenance", desc: "We handle software updates, plugin management, and daily backups so you don't have to.", colorGradient: "from-cyan-400 to-blue-600", laserColor: "rgba(6,182,212,1)", link: "/services/maintenance", icon: iconShield },
    { title: "IT Consulting", desc: "Not sure what technology your business needs? We provide expert, honest advice to help you grow.", colorGradient: "from-emerald-400 to-teal-500", laserColor: "rgba(16,185,129,1)", link: "/services/consulting", icon: iconChat },
    { title: "Cybersecurity Audits", desc: "We thoroughly test your website and networks to find and fix vulnerabilities before hackers do.", colorGradient: "from-fuchsia-400 to-purple-600", laserColor: "rgba(217,70,239,1)", link: "/services/cybersecurity", icon: iconShield },
    { title: "Network Setup", desc: "Design and implementation of fast, secure internal internet networks for your physical office.", colorGradient: "from-violet-400 to-indigo-600", laserColor: "rgba(139,92,246,1)", link: "/services/network", icon: iconCloud },
    { title: "QA Testing", desc: "Rigorous quality assurance testing to ensure your software is completely bug-free before launch.", colorGradient: "from-amber-400 to-orange-500", laserColor: "rgba(245,158,11,1)", link: "/services/qa-testing", icon: iconAI },
    { title: "Tech Support Helpdesk", desc: "Dedicated on-call engineering support to fix any tech issues your staff runs into.", colorGradient: "from-rose-400 to-red-600", laserColor: "rgba(244,63,94,1)", link: "/services/support", icon: iconChat },
    { title: "Identity Management", desc: "Secure login systems (SSO, 2FA) to ensure only authorized employees can access your data.", colorGradient: "from-cyan-400 to-blue-600", laserColor: "rgba(6,182,212,1)", link: "/services/iam", icon: iconShield },
    { title: "Compliance (GDPR/HIPAA)", desc: "We upgrade your software to legally comply with strict international data privacy laws.", colorGradient: "from-emerald-400 to-teal-500", laserColor: "rgba(16,185,129,1)", link: "/services/compliance", icon: iconShield },

    // --- MARKETING & GROWTH ---
    { title: "SEO Optimization", desc: "We fix your website's code and content so it ranks #1 on Google for your services.", colorGradient: "from-fuchsia-400 to-purple-600", laserColor: "rgba(217,70,239,1)", link: "/services/seo", icon: iconSearch },
    { title: "Conversion Rate (CRO)", desc: "We analyze how users click on your site and redesign it to generate more sales.", colorGradient: "from-violet-400 to-indigo-600", laserColor: "rgba(139,92,246,1)", link: "/services/cro", icon: iconData },
    { title: "Email Automations", desc: "Set up automated email sequences that automatically market to your customers while you sleep.", colorGradient: "from-amber-400 to-orange-500", laserColor: "rgba(245,158,11,1)", link: "/services/email", icon: iconChat },
    { title: "Performance Tracking", desc: "Advanced Google Analytics and Pixel setup to track exactly where your sales come from.", colorGradient: "from-rose-400 to-red-600", laserColor: "rgba(244,63,94,1)", link: "/services/tracking", icon: iconData },
    { title: "Smart Contracts", desc: "Secure, automated blockchain contracts for financial transactions and legal agreements.", colorGradient: "from-cyan-400 to-blue-600", laserColor: "rgba(6,182,212,1)", link: "/services/blockchain", icon: iconCloud },
    { title: "Web3 Integration", desc: "Connect your traditional website or application to decentralized blockchain networks.", colorGradient: "from-emerald-400 to-teal-500", laserColor: "rgba(16,185,129,1)", link: "/services/web3", icon: iconWeb },
    { title: "IoT Development", desc: "Software that connects and controls physical hardware devices over the internet.", colorGradient: "from-fuchsia-400 to-purple-600", laserColor: "rgba(217,70,239,1)", link: "/services/iot", icon: iconAI },
    { title: "AR/VR Experiences", desc: "Build immersive Augmented Reality applications for retail, real estate, and education.", colorGradient: "from-violet-400 to-indigo-600", laserColor: "rgba(139,92,246,1)", link: "/services/ar-vr", icon: iconDesign },
  ];

  return (
    <div className="relative overflow-hidden selection:bg-indigo-500/30 bg-[#020308]">
      
      {/* --- 1. CLEAN DARK BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#020308]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      {/* --- 2. SERVICES HERO SECTION --- */}
      <section className="relative pt-[20vh] pb-24 z-10 max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center">
        
        <ServicesHeroBackground />
        
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="mb-8 relative z-10">
          <div className="group relative inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-indigo-500/40 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.25)] cursor-default backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(99,102,241,1)]"></span>
            </span>
            <span className="text-sm font-bold text-indigo-300 tracking-wide uppercase">Professional Solutions</span>
          </div>
        </motion.div>
        
        <div className="max-w-4xl mx-auto mb-8 relative z-10">
          <AnimatedText text="Everything you need" className="text-5xl sm:text-6xl md:text-[5.5rem] font-bold tracking-tighter text-white leading-[1.05]" />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
             <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-bold tracking-tighter leading-[1.05] text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-400 to-cyan-400 pb-2 drop-shadow-xl">
               to scale your business.
             </h1>
          </motion.div>
        </div>
        
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-3xl font-light relative z-10 drop-shadow-md">
          From fast-loading websites to custom software, we provide the exact digital services you need to automate your daily work and grow your revenue.
        </motion.p>
      </section>

      {/* --- 3. THE 40-CARD SERVICE MATRIX (4-COLUMN LAYOUT) --- */}
      <section className="pb-32 relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 relative z-20">
          
          {/* 4 Columns on XL screens, 3 on Large, 2 on Medium */}
          <motion.div style={{ y: yParallax }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 transform-gpu will-change-transform">
            {allServices.map((service, index) => (
              <VibrantCard 
                key={index}
                title={service.title}
                desc={service.desc}
                colorGradient={service.colorGradient}
                laserColor={service.laserColor}
                link={service.link}
                icon={service.icon}
              />
            ))}
          </motion.div>

        </div>
      </section>

      {/* --- 4. THE COLORFUL MEGA FUNNEL --- */}
      <section className="relative z-10 py-24 lg:py-32">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-5xl mx-auto px-6">
          <div className="rounded-[48px] p-[2px] bg-gradient-to-b from-indigo-500/50 via-blue-500/20 to-transparent shadow-[0_0_100px_rgba(99,102,241,0.25)] relative overflow-hidden group hover:shadow-[0_0_150px_rgba(99,102,241,0.4)] transition-shadow duration-700">
            <div className="rounded-[46px] p-10 md:p-24 text-center relative overflow-hidden bg-[#020308]">
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] max-h-[800px] bg-gradient-to-r from-indigo-500/30 to-blue-600/30 blur-[120px] rounded-full pointer-events-none group-hover:opacity-100 opacity-70 transition-opacity duration-700 transform-gpu"></div>
              
              <div className="relative z-10">
                <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 drop-shadow-2xl">Ready to start?</h2>
                <p className="text-slate-200 text-xl mb-14 max-w-2xl mx-auto font-light leading-relaxed">Enter your email below to speak with an expert and get a clear plan for your business success.</p>
                
                <Magnetic strength={0.05}>
                  <div className="max-w-lg mx-auto bg-[#05070E]/80 backdrop-blur-3xl p-8 rounded-[32px] border border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.15)] relative transform-gpu hover:scale-[1.02] transition-transform duration-500">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent"></div>
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