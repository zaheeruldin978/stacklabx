import { prisma } from "../../lib/prisma";
import { deleteLead } from "../actions/leadActions";
import { migrateWordPressToPostgres } from "../actions/migrate";
import { revalidatePath } from "next/cache";

export default async function AdminDashboard() {
  // 1. Fetching all data from your local PostgreSQL (Zero Latency)
  const [leads, posts] = await Promise.all([
    prisma.lead.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.post.findMany({ select: { id: true } }) // Just count for the KPI
  ]);

  const totalLeads = leads.length;
  const totalArticles = posts.length;

  // Server Action for the Migration Trigger
  async function triggerMigration() {
    "use server";
    await migrateWordPressToPostgres();
    revalidatePath("/admin");
    revalidatePath("/blog");
  }

  // Server Action for Deletion
  async function removeLead(id: string) {
    "use server";
    await deleteLead(id);
    revalidatePath("/admin");
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      
      {/* Header & System Controls */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter italic">NERVE CENTER</h1>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-[0.3em] mt-2">
            StacklabX Global Infrastructure
          </p>
        </div>
        
        {/* THE MIGRATION CONTROL */}
        <div className="flex gap-4">
          <form action={triggerMigration}>
            <button className="px-6 py-3 bg-stacklab-blue text-white text-[10px] font-black uppercase tracking-widest rounded-sm hover:bg-stacklab-cyan hover:text-black transition-all shadow-[0_0_20px_rgba(0,102,255,0.2)] active:scale-95">
              Sync WordPress Articles
            </button>
          </form>
          <div className="px-4 py-3 text-[10px] font-mono text-emerald-400 border border-emerald-500/20 rounded bg-emerald-500/5 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Status: Secure
          </div>
        </div>
      </header>

      {/* KPI Layer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bento-card p-8 group">
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] mb-2 font-bold group-hover:text-stacklab-cyan transition-colors">Captured Leads</p>
          <p className="text-5xl font-black text-white tracking-tighter">{totalLeads}</p>
        </div>
        <div className="bento-card p-8 group">
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] mb-2 font-bold group-hover:text-stacklab-cyan transition-colors">Migrated Articles</p>
          <p className="text-5xl font-black text-white tracking-tighter">{totalArticles}</p>
        </div>
        <div className="bento-card p-8 border-stacklab-blue/20">
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">Local DB Latency</p>
          <p className="text-5xl font-black text-stacklab-cyan tracking-tighter">0.4ms</p>
        </div>
      </div>

      {/* Data Management: Leads Table */}
      <div className="bento-card overflow-hidden !p-0 border-white/5 shadow-2xl bg-[#050505]">
        <div className="px-8 py-6 border-b border-white/5 bg-white/[0.02]">
          <h3 className="text-white font-bold uppercase tracking-widest text-xs">Inbound Global Inquiries</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-500 text-[10px] uppercase tracking-widest border-b border-white/5">
              <th className="px-8 py-5 font-bold">Client</th>
              <th className="px-8 py-5 font-bold">Channel</th>
              <th className="px-8 py-5 font-bold text-center">Protocol</th>
              <th className="px-8 py-5 font-bold text-right">Management</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-white/[0.02] transition-all group">
                <td className="px-8 py-5 text-sm font-semibold text-white tracking-tight">{lead.name}</td>
                <td className="px-8 py-5 text-sm text-slate-400 font-light">{lead.email}</td>
                <td className="px-8 py-5 text-center">
                  <span className="bg-stacklab-blue/10 text-stacklab-blue text-[9px] px-3 py-1 rounded-full border border-stacklab-blue/20 font-black uppercase">
                    {lead.service}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <form action={removeLead.bind(null, lead.id)}>
                    <button className="text-red-900 group-hover:text-red-500 text-[10px] font-black uppercase tracking-widest transition-all hover:scale-110">
                      Purge
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={4} className="px-8 py-20 text-center text-slate-600 text-xs uppercase tracking-[0.3em] font-medium italic">
                  No leads detected in local PostgreSQL cluster.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}