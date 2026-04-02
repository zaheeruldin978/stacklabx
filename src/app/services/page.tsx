import Link from "next/link";
// Going up two levels (../../) to get out of /services and /app to reach /src/components
import LeadFunnel from "../../components/sections/LeadFunnel";

export default function ServicesPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 px-6 flex flex-col items-center relative overflow-hidden bg-[#020617]">
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-900/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="w-full max-w-5xl text-center mb-16 relative z-10">
        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm font-semibold tracking-wider uppercase mb-8 inline-block">
          ← Return to Core
        </Link>
        <h1 className="text-4xl md:text-6xl font-black mb-6 text-white">
          Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Solutions</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          High-performance infrastructure for the modern era.
        </p>
      </div>
      <div className="relative z-10 w-full">
        <LeadFunnel />
      </div>
    </main>
  );
}