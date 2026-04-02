import Link from "next/link";
import { servicesConfig } from "../../lib/servicesData";

export default function ServicesPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden bg-[#02040A]">
      {/* Advanced Ambient Background Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-30 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-stacklab-blue via-stacklab-cyan to-transparent blur-[120px] rounded-full mix-blend-screen"></div>
      </div>
      
      {/* Signature Grid with Fade-out Mask */}
      <div 
        className="absolute inset-0 w-full h-full bg-grid -z-20 opacity-20" 
        style={{ 
          maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)', 
          WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)' 
        }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-24 text-center flex flex-col items-center">
          {/* Premium Glassmorphic Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2 mb-8 border border-white/10 rounded-full bg-white/[0.02] backdrop-blur-md shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-stacklab-cyan animate-pulse shadow-[0_0_10px_#00E5FF]"></span>
            <p className="text-[10px] font-black tracking-[0.25em] text-slate-300 uppercase">
              Global IT Infrastructure
            </p>
          </div>
          
          {/* FIXED: Bulletproof Tailwind Gradient for "Impossible." */}
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
            Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Impossible.</span>
          </h1>
          
          <p className="text-slate-400 max-w-2xl font-light text-lg md:text-xl leading-relaxed">
            Enterprise-grade architecture for companies that refuse to settle. Select a discipline below to initialize your project protocol.
          </p>
        </header>

        {/* Upgraded 3-Column Premium Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesConfig.map((service) => (
            <Link href={`/services/${service.slug}`} key={service.slug} className="group block h-full">
              
              {/* The "Vercel Trick" - A 1px padding wrapper creates a flawless gradient border */}
              <div className="relative h-full rounded-[24px] bg-gradient-to-b from-white/[0.08] to-transparent p-px overflow-hidden transition-all duration-500 group-hover:from-stacklab-blue/50 group-hover:to-stacklab-cyan/20 group-hover:shadow-[0_0_40px_-15px_rgba(0,102,255,0.4)] group-hover:-translate-y-2">

                {/* Internal Card Canvas */}
                <div className="relative h-full bg-[#050505] rounded-[23px] p-8 md:p-10 flex flex-col z-10 overflow-hidden">
                  
                  {/* Internal Hover Glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-stacklab-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl -z-10 rounded-full pointer-events-none"></div>

                  {/* Glass Icon Container */}
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:bg-stacklab-blue/[0.05] group-hover:border-stacklab-blue/30 transition-all duration-500 shadow-inner">
                    <span className="grayscale group-hover:grayscale-0 transition-all duration-500">{service.icon}</span>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-400 transition-all duration-300">
                    {service.title}
                  </h2>

                  <p className="text-slate-400 font-light text-sm leading-relaxed mb-10 flex-1">
                    {service.description}
                  </p>

                  {/* Premium Action Footer */}
                  <div className="mt-auto pt-6 border-t border-white/[0.05] flex items-center justify-between group-hover:border-stacklab-blue/20 transition-colors duration-500">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] group-hover:text-stacklab-cyan transition-colors duration-300">
                      View Protocol
                    </span>
                    
                    {/* Animated Arrow Button */}
                    <div className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/[0.05] flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                      <span className="text-slate-400 text-sm group-hover:text-white transition-colors group-hover:translate-x-1 transform duration-300">→</span>
                    </div>
                  </div>

                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}