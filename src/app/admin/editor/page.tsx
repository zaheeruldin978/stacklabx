"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { publishArticle } from "../../actions/publish";
import SEOAnalyzer from "@/components/SEOAnalyzer";

// 1. TIPTAP V3 CORE & MENUS
import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';

// 2. EXTENSIONS
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import LinkExtension from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Typography from '@tiptap/extension-typography';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import Youtube from '@tiptap/extension-youtube';
import FontFamily from '@tiptap/extension-font-family';
import CharacterCount from '@tiptap/extension-character-count';

// NEW ELITE MECHANICS
import Gapcursor from '@tiptap/extension-gapcursor';
import Dropcursor from '@tiptap/extension-dropcursor';

// ADVANCED SYNTAX HIGHLIGHTING
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import 'highlight.js/styles/atom-one-dark.css';

// 3. TIPTAP V3 NAMED EXPORTS
// @ts-ignore
import { Table } from '@tiptap/extension-table';
// @ts-ignore
import { TableRow } from '@tiptap/extension-table-row';
// @ts-ignore
import { TableCell } from '@tiptap/extension-table-cell';
// @ts-ignore
import { TableHeader } from '@tiptap/extension-table-header';
// @ts-ignore
import { TextStyle } from '@tiptap/extension-text-style';
// @ts-ignore
import { Color } from '@tiptap/extension-color';

const lowlight = createLowlight(common);

// --- SUB-COMPONENT: THE GOD-MODE TOOLBAR ---
const MenuBar = ({ editor }: { editor: any }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fontInputRef = useRef<HTMLInputElement>(null);
  const [dynamicFonts, setDynamicFonts] = useState<string[]>([]);

  if (!editor) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success && data.url) editor.chain().focus().setImage({ src: data.url }).run();
    } catch (error) { console.error("Upload failed:", error); }
  };

  const handleFontUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const safeName = file.name.split('.')[0].replace(/[^a-zA-Z0-9]/g, ' ');
    const customFontName = window.prompt("Name this custom font for your editor:", safeName);

    if (!customFontName) {
      if (fontInputRef.current) fontInputRef.current.value = ''; 
      return;
    }
    const fontUrl = URL.createObjectURL(file);
    const styleNode = document.createElement('style');
    styleNode.innerHTML = `@font-face { font-family: '${customFontName}'; src: url('${fontUrl}'); }`;
    document.head.appendChild(styleNode);
    setDynamicFonts((prev) => [...prev, customFontName]);
    editor.chain().focus().setFontFamily(customFontName).run();
    if (fontInputRef.current) fontInputRef.current.value = '';
  };

  const btnClass = (isActive: boolean) => 
    `p-2 rounded-lg transition-all duration-200 flex items-center justify-center w-8 h-8 text-[11px] font-bold ${
      isActive ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.2)]' : 'bg-transparent text-slate-400 hover:bg-white/10 hover:text-white border border-transparent'
    }`;

  return (
    <div className="sticky top-[80px] z-40 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 mb-8 flex flex-wrap items-center gap-1 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
      
      {/* TIME TRAVEL & CLEANUP */}
      <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className={btnClass(false)} title="Undo (Ctrl+Z)">↶</button>
      <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className={btnClass(false)} title="Redo (Ctrl+Y)">↷</button>
      <button type="button" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} className="p-2 w-8 h-8 flex items-center justify-center text-red-400 hover:bg-red-500/20 rounded-lg font-bold text-[11px]" title="Clear All Formatting">⌫</button>

      <div className="w-[1px] h-6 bg-white/10 mx-1" />

      {/* DYNAMIC LOCAL FONT ENGINE */}
      <select 
        onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
        value={editor.getAttributes('textStyle').fontFamily || ''}
        className="bg-black border border-white/20 text-slate-300 text-[11px] font-bold rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer appearance-none text-center max-w-[120px] truncate"
        title="Select Font"
      >
        <option value="">System Default</option>
        <option value="Inter, sans-serif">Inter</option>
        <option value="ui-serif, Georgia, Cambria, Times New Roman, Times, serif">Serif</option>
        <option value="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace">Monospace</option>
        {dynamicFonts.map((font, idx) => (
          <option key={idx} value={font} style={{ fontFamily: font }}>{font} (Local)</option>
        ))}
      </select>
      <button type="button" onClick={() => fontInputRef.current?.click()} className={btnClass(false)} title="Upload Local Font File (.ttf, .otf)">F↑</button>
      <input type="file" ref={fontInputRef} onChange={handleFontUpload} className="hidden" accept=".ttf,.otf,.woff,.woff2" />

      <div className="w-[1px] h-6 bg-white/10 mx-1" />

      {/* HIERARCHY */}
      <button type="button" onClick={() => editor.chain().focus().setParagraph().run()} className={btnClass(editor.isActive('paragraph'))} title="Paragraph">P</button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={btnClass(editor.isActive('heading', { level: 1 }))} title="Heading 1">H1</button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive('heading', { level: 2 }))} title="Heading 2">H2</button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btnClass(editor.isActive('heading', { level: 3 }))} title="Heading 3">H3</button>

      <div className="w-[1px] h-6 bg-white/10 mx-1" />

      {/* CORE TYPOGRAPHY */}
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive('bold'))} title="Bold">B</button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive('italic'))} title="Italic"><i className="font-serif">I</i></button>
      <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={btnClass(editor.isActive('underline'))} title="Underline"><u className="underline-offset-2">U</u></button>
      <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={btnClass(editor.isActive('strike'))} title="Strikethrough"><s>S</s></button>
      <button type="button" onClick={() => editor.chain().focus().toggleSuperscript().run()} className={btnClass(editor.isActive('superscript'))} title="Superscript">X²</button>
      <button type="button" onClick={() => editor.chain().focus().toggleSubscript().run()} className={btnClass(editor.isActive('subscript'))} title="Subscript">X₂</button>
      
      {/* COLOR ENGINES: Text Color & Multi-Color Highlight */}
      <div className="flex items-center bg-white/5 rounded-lg ml-1 px-1 border border-white/5">
        <input type="color" onInput={(event) => editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()} value={editor.getAttributes('textStyle').color || '#ffffff'} className="w-5 h-5 rounded cursor-pointer border-0 p-0 bg-transparent mx-1" title="Text Color" />
        <div className="w-[1px] h-4 bg-white/20 mx-1" />
        <button type="button" onClick={() => editor.chain().focus().toggleHighlight().run()} className={btnClass(editor.isActive('highlight'))} title="Highlight Text">🖍️</button>
        {/* NEW: Multi-Color Highlight Picker */}
        <input type="color" onInput={(event) => editor.chain().focus().toggleHighlight({ color: (event.target as HTMLInputElement).value }).run()} className="w-5 h-5 rounded cursor-pointer border-0 p-0 bg-transparent mx-1" title="Pick Highlight Color" />
      </div>

      <div className="w-[1px] h-6 bg-white/10 mx-1" />
      
      {/* ALIGNMENT */}
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={btnClass(editor.isActive({ textAlign: 'left' }))} title="Align Left">⇤</button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={btnClass(editor.isActive({ textAlign: 'center' }))} title="Align Center">⇹</button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={btnClass(editor.isActive({ textAlign: 'right' }))} title="Align Right">⇥</button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={btnClass(editor.isActive({ textAlign: 'justify' }))} title="Justify">≡</button>

      <div className="w-[1px] h-6 bg-white/10 mx-1" />
      
      {/* STRUCTURAL BLOCKS */}
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive('bulletList'))} title="Bullet List">•</button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive('orderedList'))} title="Numbered List">1.</button>
      <button type="button" onClick={() => editor.chain().focus().toggleTaskList().run()} className={btnClass(editor.isActive('taskList'))} title="To-Do List">☑</button>
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btnClass(editor.isActive('blockquote'))} title="Quote Block">""</button>
      <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={btnClass(editor.isActive('codeBlock'))} title="Intelligent Code Block">&lt;/&gt;</button>
      <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className={btnClass(false)} title="Divider Line">---</button>

      <div className="w-[1px] h-6 bg-white/10 mx-1" />

      {/* MEDIA, LINKS, & TABLES */}
      <button type="button" onClick={() => {
          const url = window.prompt('Enter URL:');
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }} 
        className={btnClass(editor.isActive('link'))} title="Insert Link">🔗</button>
      
      <button type="button" onClick={() => fileInputRef.current?.click()} className={btnClass(false)} title="Upload Inline Image">🖼️</button>
      <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />

      <button type="button" onClick={() => {
          const url = window.prompt('Enter YouTube URL:');
          if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run();
        }} 
        className={btnClass(editor.isActive('youtube'))} title="Embed YouTube Video">▶️</button>

      <button type="button" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className={btnClass(editor.isActive('table'))} title="Insert Table">📊</button>
      
      {/* TABLE CONTROLS */}
      {editor.isActive('table') && (
        <div className="flex bg-blue-500/10 rounded-lg ml-1 border border-blue-500/20">
          <button type="button" onClick={() => editor.chain().focus().addColumnAfter().run()} className={btnClass(false)} title="Add Column">C+</button>
          <button type="button" onClick={() => editor.chain().focus().addRowAfter().run()} className={btnClass(false)} title="Add Row">R+</button>
          <button type="button" onClick={() => editor.chain().focus().deleteTable().run()} className="p-2 w-8 h-8 flex items-center justify-center text-red-400 hover:bg-red-500/20 rounded-lg font-bold text-[11px]" title="Delete Table">✕</button>
        </div>
      )}
    </div>
  );
};

export default function IntelligenceEditor() {
  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);
  const [status, setStatus] = useState<{ type: 'error' | 'success' | null, msg: string }>({ type: null, msg: "" });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lastAutoSave, setLastAutoSave] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [category, setCategory] = useState("Cloud Architecture");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [visibility, setVisibility] = useState("PUBLIC");
  const [publishedAt, setPublishedAt] = useState("");

  const editor = useEditor({
    immediatelyRender: false, 
    extensions: [
      StarterKit.configure({ codeBlock: false }), 
      CodeBlockLowlight.configure({ lowlight }),
      Underline,
      Typography,
      Superscript,
      Subscript,
      TextStyle,
      Color,
      FontFamily,
      CharacterCount,
      Gapcursor, // FIXED: Eliminates Trapped Cursors around Tables/Videos
      Dropcursor.configure({ color: '#3b82f6', width: 2 }), // FIXED: Precision Blue Line for Drag & Drop
      Highlight.configure({ multicolor: true }), // FIXED: Dynamic Background Colors allowed
      TextAlign.configure({ types: ['heading', 'paragraph'], alignments: ['left', 'center', 'right', 'justify'] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Image.configure({ inline: true, HTMLAttributes: { class: 'rounded-xl border border-white/10 my-8 w-full max-w-full shadow-2xl' } }),
      // FIXED: Smart Auto-Linking enabled
      LinkExtension.configure({ openOnClick: false, autolink: true, HTMLAttributes: { class: 'text-blue-500 underline hover:text-blue-400 transition-colors cursor-pointer underline-offset-4' } }), 
      Youtube.configure({ inline: false, HTMLAttributes: { class: 'w-full aspect-video rounded-xl border border-white/10 my-8 shadow-2xl bg-black' } }),
      Table.configure({ resizable: true, HTMLAttributes: { class: 'w-full border-collapse border border-white/20 my-8 text-sm' } }),
      TableRow,
      TableHeader.configure({ HTMLAttributes: { class: 'border border-white/20 bg-white/5 p-3 font-bold text-left text-white' } }),
      TableCell.configure({ HTMLAttributes: { class: 'border border-white/20 p-3 relative group' } }),
      Placeholder.configure({ placeholder: "Start drafting... Try typing '# ' for a heading, '* ' for a bullet, or '[ ] ' for a checklist." })
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose-none focus:outline-none min-h-[600px] w-full text-slate-300 leading-relaxed text-lg transition-all',
      },
    },
  });

  useEffect(() => {
    const savedDraft = localStorage.getItem("stacklabx_editor_backup");
    if (savedDraft && !title && !content && editor) {
      try {
        const parsed = JSON.parse(savedDraft);
        if (confirm("We found an unsaved backup of an article. Restore it?")) {
          setTitle(parsed.title || "");
          setSlug(parsed.slug || "");
          setExcerpt(parsed.excerpt || "");
          setTags(parsed.tags || []);
          const restoredContent = parsed.content || "";
          setContent(restoredContent);
          editor.commands.setContent(restoredContent);
        } else {
          localStorage.removeItem("stacklabx_editor_backup");
        }
      } catch (e) { console.error("Backup parse failed"); }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  useEffect(() => {
    const autoSaveTimer = setInterval(() => {
      if (title || content) {
        localStorage.setItem("stacklabx_editor_backup", JSON.stringify({ title, slug, excerpt, content, tags }));
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastAutoSave(`Local Backup: ${time}`);
      }
    }, 15000);
    return () => clearInterval(autoSaveTimer);
  }, [title, slug, excerpt, content, tags]);

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
        if (editor) editor.commands.clearContent();
        localStorage.removeItem("stacklabx_editor_backup");
      }
      setIsDrawerOpen(false); 
    } else {
      setStatus({ type: 'error', msg: response.message });
    }
    setIsPublishing(false);
  }

  return (
    <main className="min-h-screen bg-[#000000] text-white pt-16 pb-32 selection:bg-blue-500/30 font-sans relative overflow-x-hidden">
      
      {/* TIPTAP CORE STYLES & AGGRESSIVE SANITIZATION */}
      <style dangerouslySetInnerHTML={{__html: `
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder); float: left; color: #475569; pointer-events: none; height: 0; font-family: ui-monospace, monospace; font-size: 0.875rem;
        }
        .ProseMirror * { background-color: transparent !important; }
        
        .ProseMirror h1 { font-size: 2.5rem; font-weight: 900; margin-top: 2.5rem; margin-bottom: 1rem; letter-spacing: -0.025em; line-height: 1.2; }
        .ProseMirror h2 { font-size: 2rem; font-weight: 800; margin-top: 2.5rem; margin-bottom: 1rem; letter-spacing: -0.025em; line-height: 1.3; }
        .ProseMirror h3 { font-size: 1.5rem; font-weight: 700; margin-top: 2rem; margin-bottom: 0.75rem; }
        .ProseMirror h4 { font-size: 1.25rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.5rem; }
        .ProseMirror p { margin-bottom: 1.5rem; }
        
        /* Highlight Overrides */
        .ProseMirror mark { background-color: inherit !important; color: inherit; border-radius: 0.25rem; padding: 0.1rem 0.2rem; }
        
        .ProseMirror u { text-decoration: underline; text-underline-offset: 4px; }
        .ProseMirror blockquote { border-left: 4px solid #3b82f6; background: rgba(59, 130, 246, 0.05) !important; padding: 1rem 1.5rem; border-radius: 0 0.5rem 0.5rem 0; margin: 2rem 0; color: #94a3b8; font-style: normal; }
        .ProseMirror hr { border-color: rgba(255,255,255,0.1); margin: 3rem 0; }
        
        .ProseMirror ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .ProseMirror ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .ProseMirror li { margin-bottom: 0.5rem; }
        
        ul[data-type="taskList"] { list-style: none; padding: 0; }
        ul[data-type="taskList"] li { display: flex; align-items: flex-start; gap: 0.75rem; margin-bottom: 0.5rem; }
        ul[data-type="taskList"] li > label { margin-top: 0.3rem; display: flex; }
        ul[data-type="taskList"] li > label > input { accent-color: #3b82f6; width: 1.1rem; height: 1.1rem; cursor: pointer; }
        ul[data-type="taskList"] li > div { flex: 1 1 auto; }
        
        .ProseMirror a { color: #3b82f6 !important; text-decoration: underline !important; font-weight: 600; cursor: pointer; }
        .ProseMirror a:hover { color: #60a5fa !important; }
        
        /* Gapcursor & Dropcursor */
        .ProseMirror-gapcursor { display: none; pointer-events: none; position: absolute; }
        .ProseMirror-gapcursor:after { content: ""; display: block; position: absolute; top: -2px; width: 20px; border-top: 2px solid #3b82f6; animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite; }
        @keyframes ProseMirror-cursor-blink { to { visibility: hidden; } }
        .ProseMirror:focus .ProseMirror-gapcursor { display: block; }
        
        /* Advanced Syntax Highlighting Styles */
        .ProseMirror pre { background: #0d1117 !important; color: #c9d1d9 !important; padding: 1.5rem; border-radius: 0.75rem; border: 1px solid rgba(255,255,255,0.1); font-family: ui-monospace, SFMono-Regular, Consolas, monospace !important; margin: 2rem 0; overflow-x: auto; }
        .ProseMirror pre code { background: none !important; padding: 0 !important; font-size: 0.875rem !important; color: inherit !important; }
        .ProseMirror p code { font-family: ui-monospace, monospace !important; background: rgba(255,255,255,0.1) !important; padding: 0.2rem 0.4rem !important; border-radius: 0.25rem !important; font-size: 0.875em; color: #93c5fd !important; }
        
        /* Elite Table Styles */
        .ProseMirror table { width: 100%; border-collapse: collapse; margin: 2rem 0; table-layout: fixed; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
        .ProseMirror th, .ProseMirror td { border: 1px solid rgba(255,255,255,0.1); padding: 0.75rem; vertical-align: top; position: relative; }
        .ProseMirror th { background-color: rgba(255,255,255,0.05); font-weight: bold; text-align: left; }
        .ProseMirror .selectedCell:after { z-index: 2; position: absolute; content: ""; left: 0; right: 0; top: 0; bottom: 0; background: rgba(59, 130, 246, 0.2); pointer-events: none; }
        .ProseMirror .column-resize-handle { position: absolute; right: -2px; top: 0; bottom: -2px; width: 4px; background-color: #3b82f6; pointer-events: none; z-index: 20; }
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
              <p className="text-[10px] font-mono tracking-[0.2em] text-blue-400 uppercase">Prosemirror God-Mode Active</p>
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
              <span className="text-[9px] font-mono text-emerald-500/40 italic">Try Markdown: '# ' (H1) or '[ ] ' (Task List)...</span>
            </div>
            
            {/* THE TIPTAP CONTENT ENGINE */}
            <div className="relative z-20 shadow-2xl rounded-xl bg-[#050505] border border-white/10 p-2 min-h-[600px] flex flex-col">
              <MenuBar editor={editor} />
              
              {/* THE CONTEXTUAL BUBBLE MENU */}
              {editor && (
                // @ts-ignore
                <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className="bg-[#0f172a] border border-white/20 shadow-2xl rounded-lg p-1 flex gap-1 items-center z-50">
                  <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('bold') ? 'text-blue-400' : 'text-slate-300'}`}><b>B</b></button>
                  <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('italic') ? 'text-blue-400' : 'text-slate-300'}`}><i>I</i></button>
                  <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('underline') ? 'text-blue-400' : 'text-slate-300'}`}><u>U</u></button>
                  <div className="w-[1px] h-4 bg-white/20 mx-1"></div>
                  <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-1.5 rounded hover:bg-white/10 text-xs font-bold ${editor.isActive('heading', { level: 2 }) ? 'text-blue-400' : 'text-slate-300'}`}>H2</button>
                  <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`p-1.5 rounded hover:bg-white/10 text-xs font-bold ${editor.isActive('heading', { level: 3 }) ? 'text-blue-400' : 'text-slate-300'}`}>H3</button>
                  <div className="w-[1px] h-4 bg-white/20 mx-1"></div>
                  <button type="button" onClick={() => {
                    const url = window.prompt('Link URL:');
                    if (url) editor.chain().focus().setLink({ href: url }).run();
                  }} className={`p-1.5 rounded hover:bg-white/10 text-xs ${editor.isActive('link') ? 'text-blue-400' : 'text-slate-300'}`}>🔗</button>
                </BubbleMenu>
              )}

              <div className="px-6 py-4 flex-1">
                <EditorContent editor={editor} />
              </div>

              {/* LIVE TELEMETRY FOOTER */}
              <div className="mt-auto border-t border-white/5 pt-3 pb-1 px-4 flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                <span>Data Processed</span>
                <div className="flex gap-4">
                  <span>{editor?.storage.characterCount.words()} Words</span>
                  <span>{editor?.storage.characterCount.characters()} Characters</span>
                </div>
              </div>

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