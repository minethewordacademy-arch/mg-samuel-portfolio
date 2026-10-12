// src/components/AssignmentForm.tsx
"use client";

import { useState } from "react";

export default function AssignmentForm() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    { id: "2a", label: "2a. What is the meaning of the sanctuary service?" },
    { id: "3a", label: "3a. Describe the furniture in the Holy Place." },
    { id: "4a", label: "4a. What do the coverings of the sanctuary represent?" },
  ];

  const handleChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="space-y-6">
      {questions.map((q) => (
        <div key={q.id} className="border-l-4 border-sky-500 pl-6">
          <label htmlFor={q.id} className="block text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
            {q.label}
          </label>
          <textarea
            id={q.id}
            rows={4}
            value={answers[q.id] || ""}
            onChange={(e) => handleChange(q.id, e.target.value)}
            className="w-full p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            placeholder="Type your answer here..."
          />
        </div>
      ))}
    </div>
  );
}