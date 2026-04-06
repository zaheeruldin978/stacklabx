"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { publishArticle } from "../../actions/publish";
import "react-quill-new/dist/quill.snow.css"; 

const ReactQuill = dynamic(() => import("react-quill-new"), { 
  ssr: false,
  loading: () => (
    <div className="h-64 w-full bg-white/5 animate-pulse rounded-lg flex items-center justify-center text-slate-500 font-mono text-xs">
      SYNCHRONIZING RICH TEXT ENGINE...
    </div>
  )
}) as any;

export default function IntelligenceEditor() {
  const [isPublishing, setIsPublishing] = useState(false);
  const [status, setStatus] = useState<{ type: 'error' | 'success' | null, msg: string }>({ type: null, msg: "" });
  const [content, setContent] = useState("");
  
  // --- ASSET PIPELINE STATE ---
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }], 
      ['bold', 'italic', 'underline', 'strike'], 
      [{ 'list': 'ordered'}, { 'list': 'bullet' }], 
      ['link', 'blockquote', 'code-block'], 
      ['clean'] 
    ],
  };

  // --- ASSET UPLOAD LOGIC ---
  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setIsUploading(true);
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (data.success) {
        setImageUrl(data.url); // Save the generated URL to state
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (error) {
      alert("System error during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  async function handlePublish(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPublishing(true);
    setStatus({ type: null, msg: "" });

    const formData = new FormData(e.currentTarget);
    formData.set("content", content); 
    // Inject the uploaded image URL into the payload
    formData.set("image", imageUrl); 

    const response = await publishArticle(formData);

    if (response.success) {
      setStatus({ type: 'success', msg: response.message });
      (e.target as HTMLFormElement).reset(); 
      setContent(""); 
      setImageUrl(""); // Clear the image preview
    } else {
      setStatus({ type: 'error', msg: response.message });
    }
    setIsPublishing(false);
  }

  return (
    <main className="min-h-screen bg-[#000000] text-white pt-32 pb-20 selection:bg-blue-500/30 font-sans">
      
      <style dangerouslySetInnerHTML={{__html: `
        .ql-toolbar { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1) !important; border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem; }
        .ql-container { border: 1px solid rgba(255,255,255,0.1) !important; border-bottom-left-radius: 0.5rem; border-bottom-right-radius: 0.5rem; background: #000; font-family: ui-sans-serif, system-ui, sans-serif; font-size: 1rem; }
        .ql-editor { min-height: 400px; color: #cbd5e1; }
        .ql-editor h1, .ql-editor h2, .ql-editor h3 { color: #fff; font-weight: 900; margin-bottom: 1rem; }
        .ql-editor a { color: #3b82f6; }
        .ql-editor blockquote { border-left: 4px solid #3b82f6; background: rgba(59, 130, 246, 0.1); color: #94a3b8; font-style: normal; }
        .ql-snow .ql-stroke { stroke: #cbd5e1; }
        .ql-snow .ql-fill, .ql-snow .ql-stroke.ql-fill { fill: #cbd5e1; }
        .ql-snow .ql-picker { color: #cbd5e1; }
      `}} />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-900/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        <div className="mb-12">
          <Link href="/admin" className="text-[10px] font-bold text-slate-500 hover:text-cyan-400 uppercase tracking-widest transition-colors mb-6 inline-block">
            &larr; Back to Nerve Center
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
            </span>
            <p className="text-[10px] font-mono tracking-[0.2em] text-blue-400 uppercase">Publishing Matrix Online</p>
          </div>
          <h1 className="text-5xl font-black tracking-tighter">Knowledge <span className="text-slate-500">Injection.</span></h1>
        </div>

        <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          
          {status.type && (
            <div className={`p-4 mb-8 rounded-lg border text-xs font-bold uppercase tracking-widest ${
              status.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}>
              {status.msg}
            </div>
          )}

          <form onSubmit={handlePublish} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Article Title</label>
                <input type="text" name="title" required placeholder="e.g. The Future of Edge Computing..." className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"/>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">URL Slug</label>
                <input type="text" name="slug" required placeholder="e.g. future-of-edge-computing" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-slate-300 font-mono text-sm focus:outline-none focus:border-blue-500 transition-all"/>
              </div>
            </div>

            {/* --- NATIVE DROPZONE ENGINE --- */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Hero Image</label>
              
              <div 
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`relative w-full h-48 rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center overflow-hidden
                  ${isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 bg-white/5 hover:border-white/20'}
                  ${imageUrl ? 'border-emerald-500/50' : ''}
                `}
              >
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                />

                {isUploading ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-xs font-mono text-blue-400">ENCRYPTING ASSET...</span>
                  </div>
                ) : imageUrl ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imageUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity" />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mb-2">
                        <span className="text-emerald-500">✓</span>
                      </div>
                      <span className="text-xs font-bold text-white tracking-widest uppercase">Asset Locked</span>
                      <button type="button" onClick={() => setImageUrl("")} className="text-[9px] text-red-400 mt-2 hover:text-red-300 underline">Remove Asset</button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                    </svg>
                    <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Drag & Drop Image</span>
                    <span className="text-[9px] font-mono text-slate-600">OR CLICK TO BROWSE</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">SEO Excerpt (Meta Description)</label>
              <textarea name="excerpt" required rows={2} placeholder="A high-impact 160 character summary..." className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all resize-none"></textarea>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Main Content</label>
                <span className="text-[9px] text-blue-400 font-mono">WYSIWYG ACTIVE</span>
              </div>
              
              <div className="relative z-20">
                <ReactQuill 
                  theme="snow" 
                  value={content} 
                  onChange={setContent} 
                  modules={modules}
                  placeholder="Initialize core thesis here..."
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex justify-end">
              <button type="submit" disabled={isPublishing} className="relative group overflow-hidden rounded bg-white text-black font-black px-10 py-4 text-xs uppercase tracking-[0.2em] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="relative z-10">{isPublishing ? "Deploying..." : "Deploy to Network"}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
              </button>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
}