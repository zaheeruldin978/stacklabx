// DIRECT IMPORT: Bypassing TSConfig alias to force compiler resolution
import db from "../../lib/db";
import Link from "next/link";

// This forces Next.js to always fetch fresh data from the SQLite/Postgres database
export const revalidate = 0; 

export default async function AdminDashboard() {
  // 1. FETCH DATA using the world-class Singleton 'db'
  const leads = await db.lead.findMany({
    orderBy: { createdAt: 'desc' }
  });

  // 2. CALCULATE SYSTEM METRICS
  const totalLeads = leads.length;
  const totalSavingsIdentified = leads.reduce((acc, lead) => {
    if (lead.standardCost && lead.stacklabCost) {
      return acc + (lead.standardCost - lead.stacklabCost);
    }
    return acc;
  }, 0);

  return (
    <main className="min-h-screen bg-[#000000] text-white pt-32 pb-20 selection:bg-cyan-500/30 font-sans">
      
      {/* --- ATMOSPHERIC LAYER --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-900/10 blur-[150px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-screen"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- NERVE CENTER HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/5 pb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded text-[9px] font-black uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> RESTRICTED ACCESS
            </div>
            <h1 className="text-5xl font-black tracking-tighter">StacklabX <br/><span className="text-slate-500">Nerve Center.</span></h1>
          </div>
          
          <div className="flex gap-12 text-right">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Intercepted Leads</p>
              <p className="text-4xl font-black text-white">{totalLeads.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total ROI Identified</p>
              <p className="text-4xl font-black text-emerald-400">${totalSavingsIdentified.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* --- TELEMETRY DATA TABLE --- */}
        <div className="bg-[#050505] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <th className="p-6">Timestamp / ID</th>
                  <th className="p-6">Target Entity</th>
                  <th className="p-6">Source Origin</th>
                  <th className="p-6">Infrastructure Profile</th>
                  <th className="p-6">Optimization ROI</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-white/5">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <span className="w-8 h-8 border-2 border-white/5 border-t-cyan-500 rounded-full animate-spin"></span>
                        <p className="text-slate-600 font-mono text-xs tracking-widest uppercase">
                          Awaiting initial telemetry handshake...
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                      {/* TIMESTAMP */}
                      <td className="p-6 font-mono text-xs text-slate-500">
                        {new Date(lead.createdAt).toLocaleDateString()} <br/>
                        <span className="text-[9px] text-slate-700">{new Date(lead.createdAt).toLocaleTimeString()}</span>
                      </td>

                      {/* TARGET EMAIL */}
                      <td className="p-6">
                        <div className="font-bold text-sm text-white mb-1">{lead.email}</div>
                        <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
                           {lead.id.substring(0, 8)} // SECURE-UID
                        </div>
                      </td>

                      {/* SOURCE */}
                      <td className="p-6">
                        <span className={`px-2 py-1 rounded-[4px] text-[9px] font-black uppercase tracking-widest border ${
                          lead.source === 'Architecture Calculator' 
                            ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' 
                            : 'bg-white/5 text-slate-400 border-white/10'
                        }`}>
                          {lead.source}
                        </span>
                      </td>

                      {/* INFRASTRUCTURE PROFILE */}
                      <td className="p-6 text-xs text-slate-400">
                        {lead.traffic ? (
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[10px]">
                            <span className="text-slate-600 uppercase">Traffic:</span> <span className="text-white">{lead.traffic}K/mo</span>
                            <span className="text-slate-600 uppercase">Storage:</span> <span className="text-white">{lead.dbSize}GB</span>
                            <span className="text-slate-600 uppercase">Runtime:</span> <span className="text-white uppercase">{lead.computeType}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-slate-600 italic">
                            <div className="w-1 h-1 rounded-full bg-slate-800"></div>
                            General Inquiry
                          </div>
                        )}
                      </td>

                      {/* ROI CALCULATION */}
                      <td className="p-6">
                        {lead.standardCost && lead.stacklabCost ? (
                          <div>
                            <div className="text-emerald-400 font-black text-lg tracking-tighter">
                              +${(lead.standardCost - lead.stacklabCost).toLocaleString()}
                            </div>
                            <div className="text-[9px] text-slate-600 uppercase tracking-widest mt-1">
                              Monthly Optimization
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-700 font-mono text-[10px]">N/A</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- SYSTEM LOGS (FOOTER) --- */}
        <div className="mt-8 flex justify-between items-center text-[10px] font-bold text-slate-700 uppercase tracking-[0.3em]">
          <p>Local Database: Postgres / Prisma Active</p>
          <div className="flex items-center gap-2 text-emerald-500/50">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
             Nerve Center: Online
          </div>
        </div>

      </div>
    </main>
  );
}