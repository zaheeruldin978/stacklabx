"use client";

import { useState, useTransition } from "react";
// This relative path assumes you are in src/components/sections/
// One ../ takes you to components, the second ../ takes you to src.
import { submitLead } from "../../app/actions/leadActions";

export default function LeadFunnel() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleAction(formData: FormData) {
    setMessage(null);
    
    startTransition(async () => {
      const response = await submitLead(formData);
      
      if (response?.error) {
        setMessage({ type: "error", text: response.error });
      } else if (response?.success) {
        setMessage({ 
          type: "success", 
          text: "Protocol initiated. Our architects will contact you shortly." 
        });
      }
    });
  }

  return (
    <div className="glass-panel p-8 md:p-12 w-full max-w-2xl mx-auto relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"></div>
      
      <h2 className="text-3xl font-bold mb-2 text-white">Calculate Your ROI</h2>
      <p className="text-slate-400 mb-8 text-sm font-light">
        Provide your project parameters to initialize the digital transformation.
      </p>

      {message && (
        <div className={`p-4 mb-6 rounded-lg text-sm font-medium border animate-in fade-in slide-in-from-top-2 ${
          message.type === "success" 
            ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" 
            : "bg-red-500/10 border-red-500/50 text-red-400"
        }`}>
          {message.text}
        </div>
      )}

      <form action={handleAction} className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Full Name</label>
            <input 
              name="name" 
              type="text" 
              required 
              placeholder="Elon Musk"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email Address</label>
            <input 
              name="email" 
              type="email" 
              required 
              placeholder="elon@tesla.com"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Required Service</label>
          <select 
            name="service" 
            required 
            defaultValue=""
            className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
          >
            <option value="" disabled>Select technology stack...</option>
            <option value="Web Development">Full-Stack Web Development</option>
            <option value="AI Automation">AI Workflow Automation</option>
            <option value="Cloud Architecture">Cloud Architecture</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Connecting to Database..." : "Initialize Project"}
        </button>
      </form>
    </div>
  );
}