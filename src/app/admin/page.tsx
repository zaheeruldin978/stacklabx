import { prisma } from "../../lib/prisma";
import { deleteLead } from "../actions/leadActions";

export default async function AdminDashboard() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
  const totalLeads = leads.length;

  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter">Nerve Center</h1>
          <p className="text-slate-500 text-sm font-medium">Global lead synchronization active.</p>
        </div>
        <div className="px-4 py-2 text-[10px] font-mono text-emerald-400 border border-emerald-500/20 rounded uppercase tracking-widest bg-emerald-500/5">
          SYSTEM_STATUS: OPERATIONAL
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bento-card p-6">
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">Total Leads</p>
          <p className="text-4xl font-black text-white">{totalLeads}</p>
        </div>
        <div className="bento-card p-6">
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">Conversion</p>
          <p className="text-4xl font-black text-white">100%</p>
        </div>
        <div className="bento-card p-6 border-cyan-500/20">
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">Uptime</p>
          <p className="text-4xl font-black text-cyan-400">99.9%</p>
        </div>
      </div>

      <div className="bento-card overflow-hidden !p-0">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-slate-400 text-[10px] uppercase tracking-widest border-b border-white/10">
              <th className="px-8 py-5 font-bold">Client Identity</th>
              <th className="px-8 py-5 font-bold">Contact Channel</th>
              <th className="px-8 py-5 font-bold text-center">Stack Selection</th>
              <th className="px-8 py-5 font-bold text-right">Management</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-white/[0.02] transition-all group">
                <td className="px-8 py-5 text-sm font-semibold text-white">{lead.name}</td>
                <td className="px-8 py-5 text-sm text-slate-400">{lead.email}</td>
                <td className="px-8 py-5 text-center">
                  <span className="bg-white/10 text-white text-[10px] px-3 py-1 rounded-full border border-white/20 font-black uppercase tracking-tighter">
                    {lead.service}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <form action={async () => { "use server"; await deleteLead(lead.id); }}>
                    <button className="text-red-900 group-hover:text-red-500 text-xs font-bold uppercase tracking-widest transition-all hover:scale-110">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}