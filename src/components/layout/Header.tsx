"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Detect scroll to add glassmorphic background effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Blogs", href: "/blog" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${
        isScrolled 
          // REMOVED: border-b border-white/5 to eliminate the white line
          ? "bg-[#020408]/80 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-4" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* 1. RESTORED ORIGINAL BRAND LOGO */}
        <Link href="/" className="font-semibold text-xl tracking-tight text-white flex items-center gap-3 hover:opacity-80 transition-opacity relative z-20">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)] p-[1px]">
            <div className="w-full h-full bg-[#020308] rounded-[10px] flex items-center justify-center">
              <span className="text-white text-sm font-black">S</span>
            </div>
          </div>
          StacklabX
        </Link>

        {/* 2. DESKTOP NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/5 rounded-full px-2 py-1.5 backdrop-blur-md relative z-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-white/10 rounded-full shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* 3. RIGHT SIDE: SEARCH & CTA */}
        <div className="flex items-center gap-4 relative z-20">
          
          {/* Expanding Search Bar */}
          <div className="flex items-center justify-end relative">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "240px", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute right-0 flex items-center bg-[#0a0f1a] border border-white/10 rounded-full overflow-hidden"
                >
                  <div className="pl-4 pr-2 text-slate-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search StacklabX..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full bg-transparent py-2.5 text-sm text-white placeholder-slate-500 outline-none"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Search Toggle Button (Turns into an X when open) */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                isSearchOpen ? "bg-white/10 text-white" : "bg-transparent text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {isSearchOpen ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </button>
          </div>

          {/* Primary CTA */}
          <Link 
            href="/contact" 
            className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
          >
            Start Project
          </Link>

        </div>
      </div>
    </header>
  );
}