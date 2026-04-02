import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "StacklabX | High-Performance Engineering",
  description: "Enterprise web applications and AI automations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col selection:bg-white selection:text-black" suppressHydrationWarning>
        <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="text-white font-bold tracking-tighter text-lg flex items-center gap-2">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
              STACKLABX
            </Link>
            <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
              <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              <Link href="/tutorials" className="hover:text-white transition-colors">Academy</Link>
              <Link href="/admin" className="hover:text-white transition-colors">Nerve Center</Link>
            </div>
            <Link href="/services" className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-full hover:bg-slate-200 transition-colors">
              Initialize
            </Link>
          </div>
        </nav>
        <div className="flex-1 pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}