import type { Metadata } from "next";
import "./globals.css";
import CommandPalette from "../components/ui/CommandPalette";
import VisibilityShield from "../components/VisibilityShield";
import GlobalHeader from "../components/layout/Header";
import GlobalFooter from "../components/layout/Footer"; // <-- New Import

export const metadata: Metadata = {
  title: "StacklabX | Engineering The Impossible",
  description: "Architecting military-grade web applications, custom software ecosystems, and intelligent AI automation for enterprises that refuse to settle.",
  keywords: ["Web Ecosystems", "Custom Software", "Enterprise Cloud", "Headless Commerce", "AI Automation"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // SEO JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "StacklabX",
    "url": "https://stacklabx.com",
    "logo": "https://stacklabx.com/logo.png",
    "description": "High-performance software development and enterprise IT infrastructure.",
    "sameAs": ["https://twitter.com/stacklabx", "https://linkedin.com/company/stacklabx"]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#020308] text-white selection:bg-cyan-500/30 antialiased" suppressHydrationWarning>
        
        {/* --- BEAUTIFUL GLOBAL NAVBAR --- */}
        <VisibilityShield>
          <GlobalHeader />
        </VisibilityShield>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1">
          <CommandPalette />
          {children}
        </main>

        {/* --- ORGANIZED GLOBAL FOOTER --- */}
        <VisibilityShield>
          <GlobalFooter />
        </VisibilityShield>

      </body>
    </html>
  );
}