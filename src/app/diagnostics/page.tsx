"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { submitDiagnostic } from "./action";

export default function DiagnosticTool() {
  const [step, setStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  
  // Data State
  const [traffic, setTraffic] = useState("10");
  const [computeType, setComputeType] = useState("AWS / Cloud");
  const [email, setEmail] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  // Fake "Scanning" Animation Logic
  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setIsScanning(false);
            setStep(4); // Move to final capture step
            return 100;
          }
          return p + Math.floor(Math.random() * 15);
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  const handleStartScan = () => {
    setStep(3);
    setIsScanning(true);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("traffic", traffic);
    formData.append("computeType", computeType);

    const res = await submitDiagnostic(formData);
    if (res.success) {
      setIsComplete(true);
    }
  };

  return (
    <main className="min-h-screen bg-[#000] text-white pt-32 pb-20 selection:bg-blue-500/30 flex items-center justify-center font-sans relative overflow-hidden">
      
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 bg-grid opacity-20 z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-2xl w-full mx-auto px-6 relative z-10">
        
        {/* Navigation */}
        <Link href="/" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors mb-12 inline-flex items-center gap-2">
          <span>←</span> Return to Base
        </Link>

        <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative">
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-10">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${step === 3 ? 'bg-orange-400' : 'bg-blue-400'}`}></span>
              <span className={`relative inline-flex h-3 w-3 rounded-full ${step === 3 ? 'bg-orange-500' : 'bg-blue-500'}`}></span>
            </span>
            <p className="text-xs font-mono tracking-[0.2em] text-slate-400 uppercase">
              {step === 3 ? 'Analysis in Progress' : 'Infrastructure Audit Protocol'}
            </p>
          </div>

          {/* STEP 1: TRAFFIC */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl md:text-4xl font-black mb-4">What is your current monthly traffic?</h2>
              <p className="text-slate-400 mb-8">This helps us calculate your potential server load and database strain.</p>
              
              <input 
                type="range" min="1" max="500" value={traffic} 
                onChange={(e) => setTraffic(e.target.value)}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer mb-6"
              />
              <div className="text-4xl font-black text-blue-500 mb-10">{traffic}K <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Requests / Month</span></div>
              
              <button onClick={() => setStep(2)} className="w-full bg-white text-black font-black py-4 rounded uppercase tracking-widest hover:bg-slate-200 transition-colors">
                Next Parameter →
              </button>
            </div>
          )}

          {/* STEP 2: COMPUTE TYPE */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl md:text-4xl font-black mb-4">Current Hosting Architecture?</h2>
              <p className="text-slate-400 mb-8">Select the infrastructure currently powering your application.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {['AWS / Cloud', 'Vercel / Edge', 'Bare Metal', 'WordPress / Shared'].map((type) => (
                  <button 
                    key={type}
                    onClick={() => setComputeType(type)}
                    className={`p-4 border rounded-xl text-left font-bold transition-all ${computeType === type ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-white/10 text-slate-400 hover:border-white/30'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              
              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="px-6 py-4 border border-white/10 text-slate-400 rounded uppercase tracking-widest hover:bg-white/5 transition-colors font-bold text-xs">Back</button>
                <button onClick={handleStartScan} className="flex-1 bg-blue-600 text-white font-black py-4 rounded uppercase tracking-widest hover:bg-blue-500 transition-colors">
                  Initiate Scan
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SCANNING ANIMATION */}
          {step === 3 && (
            <div className="py-10 text-center animate-in fade-in duration-500">
              <div className="w-20 h-20 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin mx-auto mb-8"></div>
              <h2 className="text-2xl font-black mb-2 animate-pulse">Running Diagnostic Matrix...</h2>
              <p className="text-slate-400 font-mono text-sm mb-8">Testing latency and scaling parameters for {traffic}K reqs on {computeType}</p>
              
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-300" style={{ width: `${scanProgress}%` }}></div>
              </div>
              <div className="mt-4 text-xs font-mono text-cyan-400 text-right">{scanProgress}% COMPLETE</div>
            </div>
          )}

          {/* STEP 4: LEAD CAPTURE */}
          {step === 4 && !isComplete && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="inline-block px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-widest rounded-full mb-6">
                Optimization Opportunities Found
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">Diagnostic Complete.</h2>
              <p className="text-slate-400 mb-8">We found critical areas where your current {computeType} setup is losing performance and money at {traffic}K requests. Enter your email to receive the full technical breakdown.</p>
              
              <form onSubmit={handleFinalSubmit} className="space-y-4">
                <input 
                  type="email" required placeholder="name@enterprise.com" 
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-blue-500 transition-all font-mono"
                />
                <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black py-4 rounded uppercase tracking-widest hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(0,102,255,0.3)]">
                  Unlock Full Report
                </button>
              </form>
            </div>
          )}

          {/* STEP 5: SUCCESS STATE */}
          {isComplete && (
            <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-emerald-500 text-3xl">✓</span>
              </div>
              <h2 className="text-3xl font-black mb-4 text-white">Report Generating.</h2>
              <p className="text-slate-400 mb-8">Our core engineering team has received your telemetry data. We are compiling your optimization plan and will transmit it to your email shortly.</p>
              <Link href="/" className="text-xs font-bold text-blue-400 uppercase tracking-widest hover:text-white transition-colors underline underline-offset-4">
                Return to Homepage
              </Link>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}