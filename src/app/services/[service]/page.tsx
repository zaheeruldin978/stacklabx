import { servicesConfig } from "../../../lib/servicesData";
import { notFound } from "next/navigation";
import Link from "next/link";
import LeadFunnel from "../../../components/sections/LeadFunnel";

export default async function SingleServicePage({ params }: { params: Promise<{ service: string }> }) {
  const resolvedParams = await params;
  
  // Find the requested service in our database
  const serviceData = servicesConfig.find((s) => s.slug === resolvedParams.service);

  // If the user types a random service URL, trigger the 404 security page
  if (!serviceData) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative">
      <div className="absolute inset-0 w-full h-full bg-grid -z-10 opacity-30"></div>
      
      <div className="max-w-5xl mx-auto">
        <Link href="/services" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors mb-12 inline-flex items-center gap-2">
          <span>←</span> Back to Services Directory
        </Link>

        <header className="mb-20">
          <div className="text-6xl mb-6">{serviceData.icon}</div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-tight">
            {serviceData.title}
          </h1>
          <p className="text-stacklab-cyan text-xl md:text-2xl font-light mb-6">
            {serviceData.tagline}
          </p>
          <p className="text-slate-400 text-lg leading-relaxed max-w-3xl">
            {serviceData.description}
          </p>
        </header>

        <div className="mb-24">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-8 border-b border-white/10 pb-4">
            Technical Deliverables
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {serviceData.deliverables.map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-slate-300">
                <span className="text-stacklab-blue font-black">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* The Conversion Engine */}
      <div className="border-t border-white/5 pt-20 mt-20 bg-gradient-to-b from-transparent to-[#02040A]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white tracking-tight">Ready to Deploy?</h2>
          <p className="text-slate-500 mt-2">Initialize the protocol to start your {serviceData.title} project.</p>
        </div>
        
        {/* We inject the global Lead Funnel component here */}
        <LeadFunnel />
      </div>
    </main>
  );
}