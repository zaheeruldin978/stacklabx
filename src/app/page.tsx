import Link from "next/link";
import LeadFunnel from "../components/sections/LeadFunnel";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#020408] selection:bg-cyan-500/30 selection:text-white overflow-x-hidden">
      
      {/* PHASE 1: SPATIAL ATMOSPHERE */}
      {/* High-end agencies use radial gradients to create "depth of field" */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full"></div>
      </div>

      {/* PHASE 2: HERO ARCHITECTURE */}
      <section className="relative pt-44 pb-32 px-6 flex flex-col items-center text-center z-10">
        {/* Sub-header Badge: Using 'Inter' tight tracking for a tech-heavy look */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-10 rounded-full border border-white/5 bg-white/[0.03] backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <p className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">
            Protocol: Active Implementation
          </p>
        </div>

        <h1 className="text-7xl md:text-[130px] font-black text-white tracking-[-0.05em] leading-[0.85] mb-10">
          Build the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20">
            Impossible.
          </span>
        </h1>

        <p className="max-w-2xl text-slate-400 text-lg md:text-2xl font-light leading-relaxed mb-14 tracking-tight">
          StacklabX engineers mission-critical web applications and <span className="text-white">autonomous AI systems</span> for enterprises that demand global-scale performance.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Link href="/services" className="group relative px-10 py-5 bg-white text-black font-black text-[11px] uppercase tracking-[0.2em] rounded-sm overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]">
            <span className="relative z-10">Initialize Project</span>
            <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </Link>
          <Link href="/blog" className="px-10 py-5 border border-white/10 text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 hover:border-white/20 transition-all">
            View Insights
          </Link>
        </div>
      </section>

      {/* PHASE 3: SYSTEM KPIS (Mathematical Balance) */}
      <section className="relative z-10 border-y border-white/5 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5 py-12">
          {[
            { label: "Uptime SLA", val: "99.9%" },
            { label: "Global Latency", val: "<40ms" },
            { label: "AI Efficiency", val: "+300%" },
            { label: "Security", val: "SOC-2" }
          ].map((kpi, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-4">
              <span className="text-3xl font-black text-white tracking-tighter">{kpi.val}</span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-2">{kpi.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PHASE 4: THE TRINITY PILLARS (The Core Grid) */}
      <section className="max-w-7xl mx-auto px-6 py-40 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <Link href="/services" className="group relative p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent hover:from-blue-500/50 transition-all duration-500">
            <div className="relative h-full p-10 rounded-[23px] bg-[#050505] overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-colors"></div>
              <div className="text-3xl mb-8 grayscale group-hover:grayscale-0 transition-all duration-500">🌐</div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Enterprise Services</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-10 font-light">Custom software engineering and high-performance cloud architecture.</p>
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-white transition-colors">
                <span>Explore Protocol</span>
                <span className="transform group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </div>
          </Link>

          <Link href="/blog" className="group relative p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent hover:from-cyan-500/50 transition-all duration-500">
            <div className="relative h-full p-10 rounded-[23px] bg-[#050505] overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] group-hover:bg-cyan-500/20 transition-colors"></div>
              <div className="text-3xl mb-8 grayscale group-hover:grayscale-0 transition-all duration-500">📖</div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Engineering Insights</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-10 font-light">Deep architectural breakdowns and technical leadership guides.</p>
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-white transition-colors">
                <span>Enter Archive</span>
                <span className="transform group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </div>
          </Link>

          <div className="relative p-[1px] rounded-3xl bg-white/5">
            <div className="relative h-full p-10 rounded-[23px] bg-black/40 backdrop-blur-sm overflow-hidden opacity-60">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)]"></div>
              <div className="text-3xl mb-8 opacity-40">🎓</div>
              <h3 className="text-2xl font-bold text-slate-400 mb-4 tracking-tight">Tutorial Academy</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-10 font-light">The ultimate learning engine for next-gen automation and dev-ops.</p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-800 animate-pulse"></span>
                In Development
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* PHASE 5: CONVERSION ENGINE */}
      <section className="relative z-10 pt-20 pb-40 border-t border-white/5 bg-gradient-to-b from-[#020408] to-black">
        <div className="max-w-4xl mx-auto px-6 text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">Ready to Scale?</h2>
          <p className="text-slate-500 text-lg md:text-xl font-light">Initiate a direct line to our architectural team.</p>
        </div>
        <LeadFunnel />
      </section>
      
    </main>
  );
}