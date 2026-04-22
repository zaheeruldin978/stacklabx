import React from 'react';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#020308] text-slate-300 pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-6">
          Compliance Document
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Privacy Policy</h1>
        <p className="text-sm mb-12 italic text-slate-500">Last Updated: April 22, 2026</p>

        <section className="space-y-8 prose prose-invert max-w-none">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 uppercase tracking-wider">1. Introduction</h2>
            <p>StacklabX ("we", "our", or "us") is committed to protecting your personal data. This privacy policy informs you how we look after your personal data when you visit our website and tells you about your privacy rights and how the law protects you.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4 uppercase tracking-wider">2. Data We Collect</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Identity Data:</strong> Name, username, or similar identifier.</li>
              <li><strong>Contact Data:</strong> Email address and telephone numbers.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, and location.</li>
              <li><strong>Usage Data:</strong> Information about how you use our website and services.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4 uppercase tracking-wider">3. How We Use Your Data</h2>
            <p>We only use your personal data when the law allows us to. Most commonly, we use it to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Register you as a new customer.</li>
              <li>Process and deliver your service requests.</li>
              <li>Manage our relationship with you.</li>
              <li>Improve our website, services, and customer experiences.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4 uppercase tracking-wider">4. UK GDPR Rights</h2>
            <p>Under the UK Data Protection Act, you have rights including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access:</strong> The right to request copies of your data.</li>
              <li><strong>Rectification:</strong> The right to ask us to correct information you think is inaccurate.</li>
              <li><strong>Erasure:</strong> The right to ask us to erase your personal information.</li>
              <li><strong>Object:</strong> The right to object to processing.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-bold text-white mb-2">Contact Our Data Protection Lead</h2>
            <p className="text-sm">If you have questions about this policy or our data practices, please contact us at:</p>
            <p className="text-cyan-400 mt-2 font-mono text-sm">legal@stacklabx.com</p>
          </div>
        </section>
      </div>
    </main>
  );
}