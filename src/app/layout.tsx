import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "StacklabX | High-Performance Engineering",
  description: "Enterprise web applications and AI automations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#02040A] text-white selection:bg-cyan-500/30 selection:text-white" suppressHydrationWarning>
        
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-[#02040A]/80 backdrop-blur-md border-b border-white/[0.05]">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="text-white font-black tracking-tighter text-xl flex items-center gap-3 group">
              <div className="w-5 h-5 bg-white rounded-sm group-hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)]"></div>
              STACKLABX
            </Link>
            <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              <Link href="/services" className="hover:text-cyan-400 transition-colors">Services</Link>
              <Link href="/blog" className="hover:text-cyan-400 transition-colors">Insights</Link>
              <Link href="/academy" className="hover:text-cyan-400 transition-colors flex items-center gap-2 group/academy">
                Academy <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[8px] border border-blue-500/20">SOON</span>
              </Link>
              <Link href="/admin" className="hover:text-cyan-400 transition-colors">Nerve Center</Link>
            </div>
            <Link href="/services" className="px-6 py-2.5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-sm hover:bg-cyan-400 transition-colors">
              Initialize
            </Link>
          </div>
        </nav>

        {/* Main Content Area - This pushes the footer down */}
        <div className="flex-1">
          {children}
        </div>

        {/* --- GLOBAL ENTERPRISE FOOTER --- */}
        <footer className="bg-[#010205] border-t border-white/[0.05] pt-24 pb-12 mt-auto relative z-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-white/[0.05] pb-16">
              
              <div className="col-span-1 md:col-span-2">
                <Link href="/" className="text-white font-black tracking-tighter text-2xl flex items-center gap-3 mb-6">
                  <div className="w-5 h-5 bg-white rounded-sm"></div>
                  STACKLABX
                </Link>
                <p className="text-slate-500 text-sm leading-relaxed max-w-sm mb-8 font-light">
                  Global digital architecture and AI automation. We build the infrastructure that powers the modern enterprise. Based in the UK & Pakistan.
                </p>
              </div>

              <div>
                <h4 className="text-white font-bold tracking-widest uppercase text-[10px] mb-6">Architecture</h4>
                <ul className="space-y-4 text-sm text-slate-500 font-light">
                  <li><Link href="/services" className="hover:text-cyan-400 transition-colors">All Services</Link></li>
                  <li><Link href="/services/enterprise-web" className="hover:text-cyan-400 transition-colors">Enterprise Web</Link></li>
                  <li><Link href="/services/ai-workflow-automation" className="hover:text-cyan-400 transition-colors">AI Automation</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold tracking-widest uppercase text-[10px] mb-6">Nerve Center</h4>
                <ul className="space-y-4 text-sm text-slate-500 font-light">
                  <li><Link href="/blog" className="hover:text-cyan-400 transition-colors">Engineering Insights</Link></li>
                  <li><Link href="/academy" className="hover:text-cyan-400 transition-colors">Tutorial Academy</Link></li>
                  <li><Link href="/admin" className="hover:text-cyan-400 transition-colors">System Admin</Link></li>
                </ul>
              </div>

            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between text-[10px] text-slate-600 font-bold uppercase tracking-widest">
              <p>© {new Date().getFullYear()} STACKLABX CLOUD. ALL RIGHTS RESERVED.</p>
              <div className="flex items-center gap-2 mt-4 md:mt-0 text-emerald-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                SYSTEM STATUS: OPERATIONAL
              </div>
            </div>
          </div>
        </footer>
        
      </body>
    </html>
  );
}