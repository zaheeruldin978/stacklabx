"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import LeadFunnel from "../../../components/sections/LeadFunnel";

export default function ArchitectureCalculator() {
  const [traffic, setTraffic] = useState(100);
  const [dbSize, setDbSize] = useState(50);
  const [computeType, setComputeType] = useState("serverless");

  const [standardCost, setStandardCost] = useState(0);
  const [stacklabCost, setStacklabCost] = useState(0);

  useEffect(() => {
    let baseComputeCost = computeType === "serverless" ? (traffic * 0.4) : (traffic * 0.15);
    let dbCost = dbSize * 1.5;
    
    const unoptimized = Math.floor(baseComputeCost + dbCost + 300);
    const optimized = Math.floor((baseComputeCost * 0.3) + (dbSize * 0.5) + 100); 

    setStandardCost(unoptimized);
    setStacklabCost(optimized);
  }, [traffic, dbSize, computeType]);

  return (
    <main className="min-h-screen bg-[#000000] text-white pt-32 pb-20 selection:bg-cyan-500/30">
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-screen"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="mb-16">
          <Link href="/" className="text-[10px] font-bold text-slate-500 hover:text-cyan-400 uppercase tracking-widest transition-colors mb-6 inline-block">
            &larr; Return to Global Network
          </Link>
          <div className="block mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Micro-SaaS Utility Tool
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight">
            Architecture <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">ROI Estimator.</span>
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg font-light">
            Calculate the exact monthly cost difference between standard cloud deployments and a custom-engineered StacklabX architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 bg-[#050505] border border-white/5 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-10 border-b border-white/5 pb-4">System Parameters</h3>
            
            <div className="mb-10">
              <label className="block text-sm font-bold text-white mb-4">Compute Infrastructure Protocol</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setComputeType("serverless")}
                  className={`p-4 rounded-xl border text-left transition-all duration-300 ${computeType === "serverless" ? "bg-blue-600/10 border-blue-500 shadow-[0_0_20px_rgba(0,102,255,0.2)]" : "bg-black border-white/10 hover:border-white/30"}`}
                >
                  <div className="text-xl mb-2">☁️</div>
                  <div className={`text-sm font-bold ${computeType === "serverless" ? "text-blue-400" : "text-white"}`}>Serverless (Vercel/AWS)</div>
                  <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">High scaling cost</div>
                </button>
                <button 
                  onClick={() => setComputeType("dedicated")}
                  className={`p-4 rounded-xl border text-left transition-all duration-300 ${computeType === "dedicated" ? "bg-cyan-500/10 border-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.2)]" : "bg-black border-white/10 hover:border-white/30"}`}
                >
                  <div className="text-xl mb-2">🖥️</div>
                  <div className={`text-sm font-bold ${computeType === "dedicated" ? "text-cyan-400" : "text-white"}`}>Dedicated Instances</div>
                  <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">High maintenance</div>
                </button>
              </div>
            </div>

            <div className="mb-10">
              <div className="flex justify-between items-end mb-4">
                <label className="text-sm font-bold text-white">Monthly API Requests / Traffic</label>
                <span className="font-mono text-cyan-400 font-bold">{traffic}K Requests</span>
              </div>
              <input 
                type="range" min="10" max="5000" step="10" 
                value={traffic} onChange={(e) => setTraffic(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[10px] text-slate-600 font-bold tracking-widest mt-2 uppercase">
                <span>10,000</span>
                <span>5,000,000+</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="text-sm font-bold text-white">Database Storage Volume</label>
                <span className="font-mono text-cyan-400 font-bold">{dbSize} GB</span>
              </div>
              <input 
                type="range" min="1" max="1000" step="1" 
                value={dbSize} onChange={(e) => setDbSize(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="bg-[#030303] border border-red-500/20 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[40px]"></div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400/80 mb-2">Unoptimized Industry Standard</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-2xl text-slate-500 font-light">$</span>
                <motion.span 
                  key={standardCost}
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  className="text-5xl font-black text-white tracking-tighter"
                >
                  {standardCost.toLocaleString()}
                </motion.span>
                <span className="text-sm text-slate-600 font-bold">/mo</span>
              </div>
              <p className="text-xs text-slate-500">Estimated cost using out-of-the-box managed services without caching or database optimization.</p>
            </div>

            <div className="bg-gradient-to-b from-blue-900/20 to-black border border-cyan-500/30 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_40px_rgba(0,229,255,0.1)]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 blur-[50px]"></div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span> StacklabX Architecture
              </p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-2xl text-cyan-500 font-light">$</span>
                <motion.span 
                  key={stacklabCost}
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-7xl font-black text-white tracking-tighter"
                >
                  {stacklabCost.toLocaleString()}
                </motion.span>
                <span className="text-sm text-cyan-600 font-bold tracking-widest uppercase ml-2">/mo</span>
              </div>
              <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black px-3 py-1 rounded uppercase tracking-widest mb-4">
                Saving ${(standardCost - stacklabCost).toLocaleString()}/mo
              </div>
              <p className="text-xs text-slate-400 font-light">Custom engineered multi-tier caching, dedicated hardware pools, and optimized query routing.</p>
            </div>

          </div>
        </div>

        <div className="mt-32 pt-20 border-t border-white/5 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-black tracking-tighter mb-4">Stop overpaying for compute.</h2>
          <p className="text-slate-400 mb-12">Submit your current architecture parameters below. Our engineering team will review your payload and design a high-throughput, low-cost transition plan.</p>
          
          {/* INJECTING TELEMETRY STATE DIRECTLY INTO THE FUNNEL */}
          <LeadFunnel telemetry={{ traffic, dbSize, computeType, standardCost, stacklabCost }} />
          
        </div>

      </div>
    </main>
  );
}