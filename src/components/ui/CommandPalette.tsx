"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import * as servicesDatabase from "../../lib/servicesData";

const extractSafeArray = (db: any): any[] => {
  if (!db) return [];
  if (Array.isArray(db)) return db;
  const values = Object.values(db);
  const foundArray = values.find(v => Array.isArray(v)) as any[];
  return foundArray || [];
};

const safeServices = extractSafeArray(servicesDatabase);

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD+K or CTRL+K
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      // Hard Escape Override on Window
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isMounted) return null;

  const filteredServices = safeServices
    .filter((service: any) => {
      if (!service) return false;
      const title = String(service.title || service.name || "").toLowerCase();
      return title.includes(query.toLowerCase());
    })
    .slice(0, 5);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999] cursor-crosshair"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-[95%] max-w-2xl bg-[#050505] border border-white/10 rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,1)] z-[1000] overflow-hidden"
          >
            <div className="flex items-center px-6 border-b border-white/5 bg-white/[0.01]">
              <span className="text-cyan-500 font-mono text-lg mr-4">❯</span>
              <input
                autoFocus
                type="text"
                placeholder="INITIATE SYSTEM SEARCH..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                // DIRECT ESCAPE OVERRIDE
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(false);
                  }
                }}
                className="w-full bg-transparent text-white placeholder-slate-700 py-7 outline-none font-mono text-xs tracking-widest uppercase"
              />
              <button onClick={() => setIsOpen(false)} className="text-[8px] font-black text-slate-600 border border-white/10 px-2 py-1 rounded hover:text-white transition-colors">ESC</button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto custom-scrollbar bg-black/40">
              {query === "" ? (
                // --- THE NEW QUICK ACTIONS MENU ---
                <div className="space-y-1">
                  <div className="px-4 py-3 text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1 border-b border-white/5">
                    Quick Actions
                  </div>
                  
                  {/* The Trojan Horse SaaS Tool */}
                  <Link href="/tools/architecture-calculator" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-4 rounded-xl hover:bg-emerald-500/10 hover:border-emerald-500/30 border border-transparent transition-colors group">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">🧮</span>
                      <div>
                        <div className="text-sm font-black text-white group-hover:text-emerald-400 tracking-widest uppercase">Architecture ROI Estimator</div>
                        <div className="text-[10px] text-slate-500 mt-1 font-light tracking-tight">Calculate cloud savings vs standard deployments.</div>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-emerald-500 border border-emerald-500/20 px-2 py-1 rounded bg-emerald-500/10">SAAS TOOL</span>
                  </Link>

                  {/* Services Directory */}
                  <Link href="/services" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-4 rounded-xl hover:bg-blue-600/10 hover:border-blue-500/30 border border-transparent transition-colors group">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">🌐</span>
                      <div>
                        <div className="text-sm font-black text-white group-hover:text-blue-400 tracking-widest uppercase">View Enterprise Protocols</div>
                        <div className="text-[10px] text-slate-500 mt-1 font-light tracking-tight">Explore all 34 architectural services.</div>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-slate-600">DIR</span>
                  </Link>

                  {/* Insights Archive */}
                  <Link href="/blog" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-4 rounded-xl hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-transparent transition-colors group">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">📖</span>
                      <div>
                        <div className="text-sm font-black text-white group-hover:text-cyan-400 tracking-widest uppercase">Search Technical Insights</div>
                        <div className="text-[10px] text-slate-500 mt-1 font-light tracking-tight">Read 88 articles on AI and engineering.</div>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-slate-600">DOCS</span>
                  </Link>
                </div>
              ) : (
                // --- SEARCH RESULTS ---
                <div className="space-y-2">
                  {filteredServices.length > 0 ? (
                    filteredServices.map((service: any, i) => (
                      <Link key={i} href={`/services/${service.slug}`} onClick={() => setIsOpen(false)} className="flex items-center justify-between p-5 rounded-xl hover:bg-white/[0.03] border border-transparent hover:border-white/5 transition-all group">
                        <div className="flex items-center gap-5">
                          <span className="text-2xl opacity-40 group-hover:opacity-100 transition-opacity">{service.icon || "⚡"}</span>
                          <div>
                            <div className="text-xs font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-widest">{service.title || service.name}</div>
                            <div className="text-[10px] text-slate-600 mt-1 font-light tracking-tight">{service.tagline}</div>
                          </div>
                        </div>
                        <span className="text-[9px] font-mono text-slate-800">EXECUTE</span>
                      </Link>
                    ))
                  ) : (
                    <div className="p-10 text-center font-mono text-[10px] text-slate-700 uppercase tracking-widest">No matching protocol found.</div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}