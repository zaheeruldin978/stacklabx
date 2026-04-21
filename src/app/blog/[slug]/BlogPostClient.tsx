"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogPostClient({ post }: { post: any }) {
  return (
    <main className="relative min-h-screen overflow-hidden selection:bg-[#0066FF]/30 bg-[#020408] pb-32 font-sans">
      
      {/* 1. DEEP AMBIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vh] bg-[#0066FF]/10 blur-[150px] rounded-full mix-blend-screen transform-gpu"></div>
        <div className="absolute top-[40%] left-[-10%] w-[40vw] h-[40vh] bg-[#00E5FF]/5 blur-[120px] rounded-full mix-blend-screen transform-gpu"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 pt-[15vh]">
        
        {/* BACK BUTTON */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 text-slate-400 hover:text-white font-bold text-[10px] uppercase tracking-widest transition-all backdrop-blur-md mb-10 group">
            <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Insights
          </Link>
        </motion.div>

        {/* 2. POST HEADER */}
        <header className="mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-bold text-[#0066FF] uppercase tracking-[0.2em] bg-[#0066FF]/10 px-3 py-1 rounded-md border border-[#0066FF]/20">
                {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              {post.category?.name && (
                <span className="text-[10px] font-bold text-[#00E5FF] uppercase tracking-[0.2em]">
                  • {post.category.name}
                </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-10 leading-[1.15] drop-shadow-sm" dangerouslySetInnerHTML={{ __html: post.title }} />
          </motion.div>

          {/* HERO IMAGE CONTAINER */}
          {post.imageUrl && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="w-full h-[350px] md:h-[450px] rounded-[24px] overflow-hidden border border-white/10 shadow-[0_20px_50px_-15px_rgba(0,102,255,0.15)] relative bg-[#020408] group">
               <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover object-center opacity-90 transition-transform duration-1000 group-hover:scale-105" />
             </motion.div>
          )}
        </header>

        {/* 3. ABSOLUTE OVERRIDE RENDERER */}
        <motion.article 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.3 }}
          className="
            w-full max-w-none text-slate-300 font-light leading-relaxed text-[1.1rem]

            /* === HEADINGS OVERRIDE === */
            [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mb-6 [&_h1]:mt-12
            [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mb-6 [&_h2]:mt-14 [&_h2]:border-l-4 [&_h2]:border-[#0066FF] [&_h2]:pl-5
            [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-white [&_h3]:mb-4 [&_h3]:mt-10
            [&_h4]:text-xl [&_h4]:font-bold [&_h4]:text-white [&_h4]:mb-4 [&_h4]:mt-8
            [&_strong]:text-white [&_strong]:font-semibold

            /* === PARAGRAPHS & LINKS === */
            [&_p]:my-6 [&_p]:leading-[1.8]
            [&_a]:text-[#00E5FF] [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-[#0066FF] [&_a]:transition-colors

            /* === WORDPRESS IMAGE OVERRIDE === */
            [&_img]:w-full [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-[20px] [&_img]:border [&_img]:border-white/10 [&_img]:shadow-2xl [&_img]:my-10
            [&_figure]:my-10 [&_figure]:w-full [&_figure]:mx-0
            [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-slate-500 [&_figcaption]:mt-4

            /* === WORDPRESS TABLE OVERRIDE === */
            [&_table]:w-full [&_table]:my-10 [&_table]:border-collapse [&_table]:text-sm [&_table]:rounded-xl [&_table]:overflow-hidden
            [&_thead]:bg-white/5
            [&_th]:text-white [&_th]:font-bold [&_th]:p-4 [&_th]:text-left [&_th]:border [&_th]:border-white/10
            [&_td]:p-4 [&_td]:border [&_td]:border-white/10 [&_td]:text-slate-300 [&_td]:align-top

            /* === LISTS OVERRIDE === */
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-6 [&_ul]:space-y-2 [&_li::marker]:text-[#0066FF]
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-6 [&_ol]:space-y-2
            [&_li]:text-slate-300

            /* === QUOTES OVERRIDE === */
            [&_blockquote]:border-l-4 [&_blockquote]:border-[#00E5FF] [&_blockquote]:bg-[#0066FF]/5 [&_blockquote]:px-8 [&_blockquote]:py-4 [&_blockquote]:rounded-r-xl [&_blockquote]:italic [&_blockquote]:my-8 [&_blockquote]:text-slate-200

            /* === CODE BLOCKS OVERRIDE (NEW) === */
            /* Inline code (e.g., inside a paragraph) */
            [&_p_code]:bg-white/10 [&_p_code]:text-[#00E5FF] [&_p_code]:px-1.5 [&_p_code]:py-0.5 [&_p_code]:rounded-md [&_p_code]:text-[0.9em] [&_p_code]:font-mono
            [&_li_code]:bg-white/10 [&_li_code]:text-[#00E5FF] [&_li_code]:px-1.5 [&_li_code]:py-0.5 [&_li_code]:rounded-md [&_li_code]:text-[0.9em] [&_li_code]:font-mono
            
            /* Preformatted code blocks */
            [&_pre]:bg-[#0a0f1a] [&_pre]:border [&_pre]:border-white/10 [&_pre]:rounded-xl [&_pre]:p-5 [&_pre]:my-8 [&_pre]:overflow-x-auto [&_pre]:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]
            [&_pre_code]:bg-transparent [&_pre_code]:text-slate-200 [&_pre_code]:p-0 [&_pre_code]:text-sm [&_pre_code]:font-mono [&_pre_code]:leading-relaxed
          "
          dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }} 
        />

        {/* 4. FOOTER CALL TO ACTION */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-24 pt-16 border-t border-white/5 flex flex-col items-center text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#0066FF]/10 blur-[50px] rounded-full pointer-events-none"></div>
          <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Ready to build this?</h3>
          <p className="text-slate-400 font-light mb-8 max-w-md text-lg">Our engineering team is ready to help you implement this exact architecture for your business.</p>
          <Link href="/contact" className="px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest text-white bg-gradient-to-r from-[#0066FF] to-[#00E5FF] hover:from-[#0052CC] hover:to-[#00B3CC] shadow-[0_0_20px_rgba(0,102,255,0.3)] transition-all hover:-translate-y-1">
            Consult our Team
          </Link>
        </motion.div>

      </div>
    </main>
  );
}