"use client";

import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { publishArticle } from "../../actions/publish";
import "react-quill-new/dist/quill.snow.css"; 
import SEOAnalyzer from "@/components/SEOAnalyzer";

const ReactQuill = dynamic(() => import("react-quill-new"), { 
  ssr: false,
  loading: () => (
    <div className="h-64 w-full bg-white/5 animate-pulse rounded-lg flex items-center justify-center text-slate-500 font-mono text-xs">
      SYNCHRONIZING RICH TEXT ENGINE...
    </div>
  )
}) as React.ComponentType<any>;

export default function IntelligenceEditor() {
  const [isPublishing, setIsPublishing] = useState(false);
  const [status, setStatus] = useState<{ type: 'error' | 'success' | null, msg: string }>({ type: null, msg: "" });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lastAutoSave, setLastAutoSave] = useState<string | null>(null);

  // --- CORE CONTENT STATE ---
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  
  // --- ASSET PIPELINE STATE ---
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // --- QUILL REFERENCE FOR CUSTOM INJECTION ---
  const quillRef = useRef<any>(null);

  // --- TAXONOMY & PUBLISHING STATE ---
  const [category, setCategory] = useState("Cloud Architecture");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [visibility, setVisibility] = useState("PUBLIC");
  const [publishedAt, setPublishedAt] = useState("");

  // ==========================================
  // AUTO-SAVE PROTOCOL (LOCAL STORAGE)
  // ==========================================
  useEffect(() => {
    // Restore on load
    const savedDraft = localStorage.getItem("stacklabx_editor_backup");
    if (savedDraft && !title && !content) {
      try {
        const parsed = JSON.parse(savedDraft);
        if (confirm("We found an unsaved backup of an article. Restore it?")) {
          setTitle(parsed.title || "");
          setSlug(parsed.slug || "");
          setContent(parsed.content || "");
          setExcerpt(parsed.excerpt || "");
          setTags(parsed.tags || []);
        } else {
          localStorage.removeItem("stacklabx_editor_backup");
        }
      } catch (e) { console.error("Backup parse failed"); }
    }
  }, []);

  useEffect(() => {
    // Save every 15 seconds if content exists
    const autoSaveTimer = setInterval(() => {
      if (title || content) {
        localStorage.setItem("stacklabx_editor_backup", JSON.stringify({ title, slug, excerpt, content, tags }));
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastAutoSave(`Local Backup: ${time}`);
      }
    }, 15000);
    return () => clearInterval(autoSaveTimer);
  }, [title, slug, excerpt, content, tags]);

  // ==========================================
  // CUSTOM QUILL INLINE IMAGE HANDLER (Base64 Killer)
  // ==========================================
  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (!file) return;

      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();

        if (data.success) {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection(true);
          // Inject the clean URL into the editor instead of Base64
          quill.insertEmbed(range.index, "image", data.url);
          quill.setSelection(range.index + 1);
        } else {
          alert("Inline image upload failed: " + data.error);
        }
      } catch (error) {
        alert("System error during inline image upload.");
      } finally {
        setIsUploading(false);
      }
    };
  }, []);

  // Modules must be memoized in ReactQuill so the editor doesn't lose focus while typing
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, false] }], 
        ['bold', 'italic', 'underline', 'strike'], 
        [{ 'list': 'ordered'}, { 'list': 'bullet' }], 
        ['link', 'image', 'blockquote', 'code-block'], // <-- Image button active
        ['clean'] 
      ],
      handlers: {
        image: imageHandler // <-- Binds our custom API uploader
      }
    }
  }), [imageHandler]);

  // --- HERO IMAGE HANDLERS ---
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
    } catch (error) { alert("System error during upload."); } finally { setIsUploading(false); }
  };

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) handleFileUpload(e.dataTransfer.files[0]);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = tagInput.trim();
      if (val && !tags.includes(val)) setTags([...tags, val]);
      setTagInput("");
    }
  };

  async function handlePublish(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPublishing(true);
    setStatus({ type: null, msg: "" });

    const submitter = (e.nativeEvent as any).submitter as HTMLButtonElement;
    const actionType = submitter.value; 

    const formData = new FormData(e.currentTarget);
    formData.set("content", content); 
    formData.set("image", imageUrl); 
    formData.set("status", actionType === "draft" ? "DRAFT" : "PUBLISHED"); 
    formData.set("category", category);
    formData.set("tags", JSON.stringify(tags));
    formData.set("visibility", visibility);
    if (publishedAt) formData.set("publishedAt", new Date(publishedAt).toISOString());

    const response = await publishArticle(formData);

    if (response.success) {
      setStatus({ type: 'success', msg: actionType === "draft" ? "Draft Saved to Vault" : response.message });
      if (actionType === "publish") {
        (e.target as HTMLFormElement).reset(); 
        setTitle(""); setSlug(""); setExcerpt(""); setContent(""); setImageUrl(""); setTags([]);
        localStorage.removeItem("stacklabx_editor_backup"); // Clear backup on successful publish
      }
      setIsDrawerOpen(false); 
    } else {
      setStatus({ type: 'error', msg: response.message });
    }
    setIsPublishing(false);
  }

  return (
    <main className="min-h-screen bg-[#000000] text-white pt-16 pb-32 selection:bg-blue-500/30 font-sans relative overflow-x-hidden">
      
      <style dangerouslySetInnerHTML={{__html: `
        .ql-toolbar { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1) !important; border-top-left-radius: 0.75rem; border-top-right-radius: 0.75rem; padding: 12px !important; }
        .ql-container { border: 1px solid rgba(255,255,255,0.1) !important; border-bottom-left-radius: 0.75rem; border-bottom-right-radius: 0.75rem; background: rgba(5,5,5,1); font-family: ui-sans-serif, system-ui, sans-serif; font-size: 1.1rem; }
        .ql-editor { min-height: 600px; color: #cbd5e1; padding: 2rem !important; line-height: 1.8; }
        .ql-editor h1, .ql-editor h2, .ql-editor h3 { color: #fff; font-weight: 900; margin-top: 2rem; margin-bottom: 1rem; }
        .ql-editor a { color: #3b82f6; text-decoration: underline; text-underline-offset: 4px; }
        .ql-editor blockquote { border-left: 4px solid #3b82f6; background: rgba(59, 130, 246, 0.05); color: #94a3b8; padding: 1rem 1.5rem; border-radius: 0 0.5rem 0.5rem 0; }
        .ql-snow .ql-stroke { stroke: #cbd5e1; }
        .ql-snow .ql-fill, .ql-snow .ql-stroke.ql-fill { fill: #cbd5e1; }
        .ql-snow .ql-picker { color: #cbd5e1; font-weight: bold; }
      `}} />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-900/10 blur-[150px] rounded-full"></div>
      </div>

      <div className={`max-w-5xl mx-auto px-6 relative z-10 transition-all duration-500 ${isDrawerOpen ? 'opacity-30 md:opacity-100 md:pr-[450px]' : ''}`}>
        
        <div className="mb-10 pt-8">
          <Link href="/admin" className="text-[10px] font-bold text-slate-500 hover:text-cyan-400 uppercase tracking-widest transition-colors mb-6 inline-flex items-center gap-2">
            <span>&larr;</span> Back to Nerve Center
          </Link>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
              </span>
              <p className="text-[10px] font-mono tracking-[0.2em] text-blue-400 uppercase">Focus Mode Active</p>
            </div>
            {/* Auto-Save Telemetry UI */}
            {lastAutoSave && (
              <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                {lastAutoSave}
              </p>
            )}
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter">Knowledge <span className="text-slate-500">Injection.</span></h1>
        </div>

        <form id="publish-form" onSubmit={handlePublish} className="space-y-10 mt-10">
          
          {status.type && (
            <div className={`p-4 rounded-xl border text-xs font-bold uppercase tracking-widest ${
              status.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}>
              {status.msg}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3 ml-1">Article Title</label>
              <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g. The Future of Edge Computing..." className="w-full bg-[#050505] border border-white/10 rounded-xl px-5 py-4 text-white font-bold text-lg focus:outline-none focus:border-blue-500 transition-all shadow-inner"/>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3 ml-1">URL Slug</label>
              <input type="text" name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required placeholder="e.g. future-of-edge-computing" className="w-full bg-[#050505] border border-white/10 rounded-xl px-5 py-4 text-slate-400 font-mono text-sm focus:outline-none focus:border-blue-500 transition-all shadow-inner"/>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3 ml-1">Hero Image</label>
            <div 
              onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
              className={`relative w-full h-64 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center overflow-hidden
                ${isDragging ? 'border-blue-500 bg-blue-500/10 scale-[1.02]' : 'border-white/10 bg-[#050505] hover:border-white/20'}
                ${imageUrl ? 'border-emerald-500/50' : ''}
              `}
            >
              <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])} />

              {isUploading ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs font-mono text-blue-400">ENCRYPTING ASSET...</span>
                </div>
              ) : imageUrl ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity" />
                  <div className="relative z-10 flex flex-col items-center bg-black/60 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mb-3">
                      <span className="text-emerald-500 text-xl">✓</span>
                    </div>
                    <span className="text-xs font-black text-white tracking-widest uppercase">Asset Locked Successfully</span>
                    <button type="button" onClick={() => setImageUrl("")} className="text-[10px] font-bold text-red-400 mt-3 hover:text-red-300 uppercase tracking-widest">Remove Asset ✕</button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-3 cursor-pointer p-8" onClick={() => fileInputRef.current?.click()}>
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-2 group-hover:bg-white/10 transition-colors">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                  </div>
                  <span className="text-sm font-black text-slate-300 tracking-widest uppercase">Drag & Drop Master Image</span>
                  <span className="text-[10px] font-mono text-slate-600">Supports JPG, PNG, WEBP (Max 5MB)</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3 ml-1">SEO Excerpt (Meta Description)</label>
            <textarea name="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required rows={2} placeholder="A high-impact 160 character summary..." className="w-full bg-[#050505] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-all resize-none shadow-inner"></textarea>
          </div>

          <div className="pb-12">
            <div className="flex justify-between items-end mb-3 ml-1">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Main Content Body</label>
            </div>
            <div className="relative z-20 shadow-2xl rounded-xl overflow-hidden bg-[#050505]">
              {/* Notice the added ref={quillRef} to attach our custom image handler */}
              <ReactQuill ref={quillRef} theme="snow" value={content} onChange={setContent} modules={modules} placeholder="Initialize core thesis here..."/>
            </div>
          </div>
        </form>
      </div>

      {/* FLOATING ACTION BUTTON */}
      <button onClick={() => setIsDrawerOpen(true)} className={`fixed bottom-8 right-8 z-40 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black px-8 py-5 rounded-full shadow-[0_0_30px_rgba(0,102,255,0.4)] hover:scale-105 transition-all flex items-center gap-3 uppercase tracking-widest text-[10px] ${isDrawerOpen ? 'translate-x-32 opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'}`}>
        <span>⌖</span> Settings & Deploy
      </button>

      {/* =====================================
          THE SLIDE-OVER COMMAND DRAWER 
          ===================================== */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#020202] border-l border-white/10 shadow-2xl z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-xl">
          <h2 className="text-sm font-black text-white uppercase tracking-widest">Protocol Settings</h2>
          <button type="button" onClick={() => setIsDrawerOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-8">
          
          <div className="bg-[#050505] border border-white/10 rounded-2xl p-5 shadow-lg space-y-5">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-white/5 pb-2">Network Routing</h3>
            
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-2">Silo (Category)</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm font-bold text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer">
                <option value="Cloud Architecture">Cloud Architecture</option>
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Business Automation">Business Automation</option>
              </select>
            </div>

            <div>
              <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-2">Internal Tags</label>
              <div className="w-full bg-black/50 border border-white/10 rounded-lg p-2 min-h-[46px] flex flex-wrap gap-2 items-center focus-within:border-blue-500 transition-colors cursor-text" onClick={() => document.getElementById('tag-input')?.focus()}>
                {tags.map((tag, idx) => (
                  <span key={idx} className="flex items-center gap-1 px-2 py-1 rounded bg-white/10 text-[10px] font-bold text-white border border-white/5">
                    {tag} <button type="button" onClick={(e) => { e.stopPropagation(); setTags(tags.filter((_, i) => i !== idx)); }} className="text-slate-400 hover:text-red-400 ml-1">✕</button>
                  </span>
                ))}
                <input id="tag-input" type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleTagKeyDown} placeholder={tags.length === 0 ? "Type tag & hit Enter..." : ""} className="flex-1 min-w-[100px] bg-transparent border-none focus:outline-none text-xs font-bold text-white placeholder:text-slate-600 placeholder:font-normal" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-2">Visibility</label>
                <select value={visibility} onChange={(e) => setVisibility(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer">
                  <option value="PUBLIC">🌐 Public</option>
                  <option value="PRIVATE">🔒 Private</option>
                  <option value="PASSWORD">🔑 Password</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-2">Deploy Date</label>
                <input type="datetime-local" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-blue-500 [color-scheme:dark]"/>
              </div>
            </div>
          </div>

          <SEOAnalyzer title={title} excerpt={excerpt} content={content} slug={slug} />

        </div>

        <div className="p-6 border-t border-white/10 bg-black/80 flex flex-col gap-4">
          <button type="submit" form="publish-form" name="action" value="draft" disabled={isPublishing} className="w-full rounded-xl bg-transparent border border-white/20 text-slate-300 font-bold px-10 py-4 text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-all disabled:opacity-50">
            {isPublishing ? "Processing..." : "Save to Vault (Draft)"}
          </button>
          <button type="submit" form="publish-form" name="action" value="publish" disabled={isPublishing} className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black px-10 py-4 text-xs uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(0,102,255,0.3)] hover:shadow-[0_0_30px_rgba(0,102,255,0.5)] disabled:opacity-50">
            <span className="relative z-10">{isPublishing ? "Deploying..." : "Execute Deployment"}</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
          </button>
        </div>
      </div>

    </main>
  );
}