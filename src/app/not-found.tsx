import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <div className="absolute inset-0 w-full h-full bg-grid -z-10 opacity-50"></div>
      
      <div className="text-center">
        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-800 tracking-tighter mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest">Protocol Not Found</h2>
        <p className="text-slate-400 max-w-md mx-auto mb-10 text-sm">
          The architectural endpoint you are looking for does not exist in the current database cluster.
        </p>
        <Link href="/" className="px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-slate-200 transition-colors inline-block">
          Return to Base
        </Link>
      </div>
    </main>
  );
}