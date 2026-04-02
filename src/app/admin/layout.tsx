import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#000000] text-slate-200">
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col gap-8 hidden md:flex bg-[#0a0a0a]">
        <div className="text-xl font-bold tracking-tighter text-white">
          STACKLAB<span className="text-blue-500">X</span> <span className="text-[10px] uppercase opacity-50">Admin</span>
        </div>
        <nav className="flex flex-col gap-2">
          <div className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium border border-white/10 cursor-default">
            Overview
          </div>
          <div className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-300 cursor-not-allowed">
            Analytics (Locked)
          </div>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}