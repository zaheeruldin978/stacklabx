import Link from "next/link";
import db from "../../lib/db";
import { revalidatePath } from "next/cache";
// Import our Client Components (ensure this path is correct)
import DeleteButton, { DeleteLeadButton } from "../../components/DeleteButton"; 

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // 1. FETCH ONLY ACTIVE ASSETS (isDeleted: false)
  const [leads, posts] = await Promise.all([
    db.lead.findMany({ where: { isDeleted: false }, orderBy: { createdAt: 'desc' } }),
    db.post.findMany({ where: { isDeleted: false }, orderBy: { createdAt: 'desc' } })
  ]);

  // 2. SOFT DELETE: ARTICLE (Moves to Recovery Vault)
  async function trashArticle(formData: FormData) {
    "use server";
    const slug = formData.get("slug") as string;
    if (!slug) return;
    try {
      await db.post.update({ where: { slug }, data: { isDeleted: true } });
      revalidatePath("/admin");
      revalidatePath("/admin/trash");
      revalidatePath("/blog");
    } catch (error) { console.error("TRASH_FAILURE:", error); }
  }

  // 3. SOFT DELETE: LEAD (Moves to Recovery Vault)
  async function trashLead(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (!id) return;
    try {
      await db.lead.update({ where: { id }, data: { isDeleted: true } });
      revalidatePath("/admin");
      revalidatePath("/admin/trash");
    } catch (error) { console.error("LEAD_TRASH_FAILURE:", error); }
  }

  return (
    <main className="w-full max-w-6xl mx-auto">
      
      {/* --- COMMAND HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <p className="text-[10px] font-mono tracking-[0.2em] text-emerald-400 uppercase">System Online & Active</p>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter">Command <span className="text-slate-600">Overview.</span></h1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12">
        
        {/* ==========================================
            MODULE 1: CLIENT TELEMETRY (LEADS)
            ========================================== */}
        <section className="bg-[#050505] border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <span className="text-emerald-500 text-xs">⌖</span>
              </div>
              <h2 className="text-sm font-black text-white uppercase tracking-widest">Target Telemetry</h2>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
              {leads.length} ACTIVE LEADS
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-slate-500 text-[10px] uppercase tracking-widest bg-black/40">
                  <th className="p-6 text-left font-bold">Target Identity (Email)</th>
                  <th className="p-6 text-left font-bold">Infrastructure Load</th>
                  <th className="p-6 text-left font-bold">Calculated ROI</th>
                  <th className="p-6 text-right font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-12 text-center text-slate-500 text-xs font-mono uppercase tracking-widest">No active leads.</td>
                  </tr>
                ) : (
                  leads.map((lead: any) => (
                    <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-6 font-bold text-sm text-slate-300">{lead.email}</td>
                      <td className="p-6 text-xs font-mono text-slate-500">
                        {lead.traffic ? <span className="text-cyan-400">{lead.traffic}K reqs</span> : "N/A"} <span className="mx-2 opacity-30">|</span> {lead.dbSize ? `${lead.dbSize}GB` : "N/A"}
                      </td>
                      <td className="p-6 text-emerald-400 font-mono text-sm font-bold">
                        ${((lead.standardCost || 0) - (lead.stacklabCost || 0)).toLocaleString()}
                      </td>
                      <td className="p-6 text-right">
                        <form action={trashLead}>
                          <input type="hidden" name="id" value={lead.id} />
                          <button type="submit" className="text-[10px] text-orange-500/50 hover:text-orange-400 uppercase tracking-widest font-bold transition-colors opacity-0 group-hover:opacity-100">
                            Trash
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* ==========================================
            MODULE 2: CONTENT PAYLOADS (ARTICLES)
            ========================================== */}
        <section className="bg-[#050505] border border-white/10 rounded-3xl shadow-2xl overflow-hidden mb-12">
          <div className="p-8 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <span className="text-blue-500 text-xs">⌘</span>
              </div>
              <h2 className="text-sm font-black text-white uppercase tracking-widest">Active Data Payloads</h2>
            </div>
            <span className="text-[10px] font-mono text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20">
              {posts.length} PROTOCOLS ONLINE
            </span>
          </div>

          <div className="divide-y divide-white/5">
            {posts.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">No intelligence protocols deployed.</p>
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

      </div>
    </main>
  );
}