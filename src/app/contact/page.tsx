"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    // Simulate API call to your backend
    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => setFormStatus("idle"), 4000);
    }, 1500);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <main className="relative min-h-screen selection:bg-cyan-500/30 bg-[#020308] pt-[15vh] pb-32 overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vh] bg-cyan-500/10 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vh] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16 md:mb-24">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 mb-6">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span><span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400"></span></span>
            <span className="text-[10px] font-bold text-cyan-400 tracking-widest uppercase">Start Your Project</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Let's build something <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">extraordinary.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg text-slate-400 font-light max-w-2xl mx-auto">
            Whether you need a high-performance web ecosystem, custom software, or cloud infrastructure, our engineering team is ready to deliver.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Contact Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="lg:col-span-2 space-y-8">
            <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white mb-6">Direct Contact</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Email Us</p>
                  <a href="mailto:hello@stacklabx.com" className="text-lg text-cyan-400 hover:text-cyan-300 transition-colors">hello@stacklabx.com</a>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Call Us (UK)</p>
                  <a href="tel:+447360503891" className="text-lg text-cyan-400 hover:text-cyan-300 transition-colors">+44 7360 503891</a>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white mb-6">Global Headquarters</h3>
              <p className="text-slate-300 leading-relaxed font-light mb-4">
                176-178 City Road<br />
                Cardiff, CF24 3JF<br />
                United Kingdom
              </p>
            </div>
          </motion.div>

          {/* Right Column: The Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="lg:col-span-3">
            <div className="p-8 md:p-12 rounded-[32px] bg-[#05070E]/80 border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.1)] backdrop-blur-2xl">
              <h3 className="text-2xl font-bold text-white mb-8">Project Inquiry</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                    <input required type="text" className="w-full bg-[#020308] border border-white/10 focus:border-cyan-500 rounded-xl px-4 py-3 text-white outline-none transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                    <input required type="email" className="w-full bg-[#020308] border border-white/10 focus:border-cyan-500 rounded-xl px-4 py-3 text-white outline-none transition-colors" placeholder="john@company.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Company / Organization</label>
                  <input type="text" className="w-full bg-[#020308] border border-white/10 focus:border-cyan-500 rounded-xl px-4 py-3 text-white outline-none transition-colors" placeholder="Optional" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Project Details</label>
                  <textarea required rows={5} className="w-full bg-[#020308] border border-white/10 focus:border-cyan-500 rounded-xl px-4 py-3 text-white outline-none transition-colors resize-none" placeholder="Tell us about your project goals, timeline, and budget..." />
                </div>

                <button 
                  type="submit" 
                  disabled={formStatus !== "idle"}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                  {formStatus === "loading" ? (
                    <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  ) : formStatus === "success" ? (
                    "Message Sent Successfully!"
                  ) : (
                    "Submit Inquiry"
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}