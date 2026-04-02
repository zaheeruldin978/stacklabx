import { getPostBySlug } from "../../../lib/wordpress";
import { notFound } from "next/navigation";
import Link from "next/link";

// 1. We define params as a Promise for Next.js 16+ compatibility
export default async function SingleBlogPost({ params }: { params: Promise<{ slug: string }> }) {
  
  // 2. We explicitly AWAIT the params before using them
  const resolvedParams = await params;
  
  // 3. Now we fetch the article with the proper string slug
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound(); 
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative">
      <div className="absolute inset-0 w-full h-full bg-grid -z-10 opacity-40"></div>
      
      <article className="max-w-4xl mx-auto bento-card p-8 md:p-16 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-stacklab-blue/5 rounded-full blur-[120px] pointer-events-none"></div>

        <Link href="/blog" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors mb-8 inline-flex items-center gap-2">
          <span>←</span> Back to Insights
        </Link>

        <div className="mb-10 relative z-10">
          <span className="text-stacklab-cyan font-bold text-xs uppercase tracking-widest">{post.date}</span>
          {/* We also decode the title here */}
          <h1 
            className="text-4xl md:text-5xl font-black text-white mt-4 tracking-tighter leading-[1.2]"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
        </div>
        
        {post.image && (
          <div className="w-full h-64 md:h-[400px] mb-12 overflow-hidden rounded-xl border border-white/10 shadow-2xl relative z-10">
            <img src={post.image} alt="Featured" className="w-full h-full object-cover" />
          </div>
        )}

        <div 
          className="
            relative z-10 max-w-none text-slate-300 leading-relaxed text-lg
            [&>p]:mb-6
            [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-12 [&>h2]:mb-6 [&>h2]:tracking-tight
            [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-white [&>h3]:mt-10 [&>h3]:mb-4
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:mb-2
            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol>li]:mb-2
            [&>a]:text-stacklab-blue hover:[&>a]:text-stacklab-cyan [&>a]:underline [&>a]:underline-offset-4
            [&>img]:rounded-xl [&>img]:my-8 [&>img]:border [&>img]:border-white/10
            [&>blockquote]:border-l-4 [&>blockquote]:border-stacklab-blue [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-slate-400 [&>blockquote]:my-8
          "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}