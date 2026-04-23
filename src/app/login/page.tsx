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
    /* OVERLAP & SCROLL FIX: 
      1. 'fixed inset-0 z-[9999]' forces this page to cover the global Header/Footer.
      2. 'overflow-y-auto' allows the user to scroll up and down if the screen is small.
    */
    <main className="fixed inset-0 z-[9999] bg-[#020308] overflow-y-auto font-sans selection:bg-cyan-500/30">
      
      {/* Clean, Subtle Background Ambient Glows (Fixed to the screen) */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="absolute top-[10%] left-[20%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-cyan-600/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-[10%] right-[20%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-blue-600/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
      </div>

      {/* INNER WRAPPER: Handles perfect centering and spacing */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] w-full px-4 py-12">
        
        <div className="w-full max-w-[420px]">
          
          {/* Brand Header */}
          <div className="flex flex-col items-center mb-8">
            <Link href="/" className="group mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.2)] group-hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-500 p-[1.5px]">
                <div className="w-full h-full bg-[#020308] rounded-[14.5px] flex items-center justify-center">
                  <span className="text-white text-2xl font-black">S</span>
                </div>
              </div>
            </Link>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Admin Portal</h1>
            <p className="text-sm text-slate-400 font-light">Sign in to manage your StacklabX workspace</p>
          </div>

          {/* The Clean Form Card */}
          <div className="bg-[#05070E]/60 backdrop-blur-3xl border border-white/[0.08] rounded-[32px] p-8 shadow-2xl relative">
            
            {status === "error" && (
              <div className="absolute top-0 left-0 right-0 p-3 bg-red-500/10 border-b border-red-500/20 text-center rounded-t-[32px]">
                <p className="text-xs font-bold text-red-400 tracking-wide">Invalid credentials. Please try again.</p>
              </div>
            )}

            <form onSubmit={handleLogin} className={`space-y-5 ${status === "error" ? "mt-4" : ""}`}>
              
              {/* Username Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2 ml-1">Username</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={status === "loading" || status === "success"}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all disabled:opacity-50"
                  placeholder="Enter your username"
                  autoFocus
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2 ml-1">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={status === "loading" || status === "success"}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all disabled:opacity-50"
                  placeholder="••••••••••••"
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={!username || !password || status === "loading" || status === "success"}
                className={`w-full mt-4 flex items-center justify-center py-4 rounded-xl text-sm font-bold transition-all duration-300
                  ${status === "success" 
                    ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90 shadow-lg'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                {status === "idle" && "Sign In"}
                {status === "loading" && (
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {status === "error" && "Sign In"}
                {status === "success" && "Authenticated ✓"}
              </button>
            </form>
          </div>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link href="/" className="text-xs font-medium text-slate-500 hover:text-white transition-colors flex items-center justify-center gap-1">
              <span>&larr;</span> Back to Website
            </Link>
          </div>
          
        </div>
      </div>
    </main>
  );
}