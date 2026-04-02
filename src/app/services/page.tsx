import LeadFunnel from "../../components/sections/LeadFunnel";

export default function ServicesPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="absolute inset-0 w-full h-full bg-grid -z-10"></div>
      
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">Engineering Services.</h1>
        <p className="text-slate-400 max-w-xl mx-auto font-light text-lg">
          Select your target parameters to begin the digital transformation of your enterprise.
        </p>
      </div>

      <LeadFunnel />
    </main>
  );
}