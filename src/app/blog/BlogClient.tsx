"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogClient({ posts, categories }: { posts: any[], categories: any[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All Publications");
  
  // State for tracking which Mega Menu is currently open
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  // Filter posts logic
  const filteredPosts = activeCategory === "All Publications" 
    ? posts 
    : posts.filter(post => post.category?.name === activeCategory);

  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <main className="relative min-h-screen overflow-hidden selection:bg-[#0066FF]/30 bg-[#020408] pb-32 font-sans">
      
      {/* SHARP AMBIENT BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vh] bg-[#0066FF]/10 blur-[150px] rounded-full mix-blend-screen transform-gpu" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-[15vh]">
        
        {/* HERO SECTION */}
        <div className="max-w-4xl mb-12">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#0066FF]/20 bg-[#0066FF]/10 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00E5FF]"></span>
              </span>
              <span className="text-[10px] font-bold text-[#00E5FF] tracking-widest uppercase">Knowledge Base</span>
            </div>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-5xl sm:text-7xl font-bold tracking-tight text-white pb-2 mb-6 drop-shadow-sm">
             Industry Insights.
          </motion.h1>
          
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl">
            Expert articles, architectural breakdowns, and strategic B2B guides to help you scale your digital operations.
          </motion.p>
        </div>

        {/* ========================================== */}
        {/* THE ENTERPRISE MEGA MENU */}
        {/* ========================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mb-12 border-b border-white/10 pb-6">
          
          <div className="flex items-center justify-between">
            {/* HORIZONTAL NAVIGATION BAR */}
            <div className="flex flex-wrap items-center gap-2 md:gap-4 relative">
              
              {/* "All Publications" Button */}
              <button 
                onClick={() => setActiveCategory("All Publications")}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                  activeCategory === "All Publications" 
                    ? "bg-[#0066FF] border-[#0066FF] text-white shadow-[0_0_20px_rgba(0,102,255,0.4)]" 
                    : "bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:border-white/30"
                }`}
              >
                All
              </button>

              {/* Dynamic Categories with Hover Mega Menus */}
              {categories.map((parent) => {
                const hasChildren = parent.children && parent.children.length > 0;
                
                return (
                  <div 
                    key={parent.id} 
                    className="relative group"
                    onMouseEnter={() => setHoveredMenu(parent.id)}
                    onMouseLeave={() => setHoveredMenu(null)}
                  >
                    {/* The Parent Button */}
                    <button 
                      onClick={() => setActiveCategory(parent.name)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                        activeCategory === parent.name || (hasChildren && parent.children.some((c:any) => c.name === activeCategory))
                          ? "bg-[#0066FF] border-[#0066FF] text-white shadow-[0_0_20px_rgba(0,102,255,0.4)]" 
                          : "bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:border-white/30 hover:bg-white/5"
                      }`}
                    >
                      {parent.name}
                      {hasChildren && (
                        <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${hoveredMenu === parent.id ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </button>

                    {/* The Nested Dropdown (Mega Menu) */}
                    <AnimatePresence>
                      {hasChildren && hoveredMenu === parent.id && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 min-w-[200px] bg-[#0a0f1a] border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden z-50 backdrop-blur-3xl pt-2 pb-2"
                        >
                          <div className="flex flex-col">
                            {parent.children.map((child: any) => (
                              <button 
                                key={child.id}
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevents closing immediately if clicking quickly
                                  setActiveCategory(child.name);
                                  setHoveredMenu(null);
                                }}
                                className={`flex items-center w-full text-left px-5 py-3 text-sm font-semibold transition-colors ${
                                  activeCategory === child.name 
                                    ? "text-[#00E5FF] bg-white/10 border-l-2 border-[#00E5FF]" 
                                    : "text-slate-300 hover:bg-white/5 hover:text-white hover:pl-6 border-l-2 border-transparent"
                                }`}
                              >
                                {child.name}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })}
            </div>

            {/* Results Counter */}
            <div className="text-sm font-mono text-slate-500 hidden md:block">
              {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''}
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* THE ARTICLE GRID */}
        {/* ========================================== */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div 
                key={post.id} 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <div className="relative bg-white/[0.02] backdrop-blur-3xl border border-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-[24px] p-6 transition-all duration-300 overflow-hidden h-full flex flex-col hover:border-[#0066FF]/50 hover:bg-[#0066FF]/5">
                    
                    {/* Image Container */}
                    <div className="h-48 w-full rounded-[16px] overflow-hidden relative mb-6 border border-white/5 bg-[#020408]">
                      {post.imageUrl ? (
                        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-90" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#0066FF]/20 to-[#00E5FF]/20 flex items-center justify-center">
                          <svg className="w-8 h-8 text-[#0066FF]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[9px] font-bold text-[#0066FF] uppercase tracking-widest bg-[#0066FF]/10 px-2 py-1 rounded-sm border border-[#0066FF]/20">
                        {post.category?.name || "Uncategorized"}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#00E5FF] transition-colors line-clamp-2" dangerouslySetInnerHTML={{ __html: post.title }} />
                    
                    <div 
                      className="text-sm text-slate-400 font-light leading-relaxed mb-6 flex-grow line-clamp-3 prose-p:m-0"
                      dangerouslySetInnerHTML={{ __html: post.excerpt || "Read the full technical breakdown inside..." }}
                    />

                    <div className="mt-auto pt-5 border-t border-white/[0.06] flex items-center justify-between group-hover:border-[#0066FF]/20 transition-colors">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 group-hover:text-[#00E5FF] transition-colors">
                        Read Article
                      </span>
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#0066FF]/20 group-hover:border-[#0066FF]/50 transition-all duration-300 group-hover:translate-x-1">
                        <span className="text-white text-sm leading-none">&rarr;</span>
                      </div>
                    </div>

                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center border border-white/[0.06] rounded-[24px] bg-white/[0.01] mt-8">
            <p className="text-slate-500 font-bold text-[10px] tracking-widest uppercase mb-2">No publications found</p>
            <p className="text-slate-400 font-light text-sm">There are currently no articles in this category.</p>
          </motion.div>
        )}
      </div>
    </main>
  );
}