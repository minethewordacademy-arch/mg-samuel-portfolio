"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import honorData from "@/data/sanctuaryHonor.json";
import AssignmentForm from "@/components/AssignmentForm";

type QuizQuestion = {
  id: string;
  question: string;
  answer: string;
};

export default function SanctuaryHonorPage() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("darkMode");
      if (stored !== null) return JSON.parse(stored);
      return false;
    }
    return false;
  });
  
  const [copied, setCopied] = useState(false);

  // FIXED: Load data directly in the initializer to avoid setState in useEffect
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sanctuaryQuizAnswers");
      if (saved) return JSON.parse(saved);
    }
    const defaults: Record<string, string> = {};
    honorData.quizQuestions.forEach((q: QuizQuestion) => {
      defaults[q.id] = q.answer;
    });
    return defaults;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const updateQuizAnswer = (id: string, value: string) => {
    const updated = { ...quizAnswers, [id]: value };
    setQuizAnswers(updated);
    localStorage.setItem("sanctuaryQuizAnswers", JSON.stringify(updated));
  };

  const resetQuizAnswers = () => {
    const defaults: Record<string, string> = {};
    honorData.quizQuestions.forEach((q: QuizQuestion) => {
      defaults[q.id] = q.answer;
    });
    setQuizAnswers(defaults);
    localStorage.setItem("sanctuaryQuizAnswers", JSON.stringify(defaults));
    alert("Quiz answers reset to default.");
  };

  const saveQuizAnswers = () => {
    localStorage.setItem("sanctuaryQuizAnswers", JSON.stringify(quizAnswers));
    alert("Quiz answers saved!");
  };

  const sharePage = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 font-sans relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-200/30 dark:bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-200/30 dark:bg-sky-500/10 rounded-full blur-3xl"></div>
      </div>

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

      <main className="container mx-auto px-4 pt-32 pb-16 max-w-4xl relative z-10">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50 dark:border-slate-700/50 mb-16">
          <div className="p-10 md:p-16 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold bg-linear-to-r from-emerald-600 to-sky-600 dark:from-emerald-400 dark:to-sky-400 bg-clip-text text-transparent mb-6 pb-2">
              Sanctuary Honor
            </h1>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
              A complete digital portfolio of the Pathfinder Sanctuary Honour – including hand‑drawn scale model, written assignments, and all quiz questions.
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <button onClick={sharePage} className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-6 py-3 rounded-full text-sm font-bold hover:bg-emerald-200 dark:hover:bg-emerald-800/60 transition shadow-sm">
                📋 {copied ? "Link copied!" : "Share this page"}
              </button>
            </div>
          </div>
        </div>

        <section className="mb-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 dark:border-slate-700">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white pb-4 mb-8 inline-block relative">
            1. Scale Model of the Sanctuary
            <span className="absolute bottom-0 left-0 w-1/2 h-1.5 bg-linear-to-r from-emerald-500 to-sky-500 rounded-full" />
          </h2>
          <p className="mb-6 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            Hand‑drawn scale model showing the courtyard, the tabernacle, all furnishings, and cardinal directions (N, S, E, W).
          </p>
          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl text-center border border-slate-200 dark:border-slate-700">
            <Image src="/images/sanctuary-hand-drawn.jpeg" alt="Hand-drawn sanctuary scale model" width={800} height={600} className="mx-auto rounded-xl shadow-lg border border-slate-200 dark:border-slate-700" priority />
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-4">(Drawn by hand, scanned and uploaded)</p>
          </div>
        </section>

        <section className="mb-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 dark:border-slate-700">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white pb-4 mb-8 inline-block relative">
            2–4. Written Assignments
            <span className="absolute bottom-0 left-0 w-1/2 h-1.5 bg-linear-to-r from-emerald-500 to-sky-500 rounded-full" />
          </h2>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <AssignmentForm />
          </div>
        </section>

        <section className="mb-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 dark:border-slate-700">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white pb-4 mb-8 inline-block relative">
            📋 All Sanctuary Honour Questions (1a–11)
            <span className="absolute bottom-0 left-0 w-1/2 h-1.5 bg-linear-to-r from-emerald-500 to-sky-500 rounded-full" />
          </h2>
          <div className="space-y-8 mt-6">
            {honorData.quizQuestions.map((q: QuizQuestion) => (
              <div key={q.id} className="border-l-4 border-emerald-500 pl-6 bg-slate-50 dark:bg-slate-900 p-6 rounded-r-2xl">
                <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-200">{q.id}. {q.question}</h3>
                <textarea rows={4} className="w-full p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-lg" value={quizAnswers[q.id] || ""} onChange={(e) => updateQuizAnswer(q.id, e.target.value)} />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 mt-10">
            <button onClick={saveQuizAnswers} className="bg-emerald-600 text-white font-bold px-8 py-3 rounded-full hover:bg-emerald-700 transition shadow-md hover:shadow-lg">💾 Save Quiz Answers</button>
            <button onClick={resetQuizAnswers} className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold px-8 py-3 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition shadow-sm">⟳ Reset to Default</button>
          </div>
        </section>

        <section className="mb-16 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 dark:border-slate-700">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white pb-4 mb-8 inline-block relative">
            📚 Quick Study Notes
            <span className="absolute bottom-0 left-0 w-1/2 h-1.5 bg-linear-to-r from-emerald-500 to-sky-500 rounded-full" />
          </h2>
          <details className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 cursor-pointer group">
            <summary className="font-bold text-lg text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 transition-colors">Click to view sanctuary facts</summary>
            <div className="mt-6 space-y-3 text-lg text-slate-700 dark:text-slate-300">
              <p><strong>Three parts:</strong> Court, Holy Place, Most Holy Place.</p>
              <p><strong>Furnishings in the Court:</strong> Altar of Sacrifice, Laver.</p>
              <p><strong>Holy Place:</strong> Table of Showbread, Lampstand, Altar of Incense.</p>
              <p><strong>Most Holy Place:</strong> Ark of the Covenant, Mercy Seat, Cherubim.</p>
              <p><strong>Coverings:</strong> Inner linen (Jesus&apos; character), Goats&apos; hair (perfection), Rams&apos; skins (blood), Badgers&apos; skins (humanity).</p>
            </div>
          </details>
        </section>

        <div className="text-center mt-16">
          <Link href="/" className="inline-flex items-center gap-2 bg-linear-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all transform hover:scale-105">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Return to Portfolio
          </Link>
        </div>
      </main>
      <footer />
    </div>
  );
}