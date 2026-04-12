"use client";

import { useState, useEffect, use, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import { getArticle, updateArticle } from "@/app/actions/edit"; 
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { 
  ssr: false,
  loading: () => <div className="h-96 w-full bg-white/5 animate-pulse rounded-xl border border-white/10" />
}) as any;

export default function EditPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  
  // State Matrix
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function loadPost() {
      const post = await getArticle(resolvedParams.slug);
      if (post) {
        setTitle(post.title);
        setSlug(post.slug);
        setExcerpt(post.excerpt || "");
        setContent(post.content || "");
        setImageUrl(post.image || "");
      }
      setLoading(false);
    }
    loadPost();
  }, [resolvedParams.slug]);

  const handleSync = async () => {
    setIsSyncing(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("excerpt", excerpt);
    formData.append("content", content);
    formData.append("image", imageUrl);

    const result = await updateArticle(formData, resolvedParams.slug);
    if (result.success) {
      router.push('/admin/protocols');
    } else {
      alert("Synchronization Failed: " + result.message);
      setIsSyncing(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-[10px] font-mono text-emerald-500 tracking-[0.5em] animate-pulse uppercase">
        Establishing Secure Data Link...
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#000] text-slate-200 pb-32 selection:bg-emerald-500/30 font-sans w-full">
      {/* PROFESSIONAL QUILL OVERRIDES */}
      <style dangerouslySetInnerHTML={{__html: `
        .ql-toolbar.ql-snow { border: 1px solid rgba(255,255,255,0.1) !important; background: #0a0a0a !important; border-top-left-radius: 12px; border-top-right-radius: 12px; margin-top: 20px; padding: 15px !important; }
        .ql-container.ql-snow { border: 1px solid rgba(255,255,255,0.1) !important; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; background: #050505 !important; font-size: 18px; min-height: 800px; }
        .ql-editor { color: #cbd5e1 !important; line-height: 1.8; padding: 40px !important; }
        .ql-editor h2 { color: #fff !important; font-weight: 800; margin-top: 40px; }
        .ql-snow .ql-stroke { stroke: #94a3b8 !important; }
        .ql-snow .ql-picker { color: #94a3b8 !important; }
      `}} />

      {/* STICKY CONTROL BAR */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5 py-4 mb-12">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
            <Link href="/admin/protocols" className="text-[10px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">
              &larr; Protocols
            </Link>
            <div className="flex items-center gap-6">
                <span className="text-[9px] font-mono text-emerald-500/50 uppercase hidden md:block">Mode: Global Edit</span>
                <button 
                    onClick={handleSync}
                    disabled={isSyncing}
                    className="px-8 py-3 bg-white text-black font-black uppercase text-[10px] tracking-[0.2em] rounded hover:bg-emerald-400 transition-all disabled:opacity-50"
                >
                    {isSyncing ? "Syncing..." : "Push Changes"}
                </button>
            </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6">
        
        {/* HEADLINE SECTION */}
        <div className="mb-12">
          <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent border-none p-0 text-4xl md:text-6xl font-black text-white outline-none placeholder:text-white/10 transition-all mb-4"
            placeholder="Payload Headline..."
          />
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Post ID: {resolvedParams.slug}</p>
          </div>
        </div>

        {/* METADATA GRID (Compact Row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
            <div className="space-y-4">
                <div>
                    <label className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-2 block">URL Path (Slug)</label>
                    <input 
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="w-full bg-black border border-white/10 p-3 rounded text-xs font-mono text-cyan-500 outline-none focus:border-cyan-500/50"
                    />
                </div>
                <div>
                    <label className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-2 block">Hero Asset URL</label>
                    <input 
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full bg-black border border-white/10 p-3 rounded text-[10px] text-slate-400 outline-none"
                    />
                </div>
            </div>
            <div>
                <label className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-2 block">SEO Brief (Excerpt)</label>
                <textarea 
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={5}
                  className="w-full bg-black border border-white/10 p-3 rounded text-xs text-slate-400 outline-none focus:border-emerald-500/50 resize-none leading-relaxed"
                  placeholder="Summarize for global search engines..."
                />
            </div>
        </div>

        {/* HERO PREVIEW (Optional/Conditional) */}
        {imageUrl && (
            <div className="mb-12 rounded-2xl overflow-hidden border border-white/10 aspect-video group relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img src={imageUrl} alt="Hero" className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700" />
                <span className="absolute bottom-4 left-6 z-20 text-[9px] font-black uppercase tracking-widest text-white/50">Active Hero Asset</span>
            </div>
        )}

        {/* THE MAIN CONTENT ENGINE */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Primary Body Content</label>
            <span className="text-[9px] font-mono text-emerald-500/40 italic">Drafting Live...</span>
          </div>
          <ReactQuill value={content} onChange={setContent} theme="snow" />
        </div>

      </div>
    </main>
  );
}