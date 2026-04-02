import Link from "next/link";

export default function AcademyPage() {
  const categories = [
    { name: "Full-Stack Web", desc: "Next.js, React, and Node architectures.", icon: "🌐" },
    { name: "AI & Automation", desc: "Python, LLMs, and workflow pipelines.", icon: "🤖" },
    { name: "Databases", desc: "PostgreSQL, Prisma, and data modeling.", icon: "🗄️" }
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative">
      <div className="absolute inset-0 w-full h-full bg-grid -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <div className="inline-block px-4 py-1 mb-6 border border-cyan-500/20 rounded-full bg-cyan-500/5 text-cyan-400 text-[10px] font-black uppercase tracking-widest">
            StacklabX Academy
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">Master the Stack.</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light">
            Free, enterprise-grade tutorials for developers who want to build the impossible. 
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <Link href={`/tutorials/${cat.name.toLowerCase().replace(/ /g, '-')}`} key={i}>
              <div className="bento-card p-8 h-full flex flex-col group cursor-pointer">
                <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">{cat.icon}</div>
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-stacklab-blue transition-colors">{cat.name}</h2>
                <p className="text-slate-400 text-sm mb-8 flex-1">{cat.desc}</p>
                <div className="pt-4 border-t border-white/5 text-[10px] font-black text-white uppercase tracking-widest flex justify-between items-center">
                  Enter Curriculum
                  <span className="group-hover:translate-x-2 transition-transform text-stacklab-cyan">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}