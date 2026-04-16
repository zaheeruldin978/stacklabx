/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useState, useEffect, KeyboardEvent } from "react";

interface SEOProps {
  title: string;
  excerpt: string;
  content: string;
  slug: string;
}

export default function SEOAnalyzer({ title = "", excerpt = "", content = "", slug = "" }: SEOProps) {
  // MULTI-NODE KEYWORD STATE
  const [focusKeywords, setFocusKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");
  
  const [score, setScore] = useState(0);
  const [categories, setCategories] = useState<{name: string, checks: any[]}[]>([]);
  
  // Advanced Telemetry State
  const [readability, setReadability] = useState(0);
  const [readTime, setReadTime] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [h2Count, setH2Count] = useState(0);
  const [h3Count, setH3Count] = useState(0);
  const [imgCount, setImgCount] = useState(0);
  
  const [activeTab, setActiveTab] = useState<'matrix' | 'action'>('matrix');
  const [isCopied, setIsCopied] = useState(false);

  const handleKeywordKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = keywordInput.trim();
      if (val && !focusKeywords.some(k => k.toLowerCase() === val.toLowerCase())) {
        setFocusKeywords([...focusKeywords, val]);
      }
      setKeywordInput("");
    }
  };

  const removeKeyword = (indexToRemove: number) => {
    setFocusKeywords(focusKeywords.filter((_, idx) => idx !== indexToRemove));
  };

  const countSyllables = (word: string) => {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const syllables = word.match(/[aeiouy]{1,2}/g);
    return syllables ? syllables.length : 1;
  };

  const escapeRegex = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  useEffect(() => {
    runAnalysis();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, excerpt, content, slug, focusKeywords]);

  const runAnalysis = () => {
    let currentScore = 100;
    
    const safeContent = content || "";
    const safeTitle = title || "";
    const safeExcerpt = excerpt || "";
    const safeSlug = slug || "";
    
    // Advanced Text Normalization
    const plainText = safeContent
      .replace(/<[^>]+>/g, ' ')         // Strip all HTML tags
      .replace(/&nbsp;/gi, ' ')         // Convert non-breaking spaces to real spaces
      .replace(/&[#A-Za-z0-9]+;/gi, '') // Remove stray HTML entities
      .replace(/\s+/g, ' ')             // Collapse whitespace into single spaces
      .trim(); 

    const words = plainText.split(/\s+/).filter((w) => w.length > 0);
    const wCount = words.length;
    
    // Set Structural Telemetry (Unrestricted)
    setWordCount(wCount);
    setReadTime(Math.max(1, Math.ceil(wCount / 225))); 
    setH2Count((safeContent.match(/<h2/g) || []).length);
    setH3Count((safeContent.match(/<h3/g) || []).length);
    const imageCount = (safeContent.match(/<img/g) || []).length;
    setImgCount(imageCount);

    const sentences = plainText.split(/[.?!]+/).filter(s => s.trim().length > 0);
    if (wCount > 0 && sentences.length > 0) {
      const totalSyllables = words.reduce((acc, word) => acc + countSyllables(word), 0);
      const fleschScore = 206.835 - 1.015 * (wCount / sentences.length) - 84.6 * (totalSyllables / wCount);
      setReadability(Math.max(0, Math.min(100, Math.round(fleschScore))));
    } else {
      setReadability(0);
    }

    const contentChecks = [];
    const keywordChecks = [];
    const technicalChecks = [];

    // ==========================================
    // 1. UNRESTRICTED CONTENT & READABILITY
    // ==========================================
    if (wCount >= 1500) { 
      contentChecks.push({ label: `Comprehensive Volume (${wCount} words)`, pass: true, impact: "High" }); 
    } else if (wCount >= 500) { 
      contentChecks.push({ label: `Standard Volume (${wCount} words)`, pass: true, impact: "Medium" }); 
    } else { 
      contentChecks.push({ label: `Short-form content (${wCount} words) - Ensure it fulfills user intent.`, pass: true, warning: true, impact: "Low" }); 
      // Removed point deduction for low word count to allow short, punchy articles.
    }

    const paragraphs = safeContent.split(/<p>/g).filter(p => p.length > 10);
    const hasLongParagraphs = paragraphs.some(p => p.split(/\s+/).length > 150);
    if (!hasLongParagraphs && paragraphs.length > 0) { 
      contentChecks.push({ label: "Exceptional paragraph pacing (Highly skimmable)", pass: true, impact: "Medium" }); 
    } else if (hasLongParagraphs) { 
      contentChecks.push({ label: "Wall of text detected (Consider breaking up paragraphs > 150 words)", pass: false, impact: "Medium" }); 
      currentScore -= 5; 
    }

    if (/<ul|<ol/.test(safeContent)) { 
      contentChecks.push({ label: "Utilizes bulleted/numbered lists (Snippet Optimized)", pass: true, impact: "Medium" }); 
    } else { 
      contentChecks.push({ label: "Missing list formatting (Missed Featured Snippet opportunity)", pass: true, warning: true, impact: "Low" }); 
      // Softened penalty for missing lists
    }

    if (/<strong|<b|<em|<i/.test(safeContent)) { 
      contentChecks.push({ label: "Semantic text emphasis (Bold/Italics) utilized", pass: true, impact: "Low" }); 
    }

    if (/[0-9]/.test(safeTitle) || /\b(how|why|best|guide|proven|secret|top|ultimate|strategy)\b/i.test(safeTitle)) { 
      contentChecks.push({ label: "Title utilizes psychological CTR triggers", pass: true, impact: "High" }); 
    } else { 
      contentChecks.push({ label: "Consider adding numbers or power words to Title for CTR", pass: true, warning: true, impact: "Low" }); 
    }

    // Unrestricted Media Check: Rewards having media, but does not penalize heavily for lacking it.
    if (imageCount > 0) { 
      contentChecks.push({ label: `Rich media present (${imageCount} assets)`, pass: true, impact: "Medium" }); 
    } else { 
      contentChecks.push({ label: `Consider adding media assets to break up text.`, pass: true, warning: true, impact: "Low" }); 
    }

    // ==========================================
    // 2. MULTI-NODE KEYWORD MATRIX
    // ==========================================
    if (focusKeywords.length > 0) {
      const primaryKeyword = focusKeywords[0];
      const secondaryKeywords = focusKeywords.slice(1);
      
      const escapedPrimary = escapeRegex(primaryKeyword);
      const primaryRegex = new RegExp(escapedPrimary, 'gi');
      const kwFormattedURL = primaryKeyword.toLowerCase().replace(/\s+/g, '-');
      const contentMatch = (plainText.match(primaryRegex) || []).length;
      
      if ((safeTitle.match(primaryRegex) || []).length > 0) {
        if (safeTitle.toLowerCase().indexOf(primaryKeyword.toLowerCase()) < 15) { 
          keywordChecks.push({ label: "Primary Keyword front-loaded in Title", pass: true, impact: "High" }); 
        } else { 
          keywordChecks.push({ label: "Primary Keyword in Title, but not front-loaded", pass: true, warning: true, impact: "Medium" }); 
          currentScore -= 2; 
        }
      } else { 
        keywordChecks.push({ label: "Title missing Primary Keyword", pass: false, impact: "High" }); 
        currentScore -= 15; 
      }

      if ((safeExcerpt.match(primaryRegex) || []).length > 0) { 
        keywordChecks.push({ label: "Primary Keyword mapped in Meta Description", pass: true, impact: "High" }); 
      } else { 
        keywordChecks.push({ label: "Meta description missing Primary Keyword", pass: false, impact: "High" }); 
        currentScore -= 10; 
      }

      if (safeSlug.includes(kwFormattedURL)) { 
        keywordChecks.push({ label: "Primary Keyword found in URL Slug", pass: true, impact: "High" }); 
      } else { 
        keywordChecks.push({ label: "URL Slug missing Primary Keyword", pass: false, impact: "High" }); 
        currentScore -= 10; 
      }

      const introText = words.slice(0, 100).join(" ");
      if ((introText.match(primaryRegex) || []).length > 0) { 
        keywordChecks.push({ label: "Primary Keyword mapped in first 100 words", pass: true, impact: "High" }); 
      } else { 
        keywordChecks.push({ label: "Primary Keyword missing from introduction", pass: false, impact: "High" }); 
        currentScore -= 10; 
      }

      const density = wCount > 0 ? ((contentMatch * primaryKeyword.split(" ").length) / wCount) * 100 : 0;
      if (density > 0 && density <= 3.5) { 
        keywordChecks.push({ label: `Optimal Primary density (${density.toFixed(2)}%)`, pass: true, impact: "High" }); 
      } else if (density > 3.5) { 
        keywordChecks.push({ label: `High keyword density detected (${density.toFixed(2)}%). Watch for stuffing.`, pass: false, impact: "High" }); 
        currentScore -= 10; 
      } else { 
        keywordChecks.push({ label: `Primary Keyword not found in content body.`, pass: false, impact: "Medium" }); 
        currentScore -= 10; 
      }

      const firstH2Match = safeContent.match(/<h2[^>]*>(.*?)<\/h2>/i);
      if (firstH2Match && primaryRegex.test(firstH2Match[1])) { 
        keywordChecks.push({ label: "First H2 contains Primary Keyword", pass: true, impact: "High" }); 
      } else { 
        keywordChecks.push({ label: "First H2 missing Primary Keyword (Optional but recommended)", pass: true, warning: true, impact: "Low" }); 
      }

      if (secondaryKeywords.length > 0) {
        const missingSecondary = secondaryKeywords.filter(sk => {
          const skRegex = new RegExp(escapeRegex(sk), 'gi');
          return !(plainText.match(skRegex) || []).length;
        });

        if (missingSecondary.length === 0) {
          keywordChecks.push({ label: `All ${secondaryKeywords.length} Secondary Keywords mapped successfully`, pass: true, impact: "Medium" });
        } else {
          keywordChecks.push({ label: `Missing Secondary Keywords: ${missingSecondary.join(", ")}`, pass: false, impact: "Medium" });
          currentScore -= (2 * missingSecondary.length); // Reduced penalty
        }
      }

    } else {
      keywordChecks.push({ label: "Awaiting Focus Keywords...", pass: true, warning: true, impact: "High" });
      // Removed the massive -40 penalty for having no keywords yet. It's just neutral until you add one.
    }

    // ==========================================
    // 3. TECHNICAL ARCHITECTURE
    // ==========================================
    if (safeTitle.length > 0) {
      if (safeTitle.length >= 40 && safeTitle.length <= 65) { 
        technicalChecks.push({ label: `Title length optimal (${safeTitle.length} chars)`, pass: true, impact: "High" }); 
      } else { 
        technicalChecks.push({ label: `Title length (${safeTitle.length} chars) is outside optimal 40-65 range`, pass: false, impact: "High" }); 
        currentScore -= 5; 
      }
    }

    if (safeExcerpt.length > 0) {
      if (safeExcerpt.length >= 120 && safeExcerpt.length <= 160) { 
        technicalChecks.push({ label: `Meta length optimal (${safeExcerpt.length} chars)`, pass: true, impact: "Medium" }); 
      } else { 
        technicalChecks.push({ label: `Meta length (${safeExcerpt.length} chars) is outside optimal 120-160 range`, pass: false, impact: "Medium" }); 
        currentScore -= 5; 
      }
    }

    if (safeSlug.length > 0 && safeSlug.length < 75 && !/-(and|the|a|an|of|in|to)-/.test(safeSlug)) { 
      technicalChecks.push({ label: "URL Slug is concise and semantic", pass: true, impact: "Medium" }); 
    } else if (safeSlug.length > 0) { 
      technicalChecks.push({ label: "URL Slug contains stop-words or is too long", pass: true, warning: true, impact: "Low" }); 
    }

    if (/<a\s+(?:[^>]*?\s+)?href=["']\//.test(safeContent)) { 
      technicalChecks.push({ label: "Internal silo architecture intact", pass: true, impact: "Medium" }); 
    } else { 
      technicalChecks.push({ label: "Missing internal links", pass: true, warning: true, impact: "Low" }); 
    }

    if (/<a\s+(?:[^>]*?\s+)?href=["']https?:\/\//.test(safeContent)) { 
      technicalChecks.push({ label: "Outbound authority links present", pass: true, impact: "Medium" }); 
    } else { 
      technicalChecks.push({ label: "Missing outbound authority links", pass: true, warning: true, impact: "Low" }); 
    }

    if (imageCount > 0 && !/<img[^>]+alt=["'](?!^\s*$)[\s\S]*?["']/.test(safeContent)) { 
      technicalChecks.push({ label: "Some images are missing Alt-Text metadata", pass: false, impact: "Medium" }); 
      currentScore -= 5; 
    } else if (imageCount > 0) { 
      technicalChecks.push({ label: "All Media Alt-Text verified", pass: true, impact: "Medium" }); 
    }

    // Floor the score at 0 and cap at 100
    setScore(Math.max(0, Math.min(100, currentScore)));
    setCategories([
      { name: "Content & Readability", checks: contentChecks },
      { name: "Multi-Node Keyword Matrix", checks: keywordChecks },
      { name: "Technical Structure", checks: technicalChecks }
    ]);
  };

  const actionItems = categories.flatMap(c => c.checks).filter(c => !c.pass && !c.warning);

  // Copy Action Plan Logic
  const handleCopyReport = () => {
    const reportText = `SEO ACTION PLAN FOR: "${title}"\nScore: ${score}/100\n\nTO-DO LIST:\n` + actionItems.map((item, i) => `${i + 1}. [ ] ${item.label}`).join("\n");
    navigator.clipboard.writeText(reportText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const scoreColor = score >= 90 ? '#10b981' : score >= 70 ? '#fb923c' : '#ef4444';
  
  // Unrestricted Progress Bar (Caps visually at 5000 but doesn't punish)
  const progressPercent = Math.min(100, (wordCount / 5000) * 100);

  return (
    <div className="font-sans">
      
      {/* 1. TOP HEADER & KEYWORD INPUT */}
      <div className="flex flex-col mb-8">
        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-1 flex items-center gap-2">
          <span className="text-blue-500">⌘</span> NLP Intelligence
        </h3>
        <p className="text-[10px] font-mono text-slate-500 uppercase mb-5">Enterprise Semantic Matrix</p>
        
        {/* MULTI-TAG INPUT AREA (BEAUTIFIED) */}
        <div className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 shadow-inner focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all min-h-[64px] flex flex-wrap gap-2.5 items-center cursor-text" onClick={() => document.getElementById('keyword-input')?.focus()}>
          
          {focusKeywords.map((kw, idx) => (
            <span key={idx} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold border transition-all shadow-sm ${
              idx === 0 ? 'bg-gradient-to-r from-blue-600/20 to-blue-500/10 text-blue-400 border-blue-500/30' : 'bg-white/5 text-slate-300 border-white/10'
            }`}>
              {idx === 0 && <span className="text-[9px] uppercase tracking-widest opacity-80 border-r border-current pr-2 mr-1">Primary</span>}
              {kw}
              <button type="button" onClick={(e) => { e.stopPropagation(); removeKeyword(idx); }} className="opacity-50 hover:opacity-100 hover:text-red-400 transition-colors ml-1 w-4 h-4 flex items-center justify-center rounded-full hover:bg-white/10">✕</button>
            </span>
          ))}

          <input 
            id="keyword-input"
            type="text" 
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={handleKeywordKeyDown}
            placeholder={focusKeywords.length === 0 ? "Enter Target Keyword & Press Enter..." : "Add secondary semantic..."}
            className="flex-1 min-w-[200px] bg-transparent border-none focus:outline-none text-sm font-bold text-white placeholder:text-slate-600 placeholder:font-normal"
          />
        </div>
        
        <p className="text-[9px] font-mono text-slate-500 mt-3 ml-2">Press <kbd className="bg-white/10 px-1.5 py-0.5 rounded shadow-sm">Enter</kbd> or <kbd className="bg-white/10 px-1.5 py-0.5 rounded shadow-sm">Comma</kbd> to lock in a keyword.</p>

        {focusKeywords.length > 0 && focusKeywords[0].length > 3 && (
          <div className="flex flex-wrap gap-2 mt-5 items-center bg-white/[0.02] p-3 rounded-xl border border-white/5">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mr-2">LSI Suggestions:</span>
            {['Best', 'Guide to', 'What is'].map((prefix, i) => (
              <button key={i} type="button" onClick={() => { const newKw = `${prefix} ${focusKeywords[0]}`; if (!focusKeywords.includes(newKw)) setFocusKeywords([...focusKeywords, newKw]); }} className="text-[10px] font-bold bg-white/5 border border-white/10 text-cyan-400 px-3 py-1.5 rounded-lg hover:bg-cyan-500/20 transition-all shadow-sm">
                + {prefix} {focusKeywords[0]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. THE UPGRADED 2-COLUMN TELEMETRY DASHBOARD */}
      <div className="mb-8 rounded-2xl bg-[#0a0a0a] border border-white/10 flex flex-col overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none"></div>
        
        <div className="p-6 flex items-center justify-between relative z-10">
          {/* Circular SVG Gauge */}
          <div className="relative flex items-center justify-center w-24 h-24 shrink-0">
            <svg className="transform -rotate-90 w-24 h-24">
              <circle cx="48" cy="48" r={radius} stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="none" />
              <circle cx="48" cy="48" r={radius} stroke={scoreColor} strokeWidth="6" strokeLinecap="round" fill="none" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ filter: `drop-shadow(0 0 8px ${scoreColor}80)` }} />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white leading-none">{score}</span>
              <span className="text-[8px] font-mono text-slate-500 uppercase tracking-[0.3em] mt-1">Score</span>
            </div>
          </div>

          {/* 2-Column Grid Metrics */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 flex-1 ml-8">
            <div className="flex flex-col bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Reading Ease</span>
              <span className={`text-sm font-black ${readability > 60 ? 'text-emerald-400' : readability > 30 ? 'text-orange-400' : 'text-red-400'}`}>{readability}/100</span>
            </div>
            <div className="flex flex-col bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Est. Time</span>
              <span className="text-sm font-black text-cyan-400">{readTime} Min</span>
            </div>
            <div className="flex flex-col bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">H2 Headers</span>
              <span className="text-sm font-black text-white">{h2Count}</span>
            </div>
            <div className="flex flex-col bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Media Assets</span>
              <span className="text-sm font-black text-white">{imgCount}</span>
            </div>
          </div>
        </div>

        {/* Visual Benchmarking Progress Bar (Unrestricted) */}
        <div className="bg-black/80 px-6 py-4 border-t border-white/5 relative z-10">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Document Volume</span>
            <span className="text-[11px] font-black text-white">{wordCount.toLocaleString()} <span className="text-slate-500 font-mono font-normal">Words</span></span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] relative" style={{ width: `${progressPercent}%` }}>
               <div className="absolute inset-0 bg-white/20 w-full h-full animate-[pulse_2s_ease-in-out_infinite]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DYNAMIC TAB NAVIGATION */}
      <div className="flex gap-2 mb-6 p-1.5 bg-[#0a0a0a] rounded-xl border border-white/10 shadow-lg">
        <button type="button" onClick={() => setActiveTab('matrix')} className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg transition-all ${activeTab === 'matrix' ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
          Full Matrix
        </button>
        <button type="button" onClick={() => setActiveTab('action')} className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg transition-all ${activeTab === 'action' ? 'bg-red-500/20 text-red-400 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'}`}>
          Action Plan
          {actionItems.length > 0 && <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full shadow-sm">{actionItems.length}</span>}
        </button>
      </div>

      {/* 4. DATA AREA */}
      <div className="pb-6">
        
        {/* VIEW A: THE FULL MATRIX */}
        {activeTab === 'matrix' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {categories.map((category, idx) => (
              <div key={idx} className="space-y-4 bg-[#0a0a0a] p-5 rounded-2xl border border-white/5 shadow-xl">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-white/10 pb-3 flex justify-between items-center">
                  <span>{category.name}</span>
                  <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded-md text-[9px]">{category.checks.length} Checks</span>
                </h4>
                <div className="space-y-2.5 pt-2">
                  {category.checks.map((check, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-4 p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-all border border-transparent hover:border-white/10 shadow-sm">
                      <div className="mt-0.5 flex-shrink-0 w-5 flex justify-center">
                        {check.pass ? (
                          check.warning ? <span className="text-orange-400 text-sm drop-shadow-[0_0_5px_rgba(251,146,60,0.5)]">⚠</span> : <span className="text-emerald-500 text-sm drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]">✓</span>
                        ) : (
                          <span className="text-red-500 text-sm drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">✕</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-xs ${check.pass ? (check.warning ? 'text-orange-300' : 'text-slate-300') : 'text-red-400'} font-medium leading-relaxed`}>{check.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW B: THE ACTION PLAN WITH EXPORT */}
        {activeTab === 'action' && (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-400">
            {actionItems.length === 0 ? (
              <div className="p-10 text-center border border-emerald-500/20 bg-emerald-500/5 rounded-2xl shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(16,185,129,0.3)]"><span className="text-emerald-400 text-2xl">✓</span></div>
                <h4 className="text-emerald-400 font-black uppercase tracking-[0.2em] text-sm mb-2">Protocol Perfect</h4>
                <p className="text-[11px] text-slate-400 uppercase tracking-widest">Zero critical failures detected. Ready for deployment.</p>
              </div>
            ) : (
              <>
                <div className="p-5 mb-4 flex items-center justify-between border-l-4 border-red-500 bg-red-500/10 rounded-r-2xl shadow-lg">
                  <div className="flex flex-col">
                    <p className="text-sm font-black text-red-400 uppercase tracking-widest">Action Required</p>
                    <p className="text-[10px] font-mono text-red-300/80 mt-1">Resolve {actionItems.length} issues to achieve maximum visibility.</p>
                  </div>
                  <button onClick={handleCopyReport} className="bg-red-500/20 hover:bg-red-500/40 transition-colors text-red-300 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-red-500/30 flex items-center gap-2 shadow-sm">
                    {isCopied ? "✓ Copied" : "Copy Report"}
                  </button>
                </div>
                {actionItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-5 rounded-2xl bg-red-500/5 border border-red-500/20 shadow-sm hover:bg-red-500/10 transition-colors">
                    <div className="w-5 h-5 rounded border border-red-500/50 flex-shrink-0 mt-0.5 bg-black/50 cursor-not-allowed flex items-center justify-center relative overflow-hidden">
                       <div className="w-full h-0.5 bg-red-500/50 absolute rotate-45 transform origin-center"></div>
                    </div>
                    <p className="text-xs text-red-200 font-medium leading-relaxed pt-0.5">{item.label}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}} />
    </div>
  );
}