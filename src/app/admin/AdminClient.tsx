"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import LogoutButton from "./LogoutButton";

export default function AdminClient({ telemetry }: { telemetry: any }) {
  const [isStoring, setIsStoring] = useState(false);
  const [dbMessage, setDbMessage] = useState("");

  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const handlePermanentStore = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsStoring(true);
    setDbMessage("Connecting to WordPress...");
    
    try {
      const response = await fetch("/api/sync", {
        method: "POST",
        headers: { "Authorization": "Bearer stacklabx-secure-sync-2026" }
      });
      const data = await response.json();
      if (response.ok) {
        setDbMessage(`✅ ${data.message}`);
      } else {
        setDbMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setDbMessage("❌ Error: Database connection failed.");
    } finally {
      setIsStoring(false);
    }
  };

  // Highly colorful stat cards
  const statCards = [
    { 
      label: "Total Posts", value: telemetry.totalAssets, color: "blue", 
      bgWash: "from-blue-500/10 to-transparent", borderHover: "hover:border-blue-500/50",
      icon: <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
    },
    { 
      label: "Published", value: telemetry.publishedAssets, color: "emerald", 
      bgWash: "from-emerald-500/10 to-transparent", borderHover: "hover:border-emerald-500/50",
      icon: <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
    },
    { 
      label: "Drafts", value: telemetry.draftAssets, color: "fuchsia", 
      bgWash: "from-fuchsia-500/10 to-transparent", borderHover: "hover:border-fuchsia-500/50",
      icon: <svg className="w-5 h-5 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
    },
    { 
      label: "Server Uptime", value: telemetry.uptime, color: "cyan", 
      bgWash: "from-cyan-500/10 to-transparent", borderHover: "hover:border-cyan-500/50",
      icon: <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    }
  ];

  return (
    <div className="relative w-full h-full p-6 md:p-10 lg:p-12">
      
      {/* 1. VIBRANT AMBIENT BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.1, 1] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vh] bg-gradient-to-bl from-blue-600/30 to-fuchsia-600/20 blur-[150px] rounded-full mix-blend-screen transform-gpu"
        />
        <motion.div 
          animate={{ opacity: [0.1, 0.25, 0.1], scale: [1, 1.1, 1] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-gradient-to-tr from-cyan-600/20 to-emerald-600/10 blur-[150px] rounded-full mix-blend-screen transform-gpu"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col gap-10 pb-20">
        
        {/* 2. HEADER */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Admin Dashboard</h1>
            <p className="text-sm text-slate-400 font-light">Manage your content, leads, and system telemetry.</p>
          </motion.div>
          
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Server Region</span>
              <span className="text-xs font-bold text-cyan-400">{telemetry.serverRegion}</span>
            </div>
            <LogoutButton />
          </motion.div>
        </header>

        {/* 3. COLORFUL TELEMETRY PILLS */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statCards.map((stat, i) => (
            <motion.div variants={fadeUp} key={i} className={`bg-[#04050A] border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-[20px] p-6 relative overflow-hidden group transition-all duration-300 ${stat.borderHover}`}>
              <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b ${stat.bgWash} opacity-60 pointer-events-none group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <div className="flex items-center justify-between mb-3 relative z-10">
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{stat.label}</p>
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight relative z-10 drop-shadow-md">{stat.value}</h3>
            </motion.div>
          ))}
        </motion.div>

        {/* 4. VIBRANT BENTO GRID */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN: CORE MODULES */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* MODULE A: Write New Article */}
            <motion.div variants={fadeUp}>
              <Link href="/admin/editor" className="group block relative bg-[#04050A] border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] hover:border-blue-500/50 rounded-[28px] p-8 md:p-10 transition-all duration-300 overflow-hidden h-full flex flex-col">
                <div className="absolute right-0 bottom-0 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full translate-x-1/4 translate-y-1/4 group-hover:bg-blue-500/30 transition-colors duration-700 pointer-events-none"></div>
                
                {/* Vibrant Solid Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 relative z-10 shadow-[0_0_20px_rgba(59,130,246,0.4)] group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-6 h-6 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </div>
                
                <h2 className="text-3xl font-bold mb-2 text-white tracking-tight relative z-10 group-hover:text-blue-400 transition-colors">Write New Article</h2>
                <p className="text-base text-slate-400 font-light leading-relaxed max-w-xl relative z-10 flex-grow">Open the rich-text editor to write, format, and publish new blog posts directly to your live website.</p>
                
                <div className="mt-8 relative z-10 flex items-center justify-between pt-6 border-t border-white/10 group-hover:border-blue-500/30 transition-colors">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)] flex items-center gap-2 transition-colors">
                    Open Editor <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </span>
                  <span className="hidden md:block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status: Ready</span>
                </div>
              </Link>
            </motion.div>

            {/* Split Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* MODULE B: Manage Content */}
              <motion.div variants={fadeUp}>
                <Link href="/admin/protocols" className="group block relative bg-[#04050A] border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] hover:border-fuchsia-500/50 rounded-[28px] p-7 transition-all duration-300 overflow-hidden flex flex-col h-full">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-fuchsia-500/10 blur-3xl group-hover:bg-fuchsia-500/20 transition-colors duration-500 rounded-full pointer-events-none"></div>
                  
                  {/* Vibrant Solid Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center mb-5 relative z-10 shadow-[0_0_20px_rgba(217,70,239,0.4)] group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-5 h-5 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-white group-hover:text-fuchsia-400 transition-colors tracking-tight relative z-10">Manage Content</h2>
                  <p className="text-sm text-slate-400 font-light leading-relaxed mb-8 relative z-10 flex-grow">Edit posts, manage categories, or delete old content from your database.</p>
                  
                  <div className="mt-auto text-[11px] font-bold text-fuchsia-400 uppercase tracking-widest flex items-center gap-2 relative z-10">
                    View Database <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </Link>
              </motion.div>

              {/* MODULE C: Sync Engine */}
              <motion.div variants={fadeUp}>
                <div className="group relative bg-[#04050A] border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] hover:border-emerald-500/50 rounded-[28px] p-7 transition-all duration-300 overflow-hidden flex flex-col h-full">
                  <div className="absolute top-0 left-0 w-40 h-40 bg-emerald-500/10 blur-3xl group-hover:bg-emerald-500/20 transition-colors duration-500 rounded-full pointer-events-none"></div>
                  
                  {/* Vibrant Solid Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center mb-5 relative z-10 shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-5 h-5 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-white group-hover:text-emerald-400 transition-colors tracking-tight relative z-10">WordPress Sync</h2>
                  <p className="text-sm text-slate-400 font-light leading-relaxed mb-5 relative z-10 flex-grow">Pull latest articles from WordPress into your local DB for zero-latency loading.</p>
                  
                  {dbMessage && (
                    <div className="text-[10px] font-bold text-emerald-400 mb-4 h-6 relative z-10 bg-emerald-500/10 px-3 py-1 rounded-md inline-block w-max">
                      {dbMessage}
                    </div>
                  )}

                  <button onClick={handlePermanentStore} disabled={isStoring} className="mt-auto w-max text-[10px] font-bold uppercase tracking-widest text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 px-5 py-2.5 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center gap-2 relative z-10 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                    {isStoring ? "Syncing Data..." : "Run Database Sync"} 
                    {!isStoring && <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>}
                  </button>
                </div>
              </motion.div>

            </div>
          </div>

          {/* RIGHT COLUMN: RECENT POSTS */}
          <motion.div variants={fadeUp} className="bg-[#04050A] border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] rounded-[28px] p-8 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white flex items-center gap-2">
                <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Recent Activity
              </h3>
              <Link href="/admin/protocols" className="text-[10px] font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-md">View All</Link>
            </div>

            <div className="flex-1 flex flex-col gap-3">
              {telemetry.recentDeployments.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 rounded-[16px] bg-white/[0.02] border border-white/5">
                  <svg className="w-6 h-6 text-slate-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">No recent posts</p>
                </div>
              ) : (
                telemetry.recentDeployments.map((post: any, i: number) => (
                  <div key={i} className="group flex flex-col p-4 rounded-[16px] hover:bg-white/[0.04] transition-colors border border-white/5 hover:border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md ${post.status === 'PUBLISHED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-fuchsia-500/20 text-fuchsia-400'}`}>
                        {post.status}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
                        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <a href={`/blog/${post.slug}`} target="_blank" className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1" dangerouslySetInnerHTML={{ __html: post.title }}></a>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  <span className="text-xs font-black text-white">ZA</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white">System Admin</p>
                  <p className="text-[10px] font-bold text-emerald-400">Authenticated Session</p>
                </div>
              </div>
            </div>

          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}