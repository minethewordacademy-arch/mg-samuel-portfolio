// src/app/nutrition/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import nutritionData from "@/data/nutritionHonor.json";

type NutritionData = {
  title: string;
  sections: Section[];
};

const data = nutritionData as NutritionData;

type SectionContent =
  | { type: "text"; value: string }
  | { type: "list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "subheading"; value: string };

type Subsection = {
  title?: string;
  content?: SectionContent[];
};

type Section = {
  title: string;
  subsections?: Subsection[];
  content?: SectionContent[];
};

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

const ShareButtons = ({
  title,
  copied,
  onCopy,
  pageUrl,
}: {
  title: string;
  copied: boolean;
  onCopy: () => void;
  pageUrl: string;
}) => {
  const shareText = `📖 Nutrition Honor Study Guide – ${title}\n\nCheck out this complete study guide for the Pathfinder Nutrition Honor. ${pageUrl}`;

  return (
    <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
      <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mr-2 self-center">
        Share this page:
      </span>
      <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-800/50 transition">
        📱 WhatsApp
      </a>
      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 px-4 py-2 rounded-full text-sm font-semibold hover:bg-sky-100 dark:hover:bg-sky-800/50 transition">
        🐦 Twitter
      </a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-100 dark:hover:bg-blue-800/50 transition">
        📘 Facebook
      </a>
      <button onClick={onCopy} className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition">
        🔗 {copied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
};

export default function NutritionHonorPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pageUrl, setPageUrl] = useState(""); 
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("darkMode");
      if (stored !== null) return JSON.parse(stored);
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setPageUrl(window.location.href);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((winScroll / height) * 100);
      setShowBackToTop(winScroll > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: "-20% 0px -70% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const sections = data.sections as Section[];
  const tocItems = sections.map((section, idx) => ({
    id: slugify(section.title),
    title: section.title,
    index: idx,
  }));

  const getSectionEmoji = (title: string): string => {
    if (title.includes("Food Pyramid")) return "🥗";
    if (title.includes("Vegetarian Diets")) return "🌱";
    if (title.includes("Menu")) return "🍽️";
    if (title.includes("Vitamins")) return "💊";
    if (title.includes("Food Sources")) return "🥕";
    if (title.includes("Water")) return "💧";
    if (title.includes("Diseases")) return "❤️";
    if (title.includes("Flour")) return "🌾";
    if (title.includes("RDA")) return "📊";
    return "📘";
  };

  const renderContent = (content: SectionContent) => {
    const parseBold = (text: string) => text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    switch (content.type) {
      case "text":
        return <p className="mb-4 whitespace-pre-line text-lg leading-relaxed text-slate-700 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: parseBold(content.value) }} />;
      case "list":
        return (
          <ul className="list-disc pl-6 mb-6 space-y-2 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            {content.items.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: parseBold(item) }} />
            ))}
          </ul>
        );
      case "table":
        return (
          <div className="overflow-x-auto mb-8 rounded-2xl border border-slate-200 dark:border-slate-700">
            <table className="min-w-full">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800">
                  {content.headers.map((header, idx) => (
                    <th key={idx} className="px-5 py-4 text-left font-bold text-slate-800 dark:text-slate-200">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {content.rows.map((row, rowIdx) => (
                  <tr key={rowIdx} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="px-5 py-4 text-slate-700 dark:text-slate-300">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "subheading":
        return <h3 className="text-2xl font-bold mt-6 mb-3 text-slate-900 dark:text-white">{content.value}</h3>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 font-sans">
      <Head>
        <title>Nutrition Honor – Study Guide | Samuel Oyunge</title>
      </Head>

      <div className="fixed top-0 left-0 w-full h-1.5 bg-emerald-500 z-60 transition-all duration-300" style={{ width: `${scrollProgress}%` }} />

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

      {showBackToTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-emerald-600 text-white shadow-xl hover:bg-emerald-700 transition-all hover:scale-110" aria-label="Back to top">↑</button>
      )}

      <div className="hidden lg:block fixed left-6 top-32 w-64 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 z-30 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white"><span>📑</span> Contents</h3>
        <ul className="space-y-2 text-sm">
          {tocItems.map((item) => (
            <li key={item.id}>
              <button onClick={() => scrollToSection(item.id)} className={`text-left hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 w-full ${activeSection === item.id ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-slate-600 dark:text-slate-400"}`}>
                <span className="text-base">{getSectionEmoji(item.title)}</span>
                <span className="line-clamp-2">{item.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <main className="container mx-auto px-4 pt-32 pb-16 max-w-4xl">
        <div className="text-center mb-16 animate-fade-in">
          <div className="relative w-full max-w-lg mx-auto mb-8 rounded-4xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
            <Image src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=500&fit=crop" alt="Healthy food pyramid illustration" width={800} height={500} className="object-cover" loading="eager" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-slate-900 dark:text-white pb-4 inline-block relative">
            {data.title}
            <span className="absolute bottom-0 left-1/4 w-1/2 h-1.5 bg-linear-to-r from-emerald-500 to-sky-500 rounded-full" />
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
            A complete study guide for the Pathfinder Nutrition Honor. Based on the official requirements and the SDA Zimmerman Nutrition Honor document.
          </p>
          <div className="mt-6 text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 inline-block px-4 py-2 rounded-full">
            📅 Taught on: March 22nd & 25th 2026
          </div>
        </div>

        <ShareButtons title="Nutrition Honor Study Guide" copied={copied} onCopy={handleCopyLink} pageUrl={pageUrl} />

        {sections.map((section, idx) => {
          const sectionId = slugify(section.title);
          const emoji = getSectionEmoji(section.title);
          return (
            <section key={idx} id={sectionId} ref={(el) => { if (el) sectionRefs.current[sectionId] = el; }} className="mb-12 scroll-mt-32">
              <div className="group relative bg-white dark:bg-slate-800/80 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-emerald-500 to-sky-500"></div>
                <div className="p-8 md:p-10">
                  <h2 className="text-3xl font-extrabold flex items-center gap-3 mb-6 text-slate-900 dark:text-white">
                    <span className="text-3xl">{emoji}</span>
                    <span>{section.title}</span>
                  </h2>
                  {section.subsections
                    ? section.subsections.map((sub, subIdx) => (
                        <div key={subIdx} className="mb-8 last:mb-0">
                          {sub.title && <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200">{sub.title}</h3>}
                          {sub.content && sub.content.map((c, cIdx) => <div key={cIdx}>{renderContent(c)}</div>)}
                        </div>
                      ))
                    : section.content
                      ? section.content.map((c, cIdx) => <div key={cIdx}>{renderContent(c)}</div>)
                      : null}
                </div>
              </div>
            </section>
          );
        })}

        <ShareButtons title="Nutrition Honor Study Guide" copied={copied} onCopy={handleCopyLink} pageUrl={pageUrl} />

      
        <footer />
      </main>
    </div>
  );
}