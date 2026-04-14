import { notFound } from "next/navigation";
import { Metadata } from "next";
import db from "@/lib/db";
import Link from "next/link";

// --- THE INTELLIGENT CONTENT SCRUBBER ---
// Formats the raw HTML from the editor into beautiful, readable web typography
function upgradeHTML(html: string) {
  if (!html) return "";
  let clean = html;

  // Standalone Bold paragraphs become semantic H2s
  clean = clean.replace(/<p>\s*<strong>(.*?)<\/strong>\s*<\/p>/gi, '<h2>$1</h2>');
  
  // FAQ Detection (Numbers followed by a period at start of paragraph)
  clean = clean.replace(/<p>\s*(\d+\..*?)\s*<\/p>/gi, '<h3 class="faq-trigger">$1</h3>');

  // Strip arbitrary HTML entities
  clean = clean.replace(/&nbsp;/g, ' ');

  return clean;
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.post.findUnique({ where: { slug } });
  
  if (!post) return { title: "Insight | StacklabX" };
  
  return {
    title: `${post.title.replace(/&#8211;/g, '—').replace(/(<([^>]+)>)/gi, "")} | StacklabX`,
    description: post.excerpt || "Read the full architectural breakdown inside.",
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await db.post.findUnique({ where: { slug: resolvedParams.slug } });

  if (!post || post.isDeleted) return notFound();

  const engineeredContent = upgradeHTML(post.content || "");
  const wordCount = (post.content || "").split(/\s+/g).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <main className="min-h-screen pt-32 pb-32 relative bg-[#000000] selection:bg-cyan-500/30">
      
      {/* DISCREET PROGRESS TRACKER (Visual only for aesthetic) */}
      <div className="fixed top-0 left-0 w-full h-[1px] bg-white/5 z-[100]">
          <div className="h-full bg-cyan-500 w-1/3 shadow-[0_0_15px_#06b6d4]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Navigation */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] hover:text-white transition-colors mb-12">
          <span>←</span> <span>Intelligence Hub</span>
        </Link>

        {/* --- ARTICLE HEADER --- */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Engineering Protocol</span>
          </div>

          <h1 
            className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-10"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />

          {/* METADATA BAR */}
          <div className="flex flex-wrap items-center gap-10 py-6 border-y border-white/5 mb-12">
            <div className="flex flex-col gap-1">
              <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Released</span>
              <span className="text-xs font-mono text-white">{new Date(post.createdAt).toLocaleDateString('en-GB')}</span>
            </div>
            <div className="flex flex-col gap-1 md:border-l md:border-white/10 md:pl-10">
              <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Classification</span>
              <span className="text-xs font-black text-cyan-500 uppercase tracking-tight italic">Enterprise L3</span>
            </div>
            <div className="flex flex-col gap-1 md:border-l md:border-white/10 md:pl-10">
              <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Read Time</span>
              <span className="text-xs font-mono text-white">{readTime} MINS</span>
            </div>
          </div>

          {/* HERO IMAGE */}
          {post.image && (
            <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]">
              <img 
                src={post.image} 
                alt={post.title.replace(/(<([^>]+)>)/gi, "")} 
                className="w-full h-auto block object-cover max-h-[600px]" 
              />
            </div>
          )}
        </header>

        {/* --- ARTICLE BODY --- */}
        {/* We use Tailwind Typography-like arbitrary variants to style the raw HTML */}
        <div 
          className="
            relative z-10 max-w-none text-slate-300 leading-[1.85] text-lg font-light
            
            /* GLOBAL PACING */
            [&>p]:mb-8
            
            /* HEADINGS */
            [&>h2]:text-2xl md:[&>h2]:text-3xl [&>h2]:font-black [&>h2]:text-white [&>h2]:mt-20 [&>h2]:mb-8 
            [&>h2]:tracking-tight [&>h2]:leading-snug
            
            [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-white [&>h3]:mt-12 [&>h3]:mb-4
            
            /* FAQ TRIGGERS */
            [&>.faq-trigger]:text-white [&>.faq-trigger]:font-black [&>.faq-trigger]:text-xl
            [&>.faq-trigger]:mt-16 [&>.faq-trigger]:mb-6 [&>.faq-trigger]:pt-8 [&>.faq-trigger]:border-t [&>.faq-trigger]:border-white/5
            
            /* LISTS */
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-10 [&>ul>li]:mb-3
            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-10 [&>ol>li]:mb-3

            /* MEDIA */
            [&>img]:rounded-2xl [&>img]:my-16 [&>img]:border [&>img]:border-white/10
            
            /* BLOCKQUOTES */
            [&>blockquote]:border-l-4 [&>blockquote]:border-cyan-500 [&>blockquote]:bg-cyan-500/5 
            [&>blockquote]:p-8 [&>blockquote]:rounded-r-xl [&>blockquote]:italic [&>blockquote]:text-cyan-100 
            [&>blockquote]:my-14
            
            /* LINKS */
            [&>a]:text-cyan-400 [&>a]:underline [&>a]:underline-offset-4 hover:[&>a]:text-cyan-300
          "
          dangerouslySetInnerHTML={{ __html: engineeredContent }}
        />

        {/* --- AUTHOR FOOTER --- */}
        <footer className="mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-900 to-cyan-500 flex items-center justify-center font-black text-2xl shadow-lg border border-cyan-500/30">
              SX
            </div>
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-tight">StacklabX Core</p>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em]">Protocol Author</p>
            </div>
          </div>
          <p className="text-[10px] font-bold text-slate-700 uppercase text-center md:text-right tracking-[0.2em] leading-loose">
            London / Gujranwala <br/> Global Infrastructure Node
          </p>
        </footer>

      </div>
    </main>
  );
}