import db from "../../lib/db";

export const revalidate = 0; 

export default async function AdminDashboard() {
  const leads = await db.lead.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <main className="min-h-screen bg-black text-white p-20">
      <h1 className="text-4xl font-black mb-10">NERVE CENTER</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-white/10 text-slate-500 text-xs uppercase">
            <th className="p-4 text-left">Target</th>
            <th className="p-4 text-left">Telemetry</th>
            <th className="p-4 text-left">ROI</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5">
              <td className="p-4 font-bold">{lead.email}</td>
              <td className="p-4 text-xs text-slate-400">
                {lead.traffic ? `${lead.traffic}K reqs | ${lead.dbSize}GB` : "N/A"}
              </td>
              <td className="p-4 text-emerald-400 font-mono">
                ${((lead.standardCost || 0) - (lead.stacklabCost || 0)).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}