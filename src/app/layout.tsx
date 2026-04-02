import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StacklabX | Engineering the Digital Future",
  description: "We architect high-performance web applications, seamless AI automations, and futuristic digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* suppressHydrationWarning prevents browser extensions from crashing the dev server */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}