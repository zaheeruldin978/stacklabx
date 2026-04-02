import { prisma } from "../../lib/prisma";
import Link from "next/link";

export default async function BlogPage() {
  // 1. Fetching all data directly from your local PostgreSQL (Zero Latency)
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative">
      <div className="absolute inset-0 w-full h-full bg-grid -z-10 opacity-30"></div>
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center md:text-left">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-6">
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 font-outline-2">Insights.</span>
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg font-light italic">
            Synchronized directly with the StacklabX Local Database.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.id} className="group block">
              <article className="bento-card h-full flex flex-col overflow-hidden hover:border-stacklab-cyan/40 transition-all duration-500 bg-[#050505]">
                
                {/* Image Container */}
                <div className="h-56 w-full overflow-hidden relative">
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt="Featured" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-60 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-stacklab-blue/20 to-black flex items-center justify-center font-mono text-[10px] text-slate-500 uppercase">
                      No Media Meta Found
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <span className="text-[10px] font-black text-stacklab-cyan uppercase tracking-[0.3em] mb-4 block">
                    {post.date}
                  </span>

                  {/* Title correctly decodes HTML entities */}
                  <h2 
                    className="text-2xl font-bold text-white mb-4 group-hover:text-stacklab-blue transition-colors leading-tight"
                    dangerouslySetInnerHTML={{ __html: post.title }}
                  />

                  {/* THE FIX: Stripped raw HTML to prevent React Hydration nesting errors */}
                  <p className="text-slate-500 text-sm font-light leading-relaxed mb-8 flex-1 line-clamp-2">
                    {post.excerpt 
                      ? post.excerpt.replace(/<[^>]+>/g, '').replace(/&hellip;/g, '...').replace(/&#8211;/g, '-')
                      : 'Read the full architectural breakdown inside...'}
                  </p>

                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest group-hover:text-stacklab-cyan transition-colors">
                      Enter Archive
                    </span>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-stacklab-cyan transition-all group-hover:translate-x-2">
                      <span className="text-white text-xs">→</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Failsafe if the database is empty */}
        {posts.length === 0 && (
          <div className="py-20 text-center bento-card border-dashed mt-10">
            <p className="text-slate-500 font-mono text-sm tracking-widest uppercase">
              Local database is empty. Please run the migration from the Nerve Center.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}