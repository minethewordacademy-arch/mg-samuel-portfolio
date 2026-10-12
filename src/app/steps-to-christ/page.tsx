// src/app/steps-to-christ/page.tsx
"use client";

import { useState, useEffect, useRef, Suspense, useCallback } from "react";
import Head from "next/head";
import { useSearchParams, useRouter } from "next/navigation";
import data from "@/data/stepsToChrist.json";
import Link from "next/link";

type Chapter = {
  chapter: number;
  title: string;
  quote: string;
  summary: string;
  date?: string;
};

function getChapterUrl(chapterNumber: number): string {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  return `${baseUrl}/steps-to-christ?chapter=${chapterNumber}`;
}

const ShareButtons = ({ chapter, copied, onCopy }: { chapter: Chapter; copied: boolean; onCopy: () => void; }) => {
  const pageUrl = getChapterUrl(chapter.chapter);
  const shareText = `📖 Steps to Christ – Chapter ${chapter.chapter}: ${chapter.title}\n\n“${chapter.quote.slice(0, 120)}...”\n\nRead the full summary at: ${pageUrl}`;

  return (
    <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
      <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 mr-2 self-center">Share this chapter:</span>
      <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-800/50 transition">📱 WhatsApp</a>
      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 px-4 py-2 rounded-full text-sm font-semibold hover:bg-sky-100 dark:hover:bg-sky-800/50 transition">🐦 Twitter</a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-100 dark:hover:bg-blue-800/50 transition">📘 Facebook</a>
      <button onClick={onCopy} className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition">🔗 {copied ? "Copied!" : "Copy Link"}</button>
    </div>
  );
};

function StepsToChristContent() {
  const chapters: Chapter[] = data;
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasOpenedFromUrl = useRef(false);

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("darkMode");
      if (stored !== null) return JSON.parse(stored);
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isModalOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleCards((prev) => [...new Set([...prev, index])]);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    cardRefs.current.forEach((card) => { if (card) observer.observe(card); });
    return () => observer.disconnect();
  }, []);

  const openModal = useCallback((chapter: Chapter) => {
    setSelectedChapter(chapter);
    setIsModalOpen(true);
    router.replace(`?chapter=${chapter.chapter}`, { scroll: false });
  }, [router]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedChapter(null);
    router.replace("/steps-to-christ", { scroll: false });
  }, [router]);

  useEffect(() => {
    const chapterParam = searchParams.get("chapter");
    if (chapterParam && !hasOpenedFromUrl.current) {
      const chapterNumber = parseInt(chapterParam, 10);
      const chapter = chapters.find((c) => c.chapter === chapterNumber);
      if (chapter) {
        hasOpenedFromUrl.current = true;
        requestAnimationFrame(() => {
          openModal(chapter);
        });
      }
    }
  }, [searchParams, chapters, openModal]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeModal]);

  const handleCopyLink = useCallback(() => {
    if (typeof window !== "undefined" && selectedChapter) {
      navigator.clipboard.writeText(getChapterUrl(selectedChapter.chapter));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [selectedChapter]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 font-sans">
      <Head>
        <title>Steps to Christ – Chapter Summaries | Samuel Oyunge</title>
      </Head>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-lg hover:shadow-xl transition-all hover:scale-110 focus:outline-none border border-slate-200 dark:border-slate-700"
        aria-label="Toggle dark mode"
      >
        <span className="dark:hidden text-xl">🌙</span>
        <span className="hidden dark:inline text-xl">☀️</span>
      </button>

      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-5xl backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-white/50 dark:border-slate-700/50 rounded-full px-6 py-3 shadow-xl flex items-center justify-between">
        <Link href="/" className="font-extrabold bg-linear-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent text-xl">
          Samuel Oyunge
        </Link>
        <Link href="/" className="text-sm font-semibold px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors">
          ← Back to Home
        </Link>
      </header>

      <main className="container mx-auto px-4 pt-32 pb-16 max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-slate-900 dark:text-white pb-4 inline-block relative">
            Steps to Christ
            <span className="absolute bottom-0 left-1/4 w-1/2 h-1.5 bg-linear-to-r from-emerald-500 to-sky-500 rounded-full" />
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Chapter summaries prepared as a spiritual resource for Master Guide growth. May these truths deepen your walk with God.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {chapters.map((chapter, index) => (
            <div key={chapter.chapter} ref={(el) => { cardRefs.current[index] = el; }} data-index={index} className={`transform transition-all duration-700 ${visibleCards.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
              <div className="group relative h-full border border-slate-100 dark:border-slate-700 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 bg-white dark:bg-slate-800/80 hover:-translate-y-2 flex flex-col">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-emerald-500 to-sky-500"></div>
                <div className="p-8 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/40 px-3 py-1 rounded-full">Chapter {chapter.chapter}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white group-hover:text-emerald-600 transition-colors">{chapter.title}</h2>
                  <div className="italic border-l-4 border-emerald-500 pl-5 my-4 text-slate-600 dark:text-slate-400 text-base leading-relaxed">“{chapter.quote}”</div>
                  <p className="text-slate-600 dark:text-slate-400 line-clamp-4 mb-6 grow text-lg leading-relaxed">{chapter.summary.replace(/\n/g, " ").slice(0, 200)}…</p>
                  <button onClick={() => openModal(chapter)} className="mt-auto self-start text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-bold transition-colors group-hover:underline focus:outline-none text-lg flex items-center">
                    Read full summary
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && selectedChapter && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-100 p-4 transition-opacity" onClick={closeModal}>
            <div className="bg-white dark:bg-slate-800 rounded-4xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-700 custom-scrollbar" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-b border-slate-100 dark:border-slate-700 px-8 py-6 flex justify-between items-center z-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">Chapter {selectedChapter.chapter}: {selectedChapter.title}</h2>
                <button onClick={closeModal} className="text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-4xl transition focus:outline-none rounded-full w-10 h-10 flex items-center justify-center leading-none" aria-label="Close">&times;</button>
              </div>
              <div className="p-8 md:p-10">
                <div className="italic border-l-4 border-emerald-500 pl-6 mb-8 text-slate-600 dark:text-slate-400 text-xl leading-relaxed">“{selectedChapter.quote}”</div>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {selectedChapter.summary.split("\n").map((paragraph, idx) => (
                    <p key={idx} className="mb-5 text-slate-700 dark:text-slate-300 whitespace-pre-wrap text-lg leading-relaxed">{paragraph}</p>
                  ))}
                </div>
                <ShareButtons chapter={selectedChapter} copied={copied} onCopy={handleCopyLink} />
                {selectedChapter.date && (
                  <div className="mt-8 text-base text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-6 font-medium">Read on: {selectedChapter.date}</div>
                )}
              </div>
            </div>
          </div>
        )}

        <footer />
      </main>
    </div>
  );
}

export default function StepsToChristPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 text-emerald-600 font-bold text-xl">Loading...</div>}>
      <StepsToChristContent />
    </Suspense>
  );
}