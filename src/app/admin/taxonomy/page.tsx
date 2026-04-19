import Link from "next/link";
import db from "@/lib/db";
import { createCategory, deleteCategory } from "@/app/actions/taxonomy";

// Forces Next.js to always fetch fresh data when loading this page
export const dynamic = 'force-dynamic';

export default async function TaxonomyDashboard() {
  // Fetch all categories, including how many posts are attached to them
  const categories = await db.category.findMany({
    include: {
      _count: { select: { posts: true } },
      parent: true,
    },
    orderBy: { name: 'asc' }
  });

  return (
    <main className="min-h-screen bg-[#020202] text-white p-6 md:p-12 font-sans selection:bg-purple-500/30 relative overflow-hidden">
      
      {/* Cinematic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-[10s]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-600/10 blur-[100px] rounded-full mix-blend-screen animate-pulse duration-[8s] delay-1000"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.03]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link href="/admin" className="text-[10px] font-bold text-slate-500 hover:text-purple-400 uppercase tracking-widest transition-colors inline-flex items-center gap-2">
            <span>&larr;</span> Return to Nerve Center
          </Link>
        </div>

        {/* Dashboard Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 mb-10 gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.4)] relative border border-white/20">
              <span className="text-3xl font-black text-white relative z-10">🗂️</span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-purple-500"></span>
                </span>
                <p className="text-[10px] font-mono text-purple-400 uppercase tracking-[0.3em]">Taxonomy Engine Active</p>
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Category Matrix.</h1>
            </div>
          </div>
        </header>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: Create Category Form */}
          <div className="lg:col-span-1">
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl sticky top-8">
              <h2 className="text-sm font-black uppercase tracking-widest text-white mb-6 border-b border-white/5 pb-4">Inject New Category</h2>
              
              <form action={createCategory} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">Display Name</label>
                  <input type="text" name="name" required placeholder="e.g. Cloud Architecture" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-purple-500 transition-all shadow-inner placeholder:text-slate-700"/>
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">URL Slug</label>
                  <input type="text" name="slug" required placeholder="e.g. cloud-architecture" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-slate-300 font-mono text-sm focus:outline-none focus:border-purple-500 transition-all shadow-inner placeholder:text-slate-700"/>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">Parent Category (Optional)</label>
                  <select name="parentId" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 transition-all appearance-none cursor-pointer">
                    <option value="none">-- None (Top Level) --</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">Description (SEO)</label>
                  <textarea name="description" rows={3} placeholder="Brief meta description..." className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-slate-300 text-sm focus:outline-none focus:border-purple-500 transition-all shadow-inner resize-none placeholder:text-slate-700"></textarea>
                </div>

                <button type="submit" className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-black px-6 py-4 text-xs uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] mt-4">
                  <span className="relative z-10 flex items-center justify-center gap-2">Deploy Category <span className="text-lg leading-none">+</span></span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: Manage Existing Categories */}
          <div className="lg:col-span-2">
            <div className="bg-[#050505] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                <h2 className="text-sm font-black uppercase tracking-widest text-white">Active Database Nodes</h2>
                <span className="text-[10px] font-mono text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full border border-purple-400/20">
                  {categories.length} NODES
                </span>
              </div>

              <div className="divide-y divide-white/5">
                {categories.length === 0 ? (
                  <div className="p-12 text-center">
                    <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">No categories detected in matrix.</p>
                  </div>
                ) : (
                  categories.map((cat) => (
                    <div key={cat.id} className="p-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                      
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                          {cat.parent && (
                            <span className="text-[8px] font-black uppercase tracking-widest bg-white/10 text-slate-400 px-2 py-0.5 rounded-md">
                              Sub of: {cat.parent.name}
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-mono text-slate-500">/{cat.slug}</p>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                          <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Attached Assets</span>
                          <span className="text-lg font-bold text-slate-300">{cat._count.posts}</span>
                        </div>
                        
                        {/* FIX: Form Action explicitly binds the Server ID without triggering client errors */}
                        <form action={deleteCategory.bind(null, cat.id)}>
                          <button type="submit" disabled={cat._count.posts > 0} className="w-10 h-10 rounded-full border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-red-400 cursor-pointer disabled:cursor-not-allowed" title={cat._count.posts > 0 ? "Cannot delete category with active posts" : "Delete Category"}>
                            ✕
                          </button>
                        </form>
                      </div>

                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}