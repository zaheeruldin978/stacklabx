"use client";

import { useState, useTransition } from "react";
import { submitLead } from "../../app/actions/leadActions";

export default function LeadFunnel() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleAction(formData: FormData) {
    setMessage(null);
    
    // Security Layer: Explicit Client-Side GDPR Verification
    const gdprConsent = formData.get("gdprConsent");
    if (!gdprConsent) {
      setMessage({ type: "error", text: "UK GDPR compliance requires explicit consent." });
      return;
    }

    startTransition(async () => {
      const response = await submitLead(formData);
      
      if (response?.error) {
        setMessage({ type: "error", text: response.error });
      } else if (response?.success) {
        setMessage({ 
          type: "success", 
          text: "Architecture initialized. Data securely transmitted to Nerve Center." 
        });
      }
    });
  }

  return (
    <section className="w-full max-w-3xl mx-auto py-20 px-6">
      <div className="bento-card p-8 md:p-12 relative overflow-hidden group">
        {/* Subtle background glow effect */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-white/10 transition-all duration-700"></div>
        
        <div className="relative z-10">
          <h2 className="text-4xl font-black text-white tracking-tighter mb-2">Initialize Protocol</h2>
          <p className="text-slate-400 text-sm mb-10 font-medium uppercase tracking-widest">Lead Acquisition Stage</p>

          {/* System Status Messaging */}
          {message && (
            <div className={`p-4 mb-8 rounded-lg text-xs font-bold border uppercase tracking-widest animate-in fade-in slide-in-from-top-4 ${
              message.type === "success" 
                ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" 
                : "bg-red-500/10 border-red-500/50 text-red-400"
            }`}>
              {message.text}
            </div>
          )}

          <form action={handleAction} className="space-y-8">
            {/* Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Principal Identity</label>
                <input 
                  name="name" 
                  type="text" 
                  required 
                  placeholder="ZAHEER MALIK"
                  className="bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-white transition-colors placeholder:text-white/10 font-medium" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Communication Channel</label>
                <input 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="ZAHEER@STACKLABX.COM"
                  className="bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-white transition-colors placeholder:text-white/10 font-medium" 
                />
              </div>
            </div>

            {/* Architecture Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Target Technology Stack</label>
              <select 
                name="service" 
                required 
                defaultValue=""
                className="bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer font-medium"
              >
                <option value="" disabled className="bg-black">SELECT ARCHITECTURE...</option>
                <option value="Web Development" className="bg-black">NEXT.JS ENTERPRISE WEB</option>
                <option value="AI Automation" className="bg-black">LLM WORKFLOW AUTOMATION</option>
                <option value="Cloud Architecture" className="bg-black">POSTGRESQL SYSTEMS</option>
              </select>
            </div>

            {/* UK GDPR Compliance Layer */}
            <div className="flex items-start gap-3 py-4 border-t border-white/10 mt-4">
              <input 
                type="checkbox" 
                id="gdpr" 
                name="gdprConsent" 
                required 
                className="mt-1 w-4 h-4 rounded border border-white/20 bg-black text-white focus:ring-1 focus:ring-white focus:ring-offset-0 appearance-none checked:bg-white checked:after:content-['✓'] checked:after:text-black checked:after:text-[10px] checked:after:font-bold checked:after:flex checked:after:justify-center checked:after:items-center cursor-pointer transition-all"
              />
              <label htmlFor="gdpr" className="text-[9px] font-medium text-slate-500 uppercase tracking-widest leading-relaxed cursor-pointer hover:text-slate-300 transition-colors">
                I explicitly consent to StacklabX Ltd collecting and processing my data to handle this inquiry. I understand my data is stored securely and I maintain the right to request deletion at any time under UK GDPR guidelines.
              </label>
            </div>

            {/* Execution Trigger */}
            <button 
              type="submit" 
              disabled={isPending}
              className="w-full bg-white text-black font-black py-5 rounded-sm uppercase tracking-widest text-xs hover:bg-slate-200 transition-all active:scale-95 disabled:opacity-50"
            >
              {isPending ? "Encrypting & Transmitting..." : "Execute Initialization"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}