"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import portfolioData from "@/data/portfolio.json";
import React from "react";

type ShareOption = { label: string; url: string };
type EventItem = { name: string; date: string; description: string };
type BaseItem = { title: string };
type ItemWithShare = BaseItem & { shareOptions: ShareOption[] };
type ItemWithEvents = BaseItem & { events: EventItem[] };
type ItemWithImages = BaseItem & { description?: string; images: string[] };
type ItemWithLink = BaseItem & { description?: string; link: string };
type ItemSimple = string;
type PortfolioItem = ItemSimple | ItemWithShare | ItemWithEvents | ItemWithImages | ItemWithLink;

type DevotionItem = {
  date: string; bibleReading: string; materialRead?: string; reflection: string; application: string; prayerFocus: string; song: string;
};

type AccordionItem = { title: string; content: string; };

type Section = {
  title: string; type: "list" | "cards" | "devotion-list" | "accordion";
  items: PortfolioItem[] | DevotionItem[] | AccordionItem[];
};

type PortfolioData = {
  name: string;
  tagline: string;
  about: string;
  mission: string;
  dedication?: string;
  sections: Section[];
};

const data = portfolioData as PortfolioData;

function isListSection(section: unknown): section is Section & { type: "list" } {
  return typeof section === "object" && section !== null && "type" in section && (section as { type: string }).type === "list";
}
function isCardsSection(section: unknown): section is Section & { type: "cards" } {
  return typeof section === "object" && section !== null && "type" in section && (section as { type: string }).type === "cards";
}
function isDevotionListSection(section: Section): section is Section & { type: "devotion-list"; items: DevotionItem[] } {
  return section.type === "devotion-list";
}
function isAccordionSection(section: Section): section is Section & { type: "accordion"; items: AccordionItem[] } {
  return section.type === "accordion";
}
function isStringItem(item: PortfolioItem): item is string { return typeof item === "string"; }
function hasShareOptions(item: PortfolioItem): item is ItemWithShare { return typeof item === "object" && "shareOptions" in item; }
function hasEvents(item: PortfolioItem): item is ItemWithEvents { return typeof item === "object" && "events" in item; }
function hasImages(item: PortfolioItem): item is ItemWithImages { return typeof item === "object" && "images" in item; }
function hasLink(item: PortfolioItem): item is ItemWithLink { return typeof item === "object" && "link" in item; }
function hasDescription(item: PortfolioItem): item is Exclude<PortfolioItem, string> & { description?: string } { return typeof item === "object" && "description" in item; }
function getTitle(item: PortfolioItem): string { return isStringItem(item) ? item : item.title; }

function slugify(text: string) { return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""); }
function parseMarkdown(text: string) {
  return text.split('\n').map((line, i) => {
    const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return <p key={i} className="mb-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
  });
}

const honorModules = [
  { href: "/devotions", title: "Daily Devotions", desc: "Spiritual reflections and daily walk with Christ.", icon: "🙏", color: "from-blue-500 to-cyan-500", bgColor: "bg-blue-50 dark:bg-blue-900/20" },
  { href: "/fire-building-camp-cookery", title: "Fire & Camp Cookery", desc: "Outdoor survival skills and camp cooking expertise.", icon: "🔥", color: "from-orange-500 to-red-500", bgColor: "bg-orange-50 dark:bg-orange-900/20" },
  { href: "/nutrition", title: "Nutrition", desc: "Understanding health, diet, and wellness from a biblical perspective.", icon: "🥗", color: "from-emerald-500 to-teal-500", bgColor: "bg-emerald-50 dark:bg-emerald-900/20" },
  { href: "/sanctuary-honor", title: "Sanctuary Honor", desc: "Deep dive into the sanctuary and its meaning.", icon: "🏛️", color: "from-indigo-500 to-purple-500", bgColor: "bg-indigo-50 dark:bg-indigo-900/20" },
  { href: "/28-fundamental-beliefs", title: "28 Fundamental Beliefs", desc: "Teaching and understanding the core beliefs of our faith.", icon: "📖", color: "from-purple-500 to-pink-500", bgColor: "bg-purple-50 dark:bg-purple-900/20" },
  { href: "/steps-to-christ", title: "Steps to Christ", desc: "A journey through the classic book by Ellen G. White.", icon: "✝️", color: "from-rose-500 to-red-500", bgColor: "bg-rose-50 dark:bg-rose-900/20" },
  { href: "/temperance-honor", title: "Temperance Honor", desc: "Pledge, studies, and evidence for the Temperance Honor.", icon: "💧", color: "from-sky-500 to-blue-500", bgColor: "bg-sky-50 dark:bg-sky-900/20" },
  { href: "/education", title: "Education", desc: "Academic achievements and educational milestones.", icon: "🎓", color: "from-amber-500 to-yellow-500", bgColor: "bg-amber-50 dark:bg-amber-900/20" },
];

export default function Home() {
  const [selectedDevotion, setSelectedDevotion] = useState<DevotionItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [year, setYear] = useState<number | null>(null);

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("darkMode");
      if (stored !== null) return JSON.parse(stored);
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / totalScroll) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); }); },
      { threshold: 0.3, rootMargin: "-20% 0px -70% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const openDetailModal = (devotion: DevotionItem) => { setSelectedDevotion(devotion); setIsDetailModalOpen(true); };
  const closeDetailModal = () => { setIsDetailModalOpen(false); setSelectedDevotion(null); };
  const openListModal = () => setIsListModalOpen(true);
  const closeListModal = () => setIsListModalOpen(false);
  const openImageModal = (src: string) => { setSelectedImage(src); setIsImageModalOpen(true); };
  const closeImageModal = () => { setIsImageModalOpen(false); setSelectedImage(null); };

  const devotionSection = (data.sections as Section[]).find((s) => s.type === "devotion-list") as (Section & { type: "devotion-list"; items: DevotionItem[] }) | undefined;
  const navItems = [
    { id: "hero", label: "Home" },
    { id: "explore", label: "Explore" },
    ...(data.dedication ? [{ id: "dedication", label: "Dedication" }] : []),
    ...(data.sections as Section[]).map((section) => ({
      id: section.type === "devotion-list" ? "devotion-challenge" : slugify(section.title),
      label: section.title,
    })),
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300 relative selection:bg-emerald-500/30 font-sans">
      <div className="fixed top-0 left-0 w-full h-1.5 z-60 bg-transparent">
        <div className="h-full bg-linear-to-r from-emerald-500 to-sky-500 transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%` }} />
      </div>

      <Head>
        <title>{data.name} – Master Guide Portfolio</title>
        <meta name="description" content="Master Guide portfolio for Samuel Oyunge" />
      </Head>

      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-300">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 rounded-full px-6 py-3 flex items-center justify-between">
          <a href="#hero" onClick={(e) => handleNavClick(e, "hero")} className="text-xl font-extrabold bg-linear-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent hover:opacity-80 transition">
            {data.name.split(" ")[0]}
          </a>
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.slice(0, 6).map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={(e) => handleNavClick(e, item.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeSection === item.id ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:scale-110 transition-transform focus:outline-none" aria-label="Toggle dark mode">
              <span className="dark:hidden text-lg">🌙</span>
              <span className="hidden dark:inline text-lg">☀️</span>
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none" aria-label="Toggle menu">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-3xl py-4 px-4 shadow-2xl max-h-[80vh] overflow-y-auto">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={(e) => handleNavClick(e, item.id)}
                className={`block py-3 px-4 rounded-xl text-base font-semibold transition-colors mb-1 ${activeSection === item.id ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}>
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {showBackToTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-emerald-600 text-white shadow-xl hover:bg-emerald-700 transition-all transform hover:scale-110 focus:outline-none" aria-label="Back to top">↑</button>
      )}

      <main className="container mx-auto px-4 md:px-8 max-w-7xl pt-32 pb-12">
        <section id="hero" className="py-12 lg:py-20 animate-fade-in scroll-mt-32 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left relative z-10 order-2 lg:order-1">
              <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-semibold text-sm mb-6 tracking-wide uppercase">Master Guide Portfolio</div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-slate-900 dark:text-white tracking-tight leading-tight">
                Hi, I&apos;m <br />
                <span className="bg-linear-to-r from-emerald-600 via-teal-500 to-sky-600 bg-clip-text text-transparent">{data.name}</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-8 font-light leading-relaxed">{data.tagline}</p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl text-lg mb-10">{data.about}</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <a href="#explore" onClick={(e) => handleNavClick(e, "explore")} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-lg">Explore Journey ↓</a>
                <a href="#contact" onClick={(e) => handleNavClick(e, "contact")} className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-slate-200 dark:border-slate-700 text-lg">Contact Me</a>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="absolute inset-0 bg-emerald-500/20 dark:bg-emerald-400/20 rounded-full blur-3xl w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto lg:mx-0 lg:ml-auto animate-pulse" />

              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 animate-float">
                <div className="absolute inset-0 rounded-4xl md:rounded-[2.5rem] bg-linear-to-tr from-emerald-500 via-teal-400 to-sky-500 p-1.5 shadow-2xl">
                  <div className="w-full h-full rounded-[1.75rem] md:rounded-[2.25rem] overflow-hidden bg-white dark:bg-slate-800">
                    <Image
                      src="/images/samuel-profile.jpg"
                      alt={data.name}
                      width={600}
                      height={600}
                      sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                      className="w-full h-full object-cover object-center"
                      priority
                    />
                  </div>
                </div>

                <div className="absolute -top-3 -left-4 sm:-top-2 sm:-left-6 md:top-0 md:-left-10 bg-white dark:bg-slate-800 px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 z-20 flex items-center gap-2 sm:gap-3">
                  <span className="text-xl sm:text-2xl">🏕️</span>
                  <div>
                    <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Focus</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white">Outdoor Skills</p>
                  </div>
                </div>

                <div className="absolute -bottom-3 -right-4 sm:-bottom-2 sm:-right-6 md:bottom-0 md:-right-10 bg-white dark:bg-slate-800 px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 z-20 flex items-center gap-2 sm:gap-3">
                  <span className="text-xl sm:text-2xl">📖</span>
                  <div>
                    <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Focus</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white">Spiritual Growth</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="explore" className="py-20 scroll-mt-32 animate-fade-in animation-delay-200">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white pb-4 mb-6">Explore My Journey</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-3xl mx-auto">&quot;A complete overview of my Master Guide requirements, experiences, and spiritual milestones.&quot;</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {honorModules.map((module, i) => (
              <Link key={i} href={module.href} className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full">
                <div className={`absolute inset-0 bg-linear-to-br ${module.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-14 h-14 rounded-2xl ${module.bgColor} flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300`}>{module.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{module.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-6 grow text-sm leading-relaxed">{module.desc}</p>
                  <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-bold group-hover:translate-x-2 transition-transform duration-300 mt-auto text-sm">
                    Explore <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {data.dedication && (
          <section id="dedication" className="py-20 text-center animate-fade-in animation-delay-300 scroll-mt-32 bg-white dark:bg-slate-800/50 rounded-[2.5rem] my-12 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-emerald-500 to-sky-500" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">Dedication</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-xl md:text-2xl italic leading-relaxed px-6 relative z-10">&quot;{data.dedication}&quot;</p>
          </section>
        )}

        <div className="max-w-5xl mx-auto">
          {(data.sections as Section[]).map((section, idx) => {
            const sectionId = section.type === "devotion-list" ? "devotion-challenge" : slugify(section.title);
            return (
              <React.Fragment key={idx}>
                <section id={sectionId} className="py-20 animate-fade-in scroll-mt-32 border-b border-slate-100 dark:border-slate-800 last:border-0" style={{ animationDelay: `${idx * 100}ms` }}>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white pb-4 mb-10 inline-block relative">
                    {section.title}
                    <span className="absolute bottom-0 left-0 w-1/2 h-1.5 bg-linear-to-r from-emerald-500 to-sky-500 rounded-full" />
                  </h2>

                  {isListSection(section) && (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc list-inside bg-slate-50 dark:bg-slate-800/30 p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
                      {(section.items as string[]).map((item, i) => <li key={i} className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">{item}</li>)}
                    </ul>
                  )}

                  {isCardsSection(section) && (
                    <div className="space-y-10">
                      {(section.items as PortfolioItem[]).map((item, i) => (
                        <div key={i} className="border border-slate-100 dark:border-slate-800 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-800/50 group">
                          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{getTitle(item)}</h3>
                          {hasDescription(item) && item.description && <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg leading-relaxed">{item.description}</p>}
                          {hasLink(item) && <a href={item.link} className="inline-flex items-center mt-4 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-bold transition focus:outline-none rounded text-lg">Learn more <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></a>}
                          {hasShareOptions(item) && <div className="mt-6 flex flex-wrap gap-3">{item.shareOptions.map((opt, j) => <a key={j} href={opt.url} className="inline-block bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 px-5 py-2.5 rounded-full text-sm font-semibold transition focus:outline-none">{opt.label}</a>)}</div>}
                          {hasEvents(item) && <div className="mt-8 space-y-4">{item.events.map((event, k) => <div key={k} className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-2xl border-l-4 border-emerald-500"><p className="font-bold text-xl">{event.name}</p><p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{event.date}</p><p className="text-slate-600 dark:text-slate-300 text-lg">{event.description}</p></div>)}</div>}
                          {hasImages(item) && <div className="mt-8 flex gap-4 overflow-x-auto pb-4 custom-scrollbar">{item.images.map((src, k) => <div key={k} className="relative h-48 w-48 shrink-0 rounded-2xl overflow-hidden cursor-pointer group/img shadow-md" onClick={() => openImageModal(src)}><Image src={src} alt={`${getTitle(item)} image ${k + 1}`} fill sizes="192px" className="object-cover transition duration-500 group-hover/img:scale-110" /><div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-colors duration-300 flex items-center justify-center"><span className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 font-semibold">View</span></div></div>)}</div>}
                        </div>
                      ))}
                    </div>
                  )}

                  {isDevotionListSection(section) && (
                    <div className="text-center mt-10 bg-linear-to-br from-emerald-50 to-sky-50 dark:from-emerald-900/20 dark:to-sky-900/20 p-12 rounded-3xl border border-emerald-100 dark:border-emerald-800/50 shadow-sm">
                      <p className="text-xl mb-8 text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">I documented my spiritual journey with a 30-day devotion challenge. Click below to read my daily reflections.</p>
                      <button onClick={openListModal} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-10 rounded-full transition transform hover:scale-105 focus:outline-none shadow-xl text-lg">View All 30‑Day Devotions →</button>
                    </div>
                  )}

                  {isAccordionSection(section) && (
                    <div className="space-y-5">
                      {section.items.map((item, i) => {
                        const isOpen = activeAccordion === i;
                        return (
                          <div key={i} className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <button onClick={() => setActiveAccordion(isOpen ? null : i)} className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors focus:outline-none">
                              <span className="font-bold text-xl text-slate-900 dark:text-white">{item.title}</span>
                              <svg className={`w-6 h-6 text-emerald-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            {isOpen && <div className="px-8 pb-8 pt-4 border-t border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/50 text-lg leading-relaxed">{parseMarkdown(item.content)}</div>}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>
              </React.Fragment>
            );
          })}
        </div>

        {isDetailModalOpen && selectedDevotion && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-100 p-4" onClick={closeDetailModal}>
            <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 md:p-10 shadow-2xl custom-scrollbar border border-slate-200 dark:border-slate-700" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-8 border-b border-slate-100 dark:border-slate-700 pb-6">
                <h2 className="text-2xl md:text-3xl font-extrabold text-emerald-600 dark:text-white">
                  {new Date(selectedDevotion.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                </h2>
                <button onClick={closeDetailModal} className="text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-4xl transition focus:outline-none rounded-full p-1 leading-none">&times;</button>
              </div>
              <div className="space-y-8 text-slate-700 dark:text-slate-300">
                <div><h3 className="font-bold text-xl text-slate-900 dark:text-white mb-3">📖 Bible Reading</h3><p className="bg-slate-50 dark:bg-slate-700/50 p-5 rounded-2xl text-lg">{selectedDevotion.bibleReading}</p></div>
                {selectedDevotion.materialRead && <div><h3 className="font-bold text-xl text-slate-900 dark:text-white mb-3">📚 Material Read</h3><p className="bg-slate-50 dark:bg-slate-700/50 p-5 rounded-2xl text-lg">{selectedDevotion.materialRead}</p></div>}
                <div><h3 className="font-bold text-xl text-slate-900 dark:text-white mb-3">💭 Reflection</h3><p className="whitespace-pre-wrap leading-relaxed text-lg">{selectedDevotion.reflection}</p></div>
                <div><h3 className="font-bold text-xl text-slate-900 dark:text-white mb-3">✅ Application</h3><p className="whitespace-pre-wrap leading-relaxed text-lg">{selectedDevotion.application}</p></div>
                <div><h3 className="font-bold text-xl text-slate-900 dark:text-white mb-3">🙏 Prayer Focus</h3><p className="whitespace-pre-wrap leading-relaxed text-lg">{selectedDevotion.prayerFocus}</p></div>
                <div><h3 className="font-bold text-xl text-slate-900 dark:text-white mb-3">🎵 Song</h3><p className="italic text-lg">{selectedDevotion.song}</p></div>
              </div>
            </div>
          </div>
        )}
        
        {isListModalOpen && devotionSection && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-100 p-4" onClick={closeListModal}>
            <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 md:p-10 shadow-2xl custom-scrollbar border border-slate-200 dark:border-slate-700" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-8 border-b border-slate-100 dark:border-slate-700 pb-6">
                <h2 className="text-3xl font-extrabold dark:text-white">30‑Day Devotion Challenge</h2>
                <button onClick={closeListModal} className="text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-4xl transition focus:outline-none rounded-full p-1 leading-none">&times;</button>
              </div>
              <div className="space-y-5">
                {devotionSection.items.map((item, i) => {
                  const devotion = item as DevotionItem;
                  return (
                    <div key={i} className="border border-slate-100 dark:border-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition cursor-pointer bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700" onClick={() => { closeListModal(); openDetailModal(devotion); }}>
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div>
                          <h3 className="text-xl font-bold text-emerald-600 dark:text-white">
                            {new Date(devotion.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                          </h3>
                          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">📖 {devotion.bibleReading}</p>
                          <p className="text-slate-700 dark:text-slate-300 mt-4 line-clamp-2 text-lg leading-relaxed">{devotion.reflection}</p>
                        </div>
                        <span className="text-emerald-500 font-bold whitespace-nowrap md:ml-6 mt-2 md:mt-0 flex items-center">Read more <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {isImageModalOpen && selectedImage && (
          <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-100 p-4" onClick={closeImageModal}>
            <div className="relative w-full h-full max-w-6xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
              <button onClick={closeImageModal} className="absolute top-4 right-4 text-white text-5xl hover:text-slate-300 transition z-10 focus:outline-none rounded-full p-2 leading-none">&times;</button>
              <Image src={selectedImage} alt="Full size" fill sizes="100vw" className="object-contain" priority={false} />
            </div>
          </div>
        )}

        {/* ─── CLEAN CONTACT SECTION (banner + cards removed, only CTA buttons) ─── */}
        <section id="contact" className="py-20 animate-fade-in scroll-mt-32 border-t border-slate-100 dark:border-slate-800">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white pb-4 mb-4 inline-block relative">
              Get in Touch
              <span className="absolute bottom-0 left-1/4 w-1/2 h-1.5 bg-linear-to-r from-emerald-500 to-sky-500 rounded-full" />
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Whether it&apos;s a project, collaboration, or just a hello, I&apos;d love to hear from you.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <a
              href="https://wa.me/254705001193?text=Hello%20Samuel%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-base"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
            <a
              href="mailto:samueloyunge@example.com?subject=Inquiry%20from%20your%20portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-slate-200 dark:border-slate-700 text-base"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send an Email
            </a>
          </div>
        </section>

        <footer className="text-center text-slate-400 dark:text-slate-500 text-sm py-12 border-t border-slate-100 dark:border-slate-800">
          <p className="text-lg">© {year ?? ""} {data.name} – Master Guide Portfolio</p>
          <p className="mt-2">Built with Next.js, Tailwind CSS, and a lot of faith.</p>
        </footer>
      </main>
    </div>
  );
}