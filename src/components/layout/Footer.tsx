"use client";

import Link from "next/link";
import { useState } from "react";

export default function GlobalFooter() {
  // State for the Newsletter Form
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  // Simulated API Submission
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    
    // Simulate a network request to your backend/CRM
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      // Reset the button after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    }, 1200);
  };

  return (
    <footer className="border-t border-white/5 bg-[#05070E] pt-20 pb-10 relative z-50 mt-auto shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & Newsletter */}
          <div className="md:col-span-2">
            <Link href="/" className="font-semibold text-xl tracking-tight text-white flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity w-max">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <span className="text-white text-xs font-black">S</span>
              </div>
              StacklabX
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm font-light">
              Innovating a better tech life. We deliver high-quality, reliable software solutions and IT services to help businesses grow worldwide.
            </p>
            <div className="max-w-sm">
              
              {/* FUNCTIONAL NEWSLETTER FORM */}
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="bg-[#020308] border border-white/10 rounded-xl px-5 py-3 text-sm flex-grow text-white focus:outline-none focus:border-cyan-500 transition-colors shadow-inner" 
                />
                <button 
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="min-w-[80px] flex items-center justify-center bg-cyan-600 text-white px-6 rounded-xl font-semibold text-sm hover:bg-cyan-500 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : status === "success" ? (
                    "Done!"
                  ) : (
                    "Join"
                  )}
                </button>
              </form>

            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-widest mb-6 uppercase">Platform</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-light">
              <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><Link href="/portfolio" className="hover:text-cyan-400 transition-colors">Our Portfolio</Link></li>
              <li><Link href="/services" className="hover:text-cyan-400 transition-colors">IT Services</Link></li>
              <li><Link href="/blog" className="hover:text-cyan-400 transition-colors">Insights & Blog</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Social */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-widest mb-6 uppercase">Our Office</h4>
            
            <ul className="space-y-2 text-sm text-slate-400 font-light mb-5">
              <li>176-178 City Road</li>
              <li>Cardiff, CF24 3JF</li>
              <li>United Kingdom</li>
            </ul>
            
            <div className="mb-8">
              <a 
                href="tel:+447360503891" 
                className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
              >
                +44 7360 503891
              </a>
            </div>

            {/* FUNCTIONAL SOCIAL LINKS */}
            <ul className="space-y-4 text-sm text-slate-400 font-light flex gap-5">
              <li>
                <a href="https://twitter.com/stacklabx" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://github.com/stacklabx" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/company/stacklabx" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 font-light">
          <p>Copyright &copy; {new Date().getFullYear()} StacklabX. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0 font-medium">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}