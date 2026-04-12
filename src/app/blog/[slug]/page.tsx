"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { getArticle, updateArticle } from "@/app/actions/edit";
import "react-quill-new/dist/quill.snow.css"; 

const ReactQuill = dynamic(() => import("react-quill-new"), { 
  ssr: false,
  loading: () => (
    <div className="h-64 w-full bg-white/5 animate-pulse rounded-lg flex items-center justify-center text-slate-500 font-mono text-xs">
      SYNCHRONIZING RICH TEXT ENGINE...
    </div>
  )
}) as any;

export default function EditMatrix() {
  const params = useParams();
  const router = useRouter();
  
  // Safely extract the slug string
  const originalSlug = typeof params?.slug === 'string' ? params.slug : '';

  const [isLoading, setIsLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [status, setStatus] = useState<{ type: 'error' | 'success' | null, msg: string }>({ type: null, msg: "" });
  
  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
  // Asset State
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchPayload() {
      if (!originalSlug) return;
      const post = await getArticle(originalSlug);
      if (post) {
        setTitle(post.title);
        setSlug(post.slug);
        setExcerpt(post.excerpt || "");
        setContent(post.content || "");
        setImageUrl(post.image || "");
      } else {
        setStatus({ type: 'error', msg: "Payload not found in database." });
      }
      setIsLoading(false);
    }
    fetchPayload();
  }, [originalSlug]);

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) setImageUrl(data.url);
      else alert("Upload failed: " + data.error);
    } catch (error) {
      alert("System error during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) handleFileUpload(e.dataTransfer.files[0]);
  };

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPublishing(true);
    setStatus({ type: null, msg: "" });

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("excerpt", excerpt);
    formData.append("content", content);
    formData.append("image", imageUrl); 

    const response = await updateArticle(formData, originalSlug);

    if (response.success) {
      setStatus({ type: 'success', msg: response.message });
      // Redirect back to protocols after a short delay
      setTimeout(() => router.push('/admin/protocols'), 1500);
    } else {
      setStatus({ type: 'error', msg: response.message });
    }
    setIsPublishing(false);
  }

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-cyan-500 font-mono text-xs uppercase animate-pulse">Decrypting Payload...</div>;

  return (
    <main className="min-h-screen text-white pt-10 pb-20 selection:bg-emerald-500/30 font-sans w-full">
      
      <style dangerouslySetInnerHTML={{__html: `
        .ql-toolbar { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1) !important; border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem; }
        .ql-container { border: 1px solid rgba(255,255,255,0.1) !important; border-bottom-left-radius: 0.5rem; border-bottom-right-radius: 0.5rem; background: #000; font-family: ui-sans-serif, system-ui, sans-serif; font-size: 1rem; }
        .ql-editor { min-height: 400px; color: #cbd5e1; }
        .ql-editor h1, .ql-editor h2, .ql-editor h3 { color: #fff; font-weight: 900; margin-bottom: 1rem; }
        .ql-editor a { color: #10b981; }
        .ql-editor blockquote { border-left: 4px solid #10b981; background: rgba(16, 185, 129, 0.1); color: #94a3b8; font-style: normal; }
        .ql-snow .ql-stroke { stroke: #cbd5e1; }
        .ql-snow .ql-fill, .ql-snow .ql-stroke.ql-fill { fill: #cbd5e1; }
        .ql-snow .ql-picker { color: #cbd5e1; }
      `}} />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        <div className="mb-12">
          <Link href="/admin/protocols" className="text-[10px] font-bold text-slate-500 hover:text-emerald-400 uppercase tracking-widest transition-colors mb-6 inline-block">
            &larr; Abort Modification
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <p className="text-[10px] font-mono tracking-[0.2em] text-emerald-400 uppercase">Modification Matrix Active</p>
          </div>
          <h1 className="text-5xl font-black tracking-tighter">Edit <span className="text-slate-500">Payload.</span></h1>
        </div>

        <div className="bg-[#050505] border border-emerald-500/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          
          {status.type && (
            <div className={`p-4 mb-8 rounded-lg border text-xs font-bold uppercase tracking-widest ${
              status.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}>
              {status.msg}
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Article Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all"/>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">URL Slug</label>
                <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-slate-300 font-mono text-sm focus:outline-none focus:border-emerald-500 transition-all"/>
              </div>
            </div>

            {/* NATIVE DROPZONE */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Hero Image</label>
              <div 
                onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
                className={`relative w-full h-48 rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center overflow-hidden
                  ${isDragging ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/10 bg-white/5 hover:border-white/20'}
                  ${imageUrl ? 'border-emerald-500/50' : ''}
                `}
              >
                <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}/>
                {isUploading ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-xs font-mono text-emerald-400">ENCRYPTING ASSET...</span>
                  </div>
                ) : imageUrl ? (
                  <>
                    <img src={imageUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity" />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mb-2"><span className="text-emerald-500">✓</span></div>
                      <span className="text-xs font-bold text-white tracking-widest uppercase">Asset Locked</span>
                      <button type="button" onClick={() => setImageUrl("")} className="text-[9px] text-red-400 mt-2 hover:text-red-300 underline">Replace Asset</button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                    <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Drag & Drop Image</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">SEO Excerpt (Meta Description)</label>
              <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all resize-none"></textarea>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Main Content</label>
                <span className="text-[9px] text-emerald-400 font-mono">WYSIWYG ACTIVE</span>
              </div>
              <div className="relative z-20">
                <ReactQuill theme="snow" value={content} onChange={setContent} />
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex justify-end">
              <button type="submit" disabled={isPublishing} className="relative group overflow-hidden rounded bg-white text-black font-black px-10 py-4 text-xs uppercase tracking-[0.2em] transition-all disabled:opacity-50">
                <span className="relative z-10">{isPublishing ? "Synchronizing..." : "Update Payload"}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
              </button>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
}