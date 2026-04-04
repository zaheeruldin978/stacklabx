"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitLead, TelemetryData } from "../../app/actions/lead";

export default function LeadFunnel({ telemetry }: { telemetry?: TelemetryData }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "encrypting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("encrypting");

    const formData = new FormData();
    formData.append("email", email);

    // Transmit email + silent telemetry data to the backend
    await submitLead(formData, telemetry);

    setStatus("success");
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative group">
      <div className="absolute inset-0 bg-cyan-500/5 blur-[30px] rounded-full group-hover:bg-cyan-500/10 transition-colors duration-700 pointer-events-none"></div>
      
      <div className="relative bg-[#030303] border border-white/10 rounded-2xl p-2 shadow-2xl overflow-hidden">
        
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-500/50 animate-pulse"></div>
          </div>
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest ml-2">
            {telemetry ? "Protocol: Architecture Review" : "Protocol: Global Initialization"}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.form 
              key="form"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row gap-2 p-2"
            >
              <div className="relative flex-1 flex items-center">
                <span className="absolute left-4 text-cyan-500 font-mono text-lg">❯</span>
                <input 
                  type="email" 
                  required
                  placeholder="ENTER ENTERPRISE EMAIL..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-none text-white placeholder-slate-700 py-4 pl-10 pr-4 font-mono text-xs tracking-widest outline-none uppercase"
                />
              </div>
              <button 
                type="submit"
                className="bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] px-8 py-4 rounded-xl hover:bg-cyan-400 transition-colors"
              >
                Establish Link
              </button>
            </motion.form>
          )}

          {status === "encrypting" && (
            <motion.div 
              key="encrypting"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-4 p-8"
            >
              <span className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></span>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest animate-pulse">Encrypting Payload & Establishing Secure Channel...</span>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 border border-emerald-500/20">
                <span className="text-xl">✓</span>
              </div>
              <h4 className="text-white font-black uppercase tracking-widest mb-2">Channel Established</h4>
              <p className="text-slate-500 text-xs font-mono">Our core architectural team will contact you within 2 hours.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {telemetry && status === "idle" && (
          <div className="px-6 pb-4 pt-2">
             <div className="flex items-center gap-2 text-[8px] font-mono text-slate-600 uppercase tracking-widest">
               <span className="w-1 h-1 rounded-full bg-blue-500 animate-ping"></span>
               Telemetry Attached ({telemetry.traffic}K Req, {telemetry.dbSize}GB DB)
             </div>
          </div>
        )}
      </div>
    </div>
  );
}