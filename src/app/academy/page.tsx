import Link from "next/link";
import { academyConfig } from "../../lib/academyData";

export default function AcademyPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 relative bg-[#020408]">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/5 blur-[120px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-white/5 bg-white/[0.02]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Knowledge Base</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-tight">
            StacklabX <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Academy.</span>
          </h1>
          <p className="text-slate-500 max-w-2xl text-lg font-light">
            Technical training for the next generation of engineers and automation specialists.
          </p>
        </header>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {academyConfig.map((course) => (
            <Link href={`/academy/${course.id}`} key={course.id} className="group relative p-[1px] rounded-3xl bg-white/5 hover:bg-blue-500/30 transition-all duration-500">
              <div className="relative h-full bg-[#050505] rounded-[23px] overflow-hidden">
                
                {/* Course Image Placeholder */}
                <div className="h-48 w-full bg-zinc-900 flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-40"></div>
                   <span className="text-4xl group-hover:scale-110 transition-transform duration-500">🎓</span>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[8px] font-black uppercase tracking-widest text-blue-400">
                      {course.category}
                    </span>
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                      {course.level}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed mb-8">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {course.duration}
                    </span>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                      Start Learning →
                    </span>
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