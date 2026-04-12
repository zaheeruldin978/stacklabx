import Link from "next/link";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export default async function TelemetryDashboard() {
  // 1. FETCH ONLY ACTIVE LEADS (isDeleted: false)
  const leads = await db.lead.findMany({ 
    where: { isDeleted: false }, 
    orderBy: { createdAt: 'desc' } 
  });

  // 2. SOFT DELETE: LEAD (Moves to Recovery Vault)
  async function trashLead(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (!id) return;
    try {
      await db.lead.update({ where: { id }, data: { isDeleted: true } });
      revalidatePath("/admin/telemetry");
      revalidatePath("/admin");
      revalidatePath("/admin/trash");
    } catch (error) { 
      console.error("LEAD_TRASH_FAILURE:", error); 
    }
  }

  return (
    <main className="w-full max-w-6xl mx-auto">
      
      <div className="mb-8">
        <Link href="/admin" className="text-[10px] font-bold text-slate-500 hover:text-cyan-400 uppercase tracking-widest transition-colors inline-block">
          &larr; Back to Overview
        </Link>
      </div>

      {/* --- COMMAND HEADER --- */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <p className="text-[10px] font-mono tracking-[0.2em] text-emerald-400 uppercase">Telemetry Sensors Active</p>
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter">Client <span className="text-slate-600">Telemetry.</span></h1>
      </div>

      {/* --- TARGET TELEMETRY TABLE --- */}
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
                <th className="p-6 text-left font-bold">Acquisition Source</th>
                <th className="p-6 text-left font-bold">Infrastructure Load</th>
                <th className="p-6 text-left font-bold">Calculated ROI</th>
                <th className="p-6 text-right font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-500 text-xs font-mono uppercase tracking-widest">No active leads intercepted.</td>
                </tr>
              ) : (
                leads.map((lead: any) => (
                  <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-6 font-bold text-sm text-slate-300">
                      {lead.email}
                      {lead.name && <div className="text-[10px] text-slate-500 font-normal mt-1">{lead.name}</div>}
                    </td>
                    <td className="p-6 text-xs font-mono text-slate-400">
                      <span className="bg-white/5 px-2 py-1 rounded border border-white/10">{lead.source}</span>
                    </td>
                    <td className="p-6 text-xs font-mono text-slate-500">
                      {lead.traffic ? <span className="text-cyan-400">{lead.traffic}K reqs</span> : "N/A"} 
                      <span className="mx-2 opacity-30">|</span> 
                      {lead.dbSize ? `${lead.dbSize}GB` : "N/A"}
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

    </main>
  );
}