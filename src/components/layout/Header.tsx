"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function GlobalHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

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
          ? "bg-[#020408]/80 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-4" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* 1. BRAND LOGO */}
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

        {/* 3. RIGHT SIDE: PRIMARY CTA */}
        <div className="flex items-center relative z-20">
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