import Link from "next/link";
import db from "@/lib/db"; 
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export default async function ProtocolsDashboard() {
  // 1. FETCH ONLY ACTIVE POSTS (isDeleted: false)
  const posts = await db.post.findMany({ 
    where: { isDeleted: false }, 
    orderBy: { createdAt: 'desc' } 
  });

  // 2. SOFT DELETE: ARTICLE (Moves to Recovery Vault)
  async function trashArticle(formData: FormData) {
    "use server";
    const slug = formData.get("slug") as string;
    if (!slug) return;
    try {
      await db.post.update({ where: { slug }, data: { isDeleted: true } });
      revalidatePath("/admin/protocols");
      revalidatePath("/admin");
      revalidatePath("/admin/trash");
      revalidatePath("/blog");
    } catch (error) { 
      console.error("TRASH_FAILURE:", error); 
    }
  }

  return (
    <main className="w-full max-w-6xl mx-auto">
      
      {/* --- BREADCRUMB --- */}
      <div className="mb-8">
        <Link href="/admin" className="text-[10px] font-bold text-slate-500 hover:text-cyan-400 uppercase tracking-widest transition-colors inline-block">
          &larr; Back to Overview
        </Link>
      </div>

      {/* --- MODULE HEADER --- */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500"></span>
          </span>
          <p className="text-[10px] font-mono tracking-[0.2em] text-purple-400 uppercase">Content Matrix Active</p>
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter">Data <span className="text-slate-600">Protocols.</span></h1>
      </div>

      {/* --- CONTENT PAYLOADS LIST --- */}
      <section className="bg-[#050505] border border-white/10 rounded-3xl shadow-2xl overflow-hidden mb-12">
        <div className="p-8 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <span className="text-purple-500 text-xs">⌘</span>
            </div>
            <h2 className="text-sm font-black text-white uppercase tracking-widest">Active Data Payloads</h2>
          </div>
          <span className="text-[10px] font-mono text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full border border-purple-400/20">
            {posts.length} PROTOCOLS ONLINE
          </span>
        </div>

        <div className="divide-y divide-white/5">
          {posts.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-6">No intelligence protocols deployed.</p>
              <Link href="/admin/editor" className="text-[10px] font-bold bg-white text-black px-6 py-3 rounded hover:bg-cyan-400 transition-colors uppercase tracking-[0.2em]">
                Inject Payload
              </Link>
            </div>
          ) : (
            posts.map((post: any) => (
              <div key={post.slug} className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.02] transition-colors">
                
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-[10px] font-mono text-slate-500">{new Date(post.createdAt).toLocaleDateString('en-GB')}</span>
                    <span className="text-[9px] font-black uppercase tracking-widest bg-white/5 text-slate-400 px-3 py-1 rounded-full border border-white/10">
                      /{post.slug}
                    </span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="text-xl font-bold text-slate-200 hover:text-white transition-colors line-clamp-1" dangerouslySetInnerHTML={{ __html: post.title }} />
                </div>

                <div className="flex items-center gap-6">
                  {/* EDIT LINK */}
                  <Link 
                    href={`/admin/editor/${post.slug}`} 
                    className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-widest transition-colors flex items-center gap-2"
                  >
                    Edit <span>✎</span>
                  </Link>

                  <Link 
                    href={`/blog/${post.slug}`} 
                    target="_blank"
                    className="text-[10px] font-bold text-blue-400 hover:text-cyan-300 uppercase tracking-widest transition-colors flex items-center gap-2"
                  >
                    Inspect Live <span>↗</span>
                  </Link>
                  
                  <form action={trashArticle}>
                    <input type="hidden" name="slug" value={post.slug} />
                    <button type="submit" className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.2em] px-5 py-2.5 rounded-lg border border-orange-400/20 hover:bg-orange-500 hover:text-white transition-all shadow-[0_0_15px_rgba(249,115,22,0)] hover:shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                      Trash Asset
                    </button>
                  </form>
                </div>

              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}