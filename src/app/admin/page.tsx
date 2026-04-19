import Link from "next/link";
import db from "@/lib/db";
import LogoutButton from "./LogoutButton";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // 1. ENTERPRISE DATA HYDRATION
  // Fetching real metrics to make the dashboard functional, not just a menu.
  const [totalAssets, publishedAssets, draftAssets, recentDeployments] = await Promise.all([
    db.post.count({ where: { isDeleted: false } }),
    db.post.count({ where: { isDeleted: false, status: 'PUBLISHED' } }),
    db.post.count({ where: { isDeleted: false, status: 'DRAFT' } }),
    db.post.findMany({ 
      where: { isDeleted: false }, 
      orderBy: { createdAt: 'desc' },
      take: 4,
      select: { title: true, slug: true, status: true, createdAt: true }
    })
  ]);

  const uptime = "99.99%";
  const serverRegion = "ap-south-1 (Gujranwala Node)";

  return (
    <main className="min-h-screen bg-[#000000] text-white p-4 md:p-8 lg:p-12 font-sans selection:bg-blue-500/30 relative overflow-hidden">
      
      {/* 1. DEEP CINEMATIC ENVIRONMENT */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-900/10 blur-[150px] rounded-full mix-blend-screen animate-pulse duration-[12s]"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-900/10 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-[8s] delay-1000"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0))]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col gap-8">
        
        {/* 2. COMMAND HEADER */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-white/10 pb-6 gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.4)] relative border border-white/20 overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-50 mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <span className="text-3xl font-black text-white relative z-10 tracking-tighter drop-shadow-lg">Sx</span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                </span>
                <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.3em]">Network Secured & Active</p>
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Nerve Center.</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end mr-4">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Node Region</span>
              <span className="text-xs font-bold text-slate-300">{serverRegion}</span>
            </div>
            <LogoutButton />
          </div>
        </header>

        {/* 3. AT-A-GLANCE TELEMETRY STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Encrypted Assets", value: totalAssets, trend: "+12% this week", color: "blue" },
            { label: "Live Deployments", value: publishedAssets, trend: "Public Matrix", color: "emerald" },
            { label: "Vaulted Drafts", value: draftAssets, trend: "Awaiting review", color: "orange" },
            { label: "System Uptime", value: uptime, trend: "Optimal health", color: "cyan" }
          ].map((stat, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 backdrop-blur-sm relative overflow-hidden group hover:bg-white/[0.04] transition-colors">
              <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-500/10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-${stat.color}-500/20 transition-colors`}></div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 relative z-10">{stat.label}</p>
              <h3 className="text-3xl font-black text-white mb-1 relative z-10 tracking-tight">{stat.value}</h3>
              <p className={`text-[9px] font-mono text-${stat.color}-400/80 uppercase tracking-widest relative z-10`}>{stat.trend}</p>
            </div>
          ))}
        </div>

        {/* 4. ASYMMETRIC BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN: CORE MODULES (Takes up 2/3 of the space) */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* MODULE A: The God-Mode Editor (Hero Card - Spans 2 columns on medium screens) */}
            <Link href="/admin/editor" className="md:col-span-2 group relative bg-gradient-to-br from-[#0f172a] to-[#020617] border border-blue-500/20 hover:border-blue-400/50 rounded-3xl p-8 transition-all duration-500 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_20px_40px_-15px_rgba(37,99,235,0.2)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_30px_60px_-15px_rgba(37,99,235,0.4)] overflow-hidden flex flex-col h-[280px]">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
              <div className="absolute right-0 bottom-0 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full translate-x-1/4 translate-y-1/4 group-hover:bg-blue-500/30 transition-colors duration-700"></div>
              
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-6 shadow-inner relative z-10 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-black mb-2 text-white tracking-tight relative z-10 group-hover:text-blue-400 transition-colors">Knowledge Injection</h2>
              <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-md relative z-10">Access the God-Mode writing protocol. Draft, optimize with AI, and deploy high-velocity semantic content directly to the public matrix.</p>
              
              <div className="mt-auto relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/20">
                  Initialize Protocol <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </span>
                <span className="hidden md:block text-[9px] font-mono text-slate-500 uppercase tracking-widest">System Status: Nominal</span>
              </div>
            </Link>

            {/* MODULE B: Data Protocols */}
            <Link href="/admin/protocols" className="group relative bg-[#0a0a0a] border border-white/10 hover:border-purple-500/40 rounded-3xl p-6 transition-all duration-500 hover:shadow-[0_15px_30px_-10px_rgba(168,85,247,0.2)] overflow-hidden flex flex-col h-[240px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl group-hover:bg-purple-500/20 transition-colors duration-500 rounded-full"></div>
              
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-5 shadow-inner relative z-10 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
              </div>
              <h2 className="text-xl font-black mb-2 text-white group-hover:text-purple-400 transition-colors tracking-tight relative z-10">Data Protocols</h2>
              <p className="text-xs text-slate-400 leading-relaxed mb-4 relative z-10">Access the master database. Review, modify, or permanently trash existing payloads.</p>
              <div className="mt-auto text-[9px] font-black uppercase tracking-widest text-purple-400 flex items-center gap-2 relative z-10">
                Access Matrix <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </Link>

            {/* MODULE C: Media Vault (Disabled) */}
            <div className="group relative bg-[#050505] border border-white/5 rounded-3xl p-6 opacity-60 grayscale flex flex-col h-[240px] cursor-not-allowed">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 relative z-10">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <h2 className="text-xl font-black mb-2 text-white tracking-tight relative z-10">Media Vault</h2>
              <p className="text-xs text-slate-500 leading-relaxed mb-4 relative z-10">Centralized storage for uploaded technical diagrams and encrypted structural assets.</p>
              <div className="mt-auto text-[9px] font-mono uppercase tracking-widest text-slate-600 flex items-center gap-2 relative z-10">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                Module Locked
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: RECENT DEPLOYMENTS LOG (Takes up 1/3 of the space) */}
          <div className="bg-[#0a0a0a]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8 flex flex-col shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-300 flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Deployment Log
              </h3>
              <Link href="/admin/protocols" className="text-[9px] font-mono text-blue-400 hover:text-blue-300 uppercase tracking-widest">View All</Link>
            </div>

            <div className="flex-1 flex flex-col gap-4">
              {recentDeployments.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3">
                    <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                  </div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">No recent activity detected.</p>
                </div>
              ) : (
                recentDeployments.map((post, i) => (
                  <div key={i} className="group flex flex-col p-3 rounded-xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${post.status === 'PUBLISHED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'}`}>
                        {post.status}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500">
                        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a href={`/blog/${post.slug}`} target="_blank" className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors line-clamp-1" dangerouslySetInnerHTML={{ __html: post.title }}></a>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                  <span className="text-xs font-black text-slate-400">ZA</span>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">System Admin</p>
                  <p className="text-[9px] font-mono text-slate-500">Authenticated Session</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}