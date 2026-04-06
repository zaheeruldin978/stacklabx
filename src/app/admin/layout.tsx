import React from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#000000] text-slate-200 selection:bg-blue-600/30">
      
      {/* --- THE COMMAND SIDEBAR --- */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col gap-8 hidden md:flex bg-[#0a0a0a] relative z-50">
        
        {/* BRANDING */}
        <div className="text-xl font-bold tracking-tighter text-white">
          STACKLAB<span className="text-blue-500">X</span> <span className="text-[10px] uppercase opacity-50 tracking-widest ml-1">Nerve Center</span>
        </div>
        
        {/* NAVIGATION MATRIX */}
        <nav className="flex flex-col gap-2 flex-1">
          
          <Link href="/admin" className="px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-all border border-transparent hover:border-white/10 group flex items-center gap-3">
            <span className="text-blue-500 group-hover:scale-110 transition-transform">⌖</span> Command Overview
          </Link>
          
          <Link href="/admin/editor" className="px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-all border border-transparent hover:border-white/10 group flex items-center gap-3">
            <span className="text-cyan-500 group-hover:scale-110 transition-transform">+</span> Initialize Protocol
          </Link>
          
          <Link href="/admin/trash" className="px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all border border-transparent hover:border-red-500/20 group flex items-center gap-3 mt-6">
            <span className="text-red-500 group-hover:scale-110 transition-transform">⊗</span> Recovery Vault
          </Link>
          
          <div className="px-4 py-3 text-sm font-medium text-slate-600 cursor-not-allowed flex items-center gap-3 mt-2 border border-transparent">
            <span className="opacity-50">◬</span> Analytics (Locked)
          </div>

        </nav>

        {/* SYSTEM STATUS */}
        <div className="pt-6 border-t border-white/5 text-[9px] font-mono text-slate-500 uppercase tracking-widest text-center">
          StacklabX Infrastructure <br/> System Active
        </div>

      </aside>
      
      {/* --- MAIN CONTENT INJECTION --- */}
      <main className="flex-1 relative overflow-y-auto h-screen">
        {/* Global Atmospheric Glow for the Admin Area */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/5 blur-[150px] rounded-full"></div>
        </div>
        
        {/* The children prop renders page.tsx, editor/page.tsx, or trash/page.tsx */}
        <div className="relative z-10 p-8">
          {children}
        </div>
      </main>
      
    </div>
  );
}