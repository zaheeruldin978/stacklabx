"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPortal() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('from') || '/admin';

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    
    setStatus("loading");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setTimeout(() => {
          router.push(redirectUrl);
          router.refresh(); 
        }, 600);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000); 
      }
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    /* ELITE FIX 1: The Takeover Overlay 
       fixed inset-0 z-[9999] totally hides the global layout's Header and Footer.
       h-[100dvh] solves the mobile browser scrolling bug. 
       overflow-y-auto allows the page itself to scroll if the card is taller than the screen.
    */
    <main className="fixed inset-0 z-[9999] h-[100dvh] w-full bg-[#020202] overflow-y-auto text-white font-sans selection:bg-blue-500/30">
      
      {/* Cinematic Background Elements (Fixed so they don't scroll) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[20%] w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-[10s]"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-cyan-600/10 blur-[100px] rounded-full mix-blend-screen animate-pulse duration-[8s] delay-1000"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.03]"></div>
      </div>

      {/* ELITE FIX 2: The Scrollable Content Wrapper 
          min-h-full forces the wrapper to stretch to the bottom, allowing perfect centering.
          py-12 ensures there is always breathing room above and below the card on tiny screens.
      */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-full w-full py-12 px-4">
        
        {/* The Portal Card Container */}
        <div className="w-full max-w-md flex flex-col justify-center">
          
          {/* Brand Header */}
          <div className="text-center mb-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(37,99,235,0.4)] relative">
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-md"></div>
              <span className="text-3xl font-black text-white relative z-10 tracking-tighter">Sx</span>
            </div>
            <h1 className="text-3xl font-black tracking-tighter mb-2">Nerve Center</h1>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">Restricted Access Protocol</p>
          </div>

          {/* The Form */}
          <div className="bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden">
            
            {/* Top Edge Highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

            <form onSubmit={handleLogin} className="space-y-6">
              
              {/* Username Field */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Admin ID</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={status === "loading" || status === "success"}
                  className={`w-full bg-black/50 border rounded-xl px-5 py-4 text-white font-mono text-lg tracking-widest focus:outline-none transition-all shadow-inner placeholder:text-slate-700
                    ${status === "error" ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/30' : 'border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30'}
                    ${(status === "loading" || status === "success") ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  placeholder="system_admin"
                  autoFocus
                />
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Master Passcode</label>
                  {status === "error" && <span className="text-[9px] font-mono text-red-400 animate-pulse uppercase tracking-widest">Auth Failed</span>}
                </div>
                <div className="relative">
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={status === "loading" || status === "success"}
                    className={`w-full bg-black/50 border rounded-xl px-5 py-4 text-white font-mono text-lg tracking-widest focus:outline-none transition-all shadow-inner placeholder:text-slate-700
                      ${status === "error" ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/30' : 'border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30'}
                      ${(status === "loading" || status === "success") ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    placeholder="••••••••••••"
                  />
                  
                  {/* Visual Indicator inside input */}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-6 h-6">
                    {status === "idle" && <div className="w-2 h-2 rounded-full bg-white/20"></div>}
                    {status === "loading" && <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>}
                    {status === "error" && <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>}
                    {status === "success" && <svg className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={!username || !password || status === "loading" || status === "success"}
                className={`w-full relative group overflow-hidden rounded-xl font-black px-6 py-4 text-xs uppercase tracking-[0.2em] transition-all duration-300
                  ${status === "success" 
                    ? 'bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.4)]' 
                    : status === "error"
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(0,102,255,0.3)] hover:shadow-[0_0_30px_rgba(0,102,255,0.5)]'
                  }
                  disabled:opacity-70 disabled:cursor-not-allowed
                `}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {status === "idle" && "Initiate Handshake"}
                  {status === "loading" && "Decrypting..."}
                  {status === "error" && "Access Denied"}
                  {status === "success" && "Access Granted"}
                </span>
                {status === "idle" && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>}
              </button>
            </form>
          </div>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <Link href="/" className="text-[10px] font-bold text-slate-600 hover:text-white uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
              <span>&larr;</span> Return to Public Sector
            </Link>
          </div>
          
        </div>
      </div>
    </main>
  );
}