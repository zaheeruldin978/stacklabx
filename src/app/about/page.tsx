"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutUsPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const coreValues = [
    {
      title: "Uncompromising Security",
      description: "In the enterprise tier, security is not an afterthought. We build zero-trust architectures and military-grade encryption protocols from day one.",
      icon: (
        <svg className="w-6 h-6 text-[#00E5FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Infinite Scalability",
      description: "We don't build software for where your business is today. We architect cloud-native ecosystems designed to handle your traffic ten years from now.",
      icon: (
        <svg className="w-6 h-6 text-[#00E5FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      )
    },
    {
      title: "Intelligent Automation",
      description: "We leverage cutting-edge AI and machine learning to replace manual bottlenecks with autonomous workflows, saving you thousands of operational hours.",
      icon: (
        <svg className="w-6 h-6 text-[#00E5FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <main className="relative min-h-screen selection:bg-[#0066FF]/30 bg-[#020408] pb-32 font-sans overflow-hidden">
      
      {/* SHARP AMBIENT BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vh] bg-[#0066FF]/15 blur-[150px] rounded-full mix-blend-screen transform-gpu" />
        <div className="absolute top-[40%] left-[-10%] w-[40vw] h-[40vh] bg-fuchsia-600/10 blur-[150px] rounded-full mix-blend-screen transform-gpu" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-[20vh]">
        
        {/* ========================================== */}
        {/* HERO SECTION                               */}
        {/* ========================================== */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#0066FF]/20 bg-[#0066FF]/10 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00E5FF]"></span>
              </span>
              <span className="text-[10px] font-bold text-[#00E5FF] tracking-widest uppercase">Our Mission</span>
            </div>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-5xl sm:text-6xl md:text-[5rem] font-bold tracking-tight pb-2 mb-8 leading-[1.05] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 drop-shadow-xl">
             Engineering <br className="hidden md:block" /> the Impossible.
          </motion.h1>
          
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            StacklabX is a premier software engineering agency based in the UK. We don't just write code; we architect high-performance digital ecosystems for enterprises that refuse to settle for average.
          </motion.p>
        </div>

        {/* ========================================== */}
        {/* THE STORY / WHO WE ARE                     */}
        {/* ========================================== */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#0066FF]/20 to-fuchsia-600/20 blur-2xl rounded-3xl opacity-50"></div>
            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square rounded-[32px] overflow-hidden border border-white/10 bg-[#0a0f1a]/80 backdrop-blur-xl p-8 flex flex-col justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)] mb-8">
                <span className="text-white text-3xl font-black">S</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Born in Cardiff. <br/>Built for the World.</h3>
              <p className="text-slate-400 font-light leading-relaxed mb-6">
                What started as a passion for clean architecture has evolved into a powerhouse of digital transformation. Operating out of our headquarters at 176-178 City Road, Cardiff, we partner with visionary brands globally to solve their most complex technical bottlenecks.
              </p>
              <div className="flex items-center gap-4 text-sm font-medium text-slate-300">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"></span>
                  Accepting New Projects
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Partner With Us?</h2>
            <p className="text-slate-400 font-light leading-relaxed mb-10 text-lg">
              Most agencies deliver a website and disappear. We operate as your elite technical co-founders. From crafting Next.js frontends that load in milliseconds to orchestrating massive Alibaba Cloud and AWS infrastructures, we build software that drives real revenue.
            </p>
            
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
              {coreValues.map((value, idx) => (
                <motion.div key={idx} variants={fadeUp} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    {value.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-2">{value.title}</h4>
                    <p className="text-slate-400 font-light text-sm leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* TECH STACK / CAPABILITIES                    */}
        {/* ========================================== */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Engineering Arsenal</h2>
            <p className="text-slate-400 font-light max-w-2xl mx-auto">We deploy only the most modern, battle-tested technologies to ensure your project outperforms the competition.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Tech Stack Pills */}
            {['Next.js 14', 'React & TypeScript', 'Alibaba Cloud', 'AWS Architecture', 'Node.js & Prisma', 'Headless CMS', 'AI Integrations', 'Stripe Commerce'].map((tech, idx) => (
              <div key={idx} className="bg-white/[0.02] border border-white/5 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/[0.05] hover:border-cyan-500/30 transition-all duration-300 group">
                <span className="text-slate-300 font-semibold group-hover:text-cyan-400 transition-colors">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================== */}
        {/* CTA SECTION                                */}
        {/* ========================================== */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[40px] overflow-hidden border border-white/10 bg-[#0a0f1a]/80 backdrop-blur-xl p-12 md:p-20 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/10 to-fuchsia-600/10 pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Scale?</h2>
            <p className="text-slate-400 font-light text-lg mb-10">Stop losing customers to slow, outdated software. Let's build something extraordinary together.</p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all"
            >
              Start Your Project Today
            </Link>
          </div>
        </motion.div>

      </div>
    </main>
  );
}