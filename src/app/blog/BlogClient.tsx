"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================================
// THE RECURSIVE DROPDOWN COMPONENT (Handles N-Level Depth)
// ============================================================================
const RecursiveMenuItem = ({ item, activeCategory, setActiveCategory, closeMainDropdown }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  
  const isSelfOrChildActive = useMemo(() => {
    const checkActive = (node: any): boolean => {
      if (node.name === activeCategory) return true;
      if (node.children) return node.children.some(checkActive);
      return false;
    };
    return checkActive(item);
  }, [item, activeCategory]);

  return (
    <div 
      className="relative group/menuitem"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setActiveCategory(item.name);
          if (!hasChildren) closeMainDropdown();
        }}
        className={`w-full flex items-center justify-between px-5 py-3 text-sm font-medium transition-all duration-200 border-l-2 ${
          isSelfOrChildActive 
            ? "border-[#00E5FF] bg-white/10 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]" 
            : "border-transparent text-slate-300 hover:bg-white/5 hover:text-white"
        }`}
      >
        <span className="truncate pr-4">{item.name}</span>
        
        {hasChildren && (
          <svg className={`w-4 h-4 transition-transform duration-300 ${isHovered ? "text-white -translate-x-1" : "text-slate-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        )}
      </button>

      <AnimatePresence>
        {hasChildren && isHovered && (
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute right-full top-[-8px] mr-2 w-[240px] bg-[#0a0f1a]/95 backdrop-blur-3xl border border-white/10 rounded-[16px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50 py-3"
          >
            {item.children.map((child: any) => (
              <RecursiveMenuItem 
                key={child.id} 
                item={child} 
                activeCategory={activeCategory} 
                setActiveCategory={setActiveCategory} 
                closeMainDropdown={closeMainDropdown}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function BlogClient({ posts, categories }: { posts: any[], categories: any[] }) {
  // Filters State
  const [activeCategory, setActiveCategory] = useState<string>("All Publications");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // UI State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 1. Get all valid categories based on the infinite tree selection
  const activeCategoryFamilyNames = useMemo(() => {
    if (activeCategory === "All Publications") return [];
    let targetNode: any = null;
    const findNode = (nodes: any[]) => {
      for (const n of nodes) {
        if (n.name === activeCategory) targetNode = n;
        if (n.children && !targetNode) findNode(n.children);
      }
    };
    findNode(categories);
    if (!targetNode) return [activeCategory];
    const names: string[] = [];
    const extractNames = (node: any) => {
      names.push(node.name);
      if (node.children) node.children.forEach(extractNames);
    };
    extractNames(targetNode);
    return names;
  }, [activeCategory, categories]);

  // 2. Apply both Category AND Search Filters
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = activeCategory === "All Publications" || (post.category?.name && activeCategoryFamilyNames.includes(post.category.name));
      const matchesSearch = searchQuery === "" || 
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, activeCategoryFamilyNames, searchQuery]);

  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <main className="relative min-h-screen selection:bg-[#0066FF]/30 bg-[#020408] pb-32 font-sans overflow-x-hidden">
      
      {/* ========================================== */}
      {/* SHARP AMBIENT BACKGROUND WITH ENHANCED COLORS */}
      {/* ========================================== */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Deep Blue Glow Top Right */}
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vh] bg-[#0066FF]/15 blur-[150px] rounded-full mix-blend-screen transform-gpu" />
        {/* Subtle Violet Glow Center Left to add depth */}
        <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vh] bg-fuchsia-600/5 blur-[150px] rounded-full mix-blend-screen transform-gpu" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-[15vh]">
        
        {/* ========================================== */}
        {/* HERO SECTION & TOP-RIGHT MEGA MENU         */}
        {/* ========================================== */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-10 gap-8">
          
          {/* Left Side: Professional, Colorful Headings */}
          <div className="max-w-3xl w-full">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#0066FF]/20 bg-[#0066FF]/10 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00E5FF]"></span>
                </span>
                <span className="text-[10px] font-bold text-[#00E5FF] tracking-widest uppercase">Knowledge Base</span>
              </div>
            </motion.div>
            
            {/* VIBRANT BRAND GRADIENT TEXT */}
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-5xl sm:text-6xl md:text-[5rem] font-bold tracking-tight pb-2 mb-6 leading-[1.05] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 drop-shadow-xl">
               Popular Publications.
            </motion.h1>
            
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl drop-shadow-md">
              Step-by-step guides, architectural breakdowns, and expert strategies to help you scale your digital operations securely.
            </motion.p>
          </div>

          {/* Right Side: The Mega Menu ONLY */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="relative z-50 w-full lg:w-auto flex flex-col lg:items-end">
            <div className="relative w-full lg:w-[280px]" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 px-6 py-4 rounded-[20px] bg-gradient-to-b from-[#0a0f1a]/80 to-[#0a0f1a]/40 backdrop-blur-2xl border border-white/10 hover:border-[#0066FF]/50 hover:from-[#0066FF]/10 hover:to-transparent text-white font-bold text-sm transition-all duration-300 shadow-[0_10px_40px_rgba(0,102,255,0.1)] hover:shadow-[0_10px_40px_rgba(0,102,255,0.2)] w-full justify-between group h-[72px]"
              >
                <div className="flex flex-col items-start leading-tight overflow-hidden">
                  <span className="text-[9px] text-[#00E5FF] uppercase tracking-[0.2em] font-black mb-1 drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">
                    Categories
                  </span>
                  <span className="truncate max-w-[140px] md:max-w-[170px] text-slate-200 group-hover:text-white transition-colors text-[14px]">
                    {activeCategory}
                  </span>
                </div>
                <div className={`flex-shrink-0 w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center transition-all duration-300 ${isDropdownOpen ? "rotate-180 bg-[#0066FF] border-[#0066FF] text-white shadow-[0_0_15px_rgba(0,102,255,0.5)]" : "text-slate-300 group-hover:bg-white/10"}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 top-[calc(100%+8px)] w-full lg:w-[280px] bg-[#0a0f1a]/95 backdrop-blur-3xl border border-white/10 rounded-[20px] shadow-[0_40px_80px_rgba(0,0,0,0.8)] z-50 py-3"
                  >
                    <button 
                      onClick={() => { setActiveCategory("All Publications"); setIsDropdownOpen(false); }}
                      className={`w-[calc(100%-16px)] mx-2 text-left px-4 py-3 rounded-xl text-sm font-bold transition-all mb-2 ${activeCategory === "All Publications" ? "bg-[#0066FF] text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}
                    >
                      All Publications
                    </button>

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-2"></div>

                    {categories?.map((parent) => (
                      <RecursiveMenuItem 
                        key={parent.id} 
                        item={parent} 
                        activeCategory={activeCategory} 
                        setActiveCategory={setActiveCategory} 
                        closeMainDropdown={() => setIsDropdownOpen(false)}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* ========================================== */}
        {/* SEPARATOR LINE                             */}
        {/* ========================================== */}
        <div className="w-full h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-8"></div>

        {/* ========================================== */}
        {/* LOWER SECTION: RESULTS BADGE & SEARCH BAR  */}
        {/* ========================================== */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 relative z-40">
          
          {/* Left: Live Data Badge */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0a0f1a]/60 border border-white/5 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] w-max" suppressHydrationWarning>
            <div className="relative flex items-center justify-center w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-60 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00E5FF]"></span>
            </div>
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.2em]">
              {filteredPosts.length} <span className="text-slate-500 font-medium">Result{filteredPosts.length !== 1 ? 's' : ''}</span>
            </span>
          </motion.div>

          {/* Right: Vibrant Glowing Search Bar */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="relative w-full sm:w-[320px]">
            {/* The Gradient Border Wrapper */}
            <div className="p-[1.5px] rounded-full bg-gradient-to-r from-[#0066FF]/40 via-purple-500/30 to-[#00E5FF]/40 hover:from-[#0066FF]/60 hover:to-[#00E5FF]/60 focus-within:from-[#0066FF] focus-within:to-[#00E5FF] transition-all duration-500 shadow-[0_0_15px_rgba(0,102,255,0.1)] focus-within:shadow-[0_0_30px_rgba(0,229,255,0.3)]">
              {/* The Inner Input Container */}
              <div className="relative h-full w-full bg-[#0a0f1a]/90 backdrop-blur-xl rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-[#00E5FF]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Search publications..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent py-3.5 pl-11 pr-10 text-white placeholder-slate-400 font-medium text-sm transition-all outline-none"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </motion.div>

        </div>

        {/* ========================================== */}
        {/* THE ARTICLE GRID (Hydration Safe)          */}
        {/* ========================================== */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div key={post.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
                <div className="relative group bg-white/[0.02] backdrop-blur-3xl border border-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-[24px] p-6 transition-all duration-300 overflow-hidden h-full flex flex-col hover:border-[#0066FF]/50 hover:bg-[#0066FF]/5">
                  <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10"><span className="sr-only">Read {post.title}</span></Link>
                  <div className="h-48 w-full rounded-[16px] overflow-hidden relative mb-6 border border-white/5 bg-[#020408]">
                    {post.imageUrl ? (
                      <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-90" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#0066FF]/20 to-[#00E5FF]/20 flex items-center justify-center">
                        <svg className="w-8 h-8 text-[#0066FF]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-3 relative z-20">
                    <span className="text-[9px] font-bold text-[#0066FF] uppercase tracking-widest bg-[#0066FF]/10 px-2 py-1 rounded-sm border border-[#0066FF]/20">{post.category?.name || "Uncategorized"}</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block" suppressHydrationWarning>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#00E5FF] transition-colors line-clamp-2 relative z-20" dangerouslySetInnerHTML={{ __html: post.title }} suppressHydrationWarning />
                  <div className="text-sm text-slate-400 font-light leading-relaxed mb-6 flex-grow line-clamp-3 prose-p:m-0 relative z-20 pointer-events-none" dangerouslySetInnerHTML={{ __html: post.excerpt || "Read the full technical breakdown inside..." }} suppressHydrationWarning />
                  <div className="mt-auto pt-5 border-t border-white/[0.06] flex items-center justify-between group-hover:border-[#0066FF]/20 transition-colors relative z-20">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 group-hover:text-[#00E5FF] transition-colors">Read Article</span>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#0066FF]/20 group-hover:border-[#0066FF]/50 transition-all duration-300 group-hover:translate-x-1">
                      <span className="text-white text-sm leading-none">&rarr;</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State / Not Found */}
        {filteredPosts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center border border-white/[0.06] rounded-[24px] bg-white/[0.01] mt-8 relative z-10 flex flex-col items-center justify-center">
            <svg className="w-16 h-16 text-slate-600 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-2xl font-bold text-white mb-2">No publications found</h3>
            <p className="text-slate-400 font-light text-base max-w-md">We couldn't find any articles matching your search criteria. Try adjusting your filters or clearing your search.</p>
            {(searchQuery !== "" || activeCategory !== "All Publications") && (
              <button 
                onClick={() => { setSearchQuery(""); setActiveCategory("All Publications"); }}
                className="mt-6 px-6 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-colors"
              >
                Clear all filters
              </button>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
}