import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import CommandPalette from "../components/ui/CommandPalette";
import VisibilityShield from "../components/VisibilityShield";

export const metadata: Metadata = {
  title: "StacklabX | Engineering The Impossible",
  description: "Architecting military-grade web applications, custom software ecosystems, and intelligent AI automation for enterprises that refuse to settle.",
  keywords: ["Web Ecosystems", "Custom Software", "Enterprise Cloud", "Headless Commerce", "AI Automation"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // SEO JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "StacklabX",
    "url": "https://stacklabx.com",
    "logo": "https://stacklabx.com/logo.png",
    "description": "High-performance software development and enterprise IT infrastructure.",
    "sameAs": ["https://twitter.com/stacklabx", "https://linkedin.com/company/stacklabx"]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#020308] text-white selection:bg-cyan-500/30 antialiased" suppressHydrationWarning>
        
        {/* --- BEAUTIFUL GLOBAL NAVBAR --- */}
        <VisibilityShield>
          <nav className="fixed w-full z-50 top-0 border-b border-white/5 bg-[#020308]/80 backdrop-blur-2xl shadow-sm">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
              
              {/* Premium Logo */}
              <Link href="/" className="font-semibold text-xl tracking-tight text-white flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)] p-[1px]">
                  <div className="w-full h-full bg-[#020308] rounded-[10px] flex items-center justify-center">
                    <span className="text-white text-sm font-black">S</span>
                  </div>
                </div>
                StacklabX
              </Link>
              
              {/* Desktop Links */}
              <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
                <Link href="/services" className="hover:text-cyan-400 transition-colors">Services</Link>
                <Link href="/portfolio" className="hover:text-cyan-400 transition-colors">Portfolio</Link>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">Why Us</Link>
                <Link href="/blog" className="hover:text-cyan-400 transition-colors">Insights</Link>
              </div>

              {/* Actions & Search */}
              <div className="flex items-center gap-4">
                <button className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all font-mono text-[10px] group">
                  <span className="text-cyan-500 group-hover:scale-110 transition-transform">❯</span> SEARCH 
                  <kbd className="bg-black border border-white/10 px-1.5 py-0.5 rounded text-[8px]">⌘K</kbd>
                </button>
                <Link href="/contact" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all">
                  Start Project
                </Link>
              </div>
            </div>
          </nav>
        </VisibilityShield>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1">
          <CommandPalette />
          {children}
        </main>

        {/* --- ORGANIZED GLOBAL FOOTER --- */}
        <VisibilityShield>
          <footer className="border-t border-white/5 bg-[#05070E] pt-20 pb-10 relative z-50 mt-auto shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                
                {/* Column 1: Brand & Newsletter */}
                <div className="md:col-span-2">
                  <Link href="/" className="font-semibold text-xl tracking-tight text-white flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                      <span className="text-white text-xs font-black">S</span>
                    </div>
                    StacklabX
                  </Link>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm font-light">
                    Innovating a better tech life. We deliver high-quality, reliable software solutions and IT services to help businesses grow worldwide.
                  </p>
                  <div className="max-w-sm">
                    <div className="flex gap-2">
                      <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="bg-[#020308] border border-white/10 rounded-xl px-5 py-3 text-sm flex-grow text-white focus:outline-none focus:border-cyan-500 transition-colors shadow-inner" 
                      />
                      <button className="bg-cyan-600 text-white px-6 rounded-xl font-semibold text-sm hover:bg-cyan-500 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                        Join
                      </button>
                    </div>
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
                  <h4 className="text-white font-bold text-xs tracking-widest mb-6 uppercase">Global Offices</h4>
                  <ul className="space-y-4 text-sm text-slate-400 font-light mb-8">
                    <li>London, United Kingdom</li>
                    <li>Punjab, Pakistan</li>
                  </ul>
                  <ul className="space-y-4 text-sm text-slate-400 font-light flex gap-5">
                    <li><a href="#" className="hover:text-cyan-400 transition-colors">Twitter</a></li>
                    <li><a href="#" className="hover:text-cyan-400 transition-colors">GitHub</a></li>
                    <li><a href="#" className="hover:text-cyan-400 transition-colors">LinkedIn</a></li>
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
        </VisibilityShield>

      </body>
    </html>
  );
}