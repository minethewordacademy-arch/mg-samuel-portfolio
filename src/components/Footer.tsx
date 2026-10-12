// src/components/Footer.tsx
"use client";

import { useState, useEffect } from "react";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="mt-20">
      {/* Gradient divider */}
      <div className="h-px bg-linear-to-r from-transparent via-emerald-500/40 to-transparent mb-8" />

      <div className="flex flex-col items-center gap-3 text-center pb-12">
        <p className="text-base text-slate-500 dark:text-slate-400">
          © {year ?? ""}{" "}
          <span className="font-bold bg-linear-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
            Mg Samuel Oyunge
          </span>{" "}
          – Master Guide Portfolio
        </p>
        <p className="text-sm text-slate-400 dark:text-slate-500">
          Built with Next.js, Tailwind CSS, and a lot of faith. 🙏
        </p>
      </div>
    </footer>
  );
}