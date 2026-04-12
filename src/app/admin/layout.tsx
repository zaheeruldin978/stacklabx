import React from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    // REMOVED pt-20: The layout now snaps to the very top of the window
    <div className="flex min-h-screen bg-[#000000] text-slate-200 selection:bg-blue-600/30">
      
      {/* --- THE COMMAND SIDEBAR --- */}
      {/* CHANGED: top-20 to top-0, and height to h-screen */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col gap-8 hidden md:flex bg-[#0a0a0a] sticky top-0 h-screen overflow-y-auto z-40">
        
        {/* BRANDING */}
        <div className="text-xl font-bold tracking-tighter text-white">
          STACKLAB<span className="text-blue-500">X</span> <span className="text-[10px] uppercase opacity-50 tracking-widest ml-1">Nerve Center</span>
        </div>
        
        {/* NAVIGATION MATRIX */}
        <nav className="flex flex-col gap-1 flex-1">
          
          <Link href="/admin" className="px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-all border border-transparent hover:border-white/10 group flex items-center gap-3">
            <span className="text-blue-500 group-hover:scale-110 transition-transform">⌖</span> Overview
          </Link>

          <div className="pt-6 pb-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest px-4">Modules</div>
          
          <Link href="/admin/telemetry" className="px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-all border border-transparent hover:border-white/10 group flex items-center gap-3">
            <span className="text-emerald-500 group-hover:scale-110 transition-transform">⌖</span> Client Telemetry
          </Link>
          
          <Link href="/admin/protocols" className="px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-all border border-transparent hover:border-white/10 group flex items-center gap-3">
            <span className="text-purple-500 group-hover:scale-110 transition-transform">⌘</span> Data Protocols
          </Link>

          <Link href="/admin/editor" className="px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-all border border-transparent hover:border-white/10 group flex items-center gap-3">
            <span className="text-cyan-500 group-hover:scale-110 transition-transform">+</span> Inject Payload
          </Link>

          <div className="pt-6 pb-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest px-4">System</div>
          
          <Link href="/admin/trash" className="px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all border border-transparent hover:border-red-500/20 group flex items-center gap-3">
            <span className="text-red-500 group-hover:scale-110 transition-transform">⊗</span> Recovery Vault
          </Link>

        </nav>

        {/* SYSTEM STATUS */}
        <div className="pt-6 border-t border-white/5 text-[9px] font-mono text-slate-500 uppercase tracking-widest text-center mt-auto">
          StacklabX Infrastructure <br/> System Active
        </div>

      </aside>
      
      {/* --- MAIN CONTENT INJECTION --- */}
      <main className="flex-1 relative w-full">
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* CHANGED: top-20 to top-0 */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/5 blur-[150px] rounded-full"></div>
        </div>
        
        <div className="relative z-10 p-8 md:p-12">
          {children}
        </div>
      </main>
      
    </div>
  );
}