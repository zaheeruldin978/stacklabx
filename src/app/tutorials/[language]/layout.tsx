export default function TutorialLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen pt-20">
      {/* Sidebar - Built for AdSense/Affiliate placements later */}
      <aside className="w-64 border-r border-white/10 p-6 hidden lg:block">
        <h3 className="font-bold text-blue-400 mb-4 uppercase text-xs tracking-widest">Roadmaps</h3>
        <nav className="space-y-2 text-sm text-gray-400">
          <p className="hover:text-white cursor-pointer transition">Python for AI</p>
          <p className="hover:text-white cursor-pointer transition">Modern TypeScript</p>
          <p className="hover:text-white cursor-pointer transition">Automation with Zapier</p>
        </nav>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 px-8 py-4">
        {children}
      </main>
    </div>
  );
}