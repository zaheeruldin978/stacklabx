import { notFound } from "next/navigation";
import { Metadata } from "next";
import db from "../../../lib/db";
import Link from "next/link";

// --- 1. THE INTELLIGENT CONTENT SCRUBBER ---
function upgradeHTML(html: string) {
  if (!html) return "";
  let clean = html;

  // Pattern A: Standalone Bold/Strong paragraphs become semantic H2s
  clean = clean.replace(/<p>\s*<strong>(.*?)<\/strong>\s*<\/p>/gi, '<h2>$1</h2>');
  
  // Pattern B: FAQ Detection (Numbers followed by a period at start of paragraph)
  // This wraps them in a special FAQ class to force huge top-spacing
  clean = clean.replace(/<p>\s*(\d+\..*?)\s*<\/p>/gi, '<h3 class="faq-trigger">$1</h3>');

  // Pattern C: Strip HTML entities from the body
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
    title: `${post.title.replace(/&#8211;/g, '—')} | StacklabX`,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await db.post.findUnique({ where: { slug: resolvedParams.slug } });

  if (!post) return notFound();

  const engineeredContent = upgradeHTML(post.content);
  const wordCount = post.content.split(/\s+/g).length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <main className="min-h-screen pt-24 pb-32 relative bg-[#000] selection:bg-blue-600/30">
      
      {/* 1. DISCREET PROGRESS TRACKER */}
      <div className="fixed top-0 left-0 w-full h-[1px] bg-white/5 z-[100]">
          <div className="h-full bg-blue-500 w-1/3 shadow-[0_0_15px_#3b82f6]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Navigation */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] hover:text-white transition-colors mb-12">
          <span>←</span> <span>Intelligence Hub</span>
        </Link>

        {/* --- ARTICLE HEADER --- */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Engineering Protocol</span>
          </div>

          {/* FIXED: Scaled-down, Breathable H1 */}
          <h1 
            className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.15] mb-10 max-w-[20ch]"
            dangerouslySetInnerHTML={{ __html: post.title.replace(/&#8211;/g, '—') }}
          />

          {/* METADATA BAR (Glassmorphism Light) */}
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

          {/* FIXED: FULL IMAGE DISPLAY (No Cropping) */}
          {post.image && (
            <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]">
              <img 
                src={post.image} 
                alt="Article Hero" 
                className="w-full h-auto block" // Removed max-height to ensure full visibility
              />
            </div>
          )}
        </header>

        {/* --- ARTICLE BODY (Balanced Editorial Density) --- */}
        <div 
          className="
            relative z-10 max-w-none text-slate-400 leading-[1.85] text-lg
            
            /* GLOBAL PACING */
            [&>p]:mb-8
            
            /* HEADINGS: ELEGANT SCALE */
            [&>h2]:text-2xl md:[&>h2]:text-3xl [&>h2]:font-black [&>h2]:text-white [&>h2]:mt-24 [&>h2]:mb-8 
            [&>h2]:tracking-tight [&>h2]:leading-snug
            [&>h2]:pl-6 [&>h2]:border-l-2 [&>h2]:border-blue-600
            
            [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-white [&>h3]:mt-12 [&>h3]:mb-4
            
            /* FAQ RECOVERY: Huge margin-top for Question elements */
            [&>.faq-trigger]:text-white [&>.faq-trigger]:font-black [&>.faq-trigger]:text-xl md:[&>.faq-trigger]:text-2xl
            [&>.faq-trigger]:mt-20 [&>.faq-trigger]:mb-6 [&>.faq-trigger]:pt-12 [&>.faq-trigger]:border-t [&>.faq-trigger]:border-white/5
            
            /* LISTS */
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-10 
            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-10

            /* MEDIA */
            [&>img]:rounded-2xl [&>img]:my-16 [&>img]:border [&>img]:border-white/10
            
            /* BLOCKQUOTES */
            [&>blockquote]:border-l-4 [&>blockquote]:border-blue-600 [&>blockquote]:bg-blue-600/5 
            [&>blockquote]:p-8 [&>blockquote]:rounded-r-xl [&>blockquote]:italic [&>blockquote]:text-slate-200 
            [&>blockquote]:my-14
          "
          dangerouslySetInnerHTML={{ __html: engineeredContent }}
        />

        {/* --- SIGNATURE --- */}
        <footer className="mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center font-black text-2xl shadow-lg">
              SX
            </div>
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-tight">StacklabX Core Engineering</p>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em]">Protocol Author</p>
            </div>
          </div>
          <p className="text-[10px] font-bold text-slate-700 uppercase text-right tracking-[0.2em] leading-loose">
            London / Gujranwala <br/> Global Infrastructure Node
          </p>
        </footer>

      </div>
    </main>
  );
}