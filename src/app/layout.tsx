import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import CommandPalette from "../components/ui/CommandPalette";

export const metadata: Metadata = {
  title: "StacklabX | Global Enterprise Architecture & AI Pipelines",
  description: "Architecting military-grade web applications and autonomous AI systems. 34 Specialized IT protocols and 88 technical engineering insights.",
  keywords: ["AI Automation", "Enterprise Architecture", "Next.js Development", "n8n Workflows", "Cloud Infrastructure"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // SEO JSON-LD Schema for zero competitors
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "StacklabX",
    "url": "https://stacklabx.com",
    "logo": "https://stacklabx.com/logo.png",
    "description": "High-performance enterprise engineering and business automation firm.",
    "sameAs": ["https://twitter.com/stacklabx", "https://linkedin.com/company/stacklabx"]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#000000] text-white selection:bg-cyan-500/30 selection:text-white antialiased" suppressHydrationWarning>
        
        <nav className="fixed top-0 w-full z-50 bg-[#000000]/80 backdrop-blur-xl border-b border-white/[0.03]">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="text-white font-black tracking-tighter text-xl flex items-center gap-3 group">
              <div className="w-5 h-5 bg-white rounded-sm group-hover:bg-cyan-400 transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.2)]"></div>
              STACKLABX
            </Link>
            
            <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
              <Link href="/services" className="hover:text-white transition-colors">Protocols</Link>
              <Link href="/blog" className="hover:text-white transition-colors">Insights</Link>
              <Link href="/academy" className="hover:text-white transition-colors flex items-center gap-2">
                Academy <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[8px] border border-blue-500/20">BETA</span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <button className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-slate-500 hover:text-white transition-all font-mono text-[10px]">
                <span className="text-cyan-500">❯</span> SEARCH 
                <kbd className="bg-black border border-white/10 px-1.5 py-0.5 rounded text-[8px]">⌘K</kbd>
              </button>
              <Link href="/services" className="px-6 py-2.5 bg-white text-black text-[10px] font-black uppercase tracking-[0.25em] rounded-sm hover:bg-cyan-400 transition-colors">
                Initialize
              </Link>
            </div>
          </div>
        </nav>

        <main className="flex-1">
          <CommandPalette />
          {children}
        </main>

        <footer className="bg-[#010101] border-t border-white/[0.03] pt-32 pb-12 mt-auto relative z-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20 border-b border-white/[0.03] pb-20">
              <div className="col-span-1 md:col-span-2">
                <h2 className="text-white font-black tracking-tighter text-2xl mb-6">STACKLABX</h2>
                <p className="text-slate-500 text-sm leading-relaxed max-w-sm font-light">
                  Architecting high-frequency infrastructure for global market leaders. From London to Gujranwala, we build the systems that refuse to fail.
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold tracking-[0.2em] uppercase text-[9px] mb-8">Infrastructure</h4>
                <ul className="space-y-4 text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                  <li><Link href="/services" className="hover:text-cyan-400 transition-colors">Service Directory</Link></li>
                  <li><Link href="/blog" className="hover:text-cyan-400 transition-colors">Technical Insights</Link></li>
                  <li><Link href="/academy" className="hover:text-cyan-400 transition-colors">Academy Portal</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold tracking-[0.2em] uppercase text-[9px] mb-8">Control</h4>
                <ul className="space-y-4 text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                  <li><Link href="/admin" className="hover:text-cyan-400 transition-colors">Nerve Center</Link></li>
                  <li><Link href="/status" className="hover:text-cyan-400 transition-colors">Global Status</Link></li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between text-[9px] text-slate-700 font-black uppercase tracking-[0.3em]">
              <p>© {new Date().getFullYear()} STACKLABX CLOUD. ALL SYSTEMS NOMINAL.</p>
              <div className="flex items-center gap-3 text-emerald-500 mt-6 md:mt-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></span>
                NETWORK: ACTIVE
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}