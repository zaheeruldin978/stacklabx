import React from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#020308] text-slate-200 selection:bg-cyan-500/30">
      
      {/* --- THE COMMAND SIDEBAR --- */}
      <aside className="w-64 border-r border-white/5 p-6 flex flex-col gap-8 hidden md:flex bg-[#010205] sticky top-0 h-screen overflow-y-auto z-40 shadow-2xl">
        
        {/* BRANDING */}
        <div className="flex items-center gap-3 mt-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <div className="w-[30px] h-[30px] bg-[#05070E] rounded-[7px] flex items-center justify-center">
              <span className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 to-blue-500">Sx</span>
            </div>
          </div>
          <div className="text-lg font-bold tracking-tight text-white">
            Stacklab<span className="text-cyan-500">X</span>
          </div>
        </div>
        
        {/* NAVIGATION MATRIX */}
        <nav className="flex flex-col gap-1.5 flex-1 mt-4">
          
          <Link href="/admin" className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-all group flex items-center gap-3">
            <svg className="w-4 h-4 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            Dashboard
          </Link>

          <div className="pt-6 pb-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest px-4">Operations</div>
          
          <Link href="/admin/telemetry" className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-all group flex items-center gap-3">
            <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            Leads & Contacts
          </Link>
          
          <Link href="/admin/protocols" className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-all group flex items-center gap-3">
            <svg className="w-4 h-4 text-fuchsia-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            Manage Content
          </Link>

          <Link href="/admin/editor" className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-all group flex items-center gap-3">
            <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            Write Article
          </Link>

          <div className="pt-6 pb-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest px-4">System</div>
          
          <Link href="/admin/trash" className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all group flex items-center gap-3">
            <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            Trash & Archives
          </Link>

        </nav>

        {/* SYSTEM STATUS */}
        <div className="pt-6 border-t border-white/5 mt-auto flex items-center gap-3 px-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <div className="text-[10px] font-medium text-slate-400">
            System Online
          </div>
        </div>

      </aside>
      
      {/* --- MAIN CONTENT INJECTION --- */}
      <main className="flex-1 relative w-full flex flex-col">
        {children}
      </main>
      
    </div>
  );
}