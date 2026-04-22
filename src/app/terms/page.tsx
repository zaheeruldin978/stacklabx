import React from 'react';

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-[#020308] text-slate-300 pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6">
          Legal Agreement
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Terms of Service</h1>
        <p className="text-sm mb-12 italic text-slate-500">Effective Date: April 22, 2026</p>

        <section className="space-y-8 prose prose-invert max-w-none">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 uppercase tracking-wider">1. Agreement to Terms</h2>
            <p>By accessing our website at stacklabx.com, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4 uppercase tracking-wider">2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials on StacklabX's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4 uppercase tracking-wider">3. Service Delivery</h2>
            <p>StacklabX provides custom software development and IT infrastructure services. Each project is governed by its own Master Service Agreement (MSA) or Statement of Work (SOW), which supersedes these general website terms.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4 uppercase tracking-wider">4. Governing Law</h2>
            <p>These terms and conditions are governed by and construed in accordance with the laws of <strong>England and Wales</strong> and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
          </div>

          <div className="border-t border-white/10 pt-10 mt-10">
            <p className="text-xs text-slate-500">
              StacklabX is a registered business in the United Kingdom. 
              Address: 176-178 City Road, Cardiff, CF24 3JF, UK.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}