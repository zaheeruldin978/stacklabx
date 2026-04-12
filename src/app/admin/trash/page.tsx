import Link from "next/link";
import db from "../../../lib/db";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export default async function TrashDashboard() {
  // Fetch ONLY deleted assets
  const [posts, leads] = await Promise.all([
    db.post.findMany({ where: { isDeleted: true }, orderBy: { createdAt: 'desc' } }),
    db.lead.findMany({ where: { isDeleted: true }, orderBy: { createdAt: 'desc' } })
  ]);

  // ==========================================
  // POST ACTIONS
  // ==========================================
  async function restoreArticle(formData: FormData) {
    "use server";
    const slug = formData.get("slug") as string;
    if (!slug) return;
    try {
      await db.post.update({ where: { slug }, data: { isDeleted: false } });
      revalidatePath("/admin/trash");
      revalidatePath("/admin");
      revalidatePath("/blog");
    } catch (error) { console.error("RESTORE_FAILURE:", error); }
  }

  async function nuclearPurgeArticle(formData: FormData) {
    "use server";
    const slug = formData.get("slug") as string;
    if (!slug) return;
    try {
      await db.post.delete({ where: { slug } });
      revalidatePath("/admin/trash");
    } catch (error) { console.error("NUCLEAR_FAILURE:", error); }
  }

  // ==========================================
  // LEAD ACTIONS
  // ==========================================
  async function restoreLead(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (!id) return;
    try {
      await db.lead.update({ where: { id }, data: { isDeleted: false } });
      revalidatePath("/admin/trash");
      revalidatePath("/admin");
    } catch (error) { console.error("RESTORE_LEAD_FAILURE:", error); }
  }

  async function nuclearPurgeLead(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (!id) return;
    try {
      await db.lead.delete({ where: { id } });
      revalidatePath("/admin/trash");
    } catch (error) { console.error("NUCLEAR_LEAD_FAILURE:", error); }
  }

  return (
    <main className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <Link href="/admin" className="text-[10px] font-bold text-slate-500 hover:text-cyan-400 uppercase tracking-widest transition-colors inline-block">
          &larr; Back to Nerve Center
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        <p className="text-[10px] font-mono tracking-[0.2em] text-red-500 uppercase">Quarantine Zone Active</p>
      </div>
      <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-12">Recovery <span className="text-slate-600">Vault.</span></h1>

      <div className="grid grid-cols-1 gap-12">
        {/* --- TRASHED ARTICLES --- */}
        <section className="bg-[#050505] border border-red-500/10 rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-red-500/10 bg-red-500/5 flex items-center justify-between">
            <h2 className="text-sm font-black text-red-400 uppercase tracking-widest flex items-center gap-3">
              <span>⌘</span> Trashed Payloads (Articles)
            </h2>
            <span className="text-[10px] font-mono text-red-400 bg-red-400/10 px-3 py-1 rounded-full border border-red-400/20">
              {posts.length} IN VAULT
            </span>
          </div>

          <div className="divide-y divide-white/5">
            {posts.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-xs font-mono uppercase tracking-widest">No articles in vault.</div>
            ) : (
              posts.map((post: any) => (
                <div key={post.slug} className="p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/[0.02] transition-colors">
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-mono text-slate-500">{new Date(post.createdAt).toLocaleDateString('en-GB')}</span>
                      <span className="text-[9px] font-black uppercase tracking-widest bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20 line-through">/{post.slug}</span>
                    </div>
                    <p className="text-lg font-bold text-slate-500 line-clamp-1" dangerouslySetInnerHTML={{ __html: post.title }} />
                  </div>
                  
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <form action={restoreArticle}>
                      <input type="hidden" name="slug" value={post.slug} />
                      <button type="submit" className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest px-4 py-2 rounded-lg border border-emerald-400/20 hover:bg-emerald-500 hover:text-white transition-all w-full md:w-auto">
                        Restore
                      </button>
                    </form>
                    <form action={nuclearPurgeArticle}>
                      <input type="hidden" name="slug" value={post.slug} />
                      <button type="submit" className="text-[10px] font-bold text-red-600 uppercase tracking-widest px-4 py-2 rounded-lg hover:text-red-400 underline underline-offset-4 transition-all w-full md:w-auto">
                        Delete Forever
                      </button>
                    </form>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* --- TRASHED LEADS --- */}
        <section className="bg-[#050505] border border-orange-500/10 rounded-3xl shadow-2xl overflow-hidden mb-20">
          <div className="p-8 border-b border-orange-500/10 bg-orange-500/5 flex items-center justify-between">
            <h2 className="text-sm font-black text-orange-400 uppercase tracking-widest flex items-center gap-3">
              <span>⌖</span> Trashed Telemetry (Leads)
            </h2>
            <span className="text-[10px] font-mono text-orange-400 bg-orange-400/10 px-3 py-1 rounded-full border border-orange-400/20">
              {leads.length} IN VAULT
            </span>
          </div>

          <div className="divide-y divide-white/5">
            {leads.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-xs font-mono uppercase tracking-widest">No leads in vault.</div>
            ) : (
              leads.map((lead: any) => (
                <div key={lead.id} className="p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/[0.02] transition-colors">
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-mono text-slate-500">{new Date(lead.createdAt).toLocaleDateString('en-GB')}</span>
                      <span className="text-[9px] font-black uppercase tracking-widest bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/20 line-through">{lead.email}</span>
                    </div>
                    <p className="text-sm font-bold text-slate-500">
                      ROI: ${((lead.standardCost || 0) - (lead.stacklabCost || 0)).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <form action={restoreLead}>
                      <input type="hidden" name="id" value={lead.id} />
                      <button type="submit" className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest px-4 py-2 rounded-lg border border-emerald-400/20 hover:bg-emerald-500 hover:text-white transition-all w-full md:w-auto">
                        Restore
                      </button>
                    </form>
                    <form action={nuclearPurgeLead}>
                      <input type="hidden" name="id" value={lead.id} />
                      <button type="submit" className="text-[10px] font-bold text-orange-600 uppercase tracking-widest px-4 py-2 rounded-lg hover:text-orange-400 underline underline-offset-4 transition-all w-full md:w-auto">
                        Delete Forever
                      </button>
                    </form>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}