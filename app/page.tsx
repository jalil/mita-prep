"use client";

import React, { useState, useEffect } from "react";
import { CurriculumTracker } from "@/components/CurriculumTracker";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import { getMistakes, Mistake } from "@/lib/progress";
import { getModule } from "@/lib/data";

import { useAuth } from "@/components/providers/AuthProvider";
import { useRef } from "react";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";

// ... existing imports

function MistakesButton() {
  const { user } = useAuth();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    const updateCount = () => {
      setCount(getMistakes(user.id).length);
    };

    updateCount();
    window.addEventListener("mistakes-updated", updateCount);
    return () => window.removeEventListener("mistakes-updated", updateCount);
  }, [user]);

  return (
    <Link href="/mistakes" className="block">
      <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors text-sm font-medium">
        <span>Mistakes Review</span>
        {count > 0 ? (
          <span className="text-xs bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded text-red-600 dark:text-red-400 font-bold">
            {count} Pending
          </span>
        ) : (
          <span className="text-xs bg-gray-100 dark:bg-zinc-700 px-2 py-0.5 rounded text-gray-400">
            0 Pending
          </span>
        )}
      </button>
    </Link>
  );
}


// ... existing imports

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      {/* Welcome Section */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}.</h1>
        <p className="text-muted-foreground text-gray-500">
          You are on track for your Mita International School entrance exam.
        </p>
      </header>

      {/* Progress Tracker */}
      <CurriculumTracker />

      {/* Analytics Dashboard (Only shows if data exists) */}
      <AnalyticsDashboard />

      {/* Continue Learning Card */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-8 text-white relative overflow-hidden shadow-lg group">
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
              <Clock size={12} />
              Current Module
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">Week 12: Utilitarianism in Tech</h3>
              <p className="text-indigo-100 max-w-lg">
                Explore the ethical implications of AI decision-making through a utilitarian framework.
              </p>
            </div>
            <Link
              href="/week/12"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              Continue Module
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Decorative Pattern */}
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12 group-hover:scale-105 transition-transform duration-500">
            <BookOpen size={200} />
          </div>
        </div>

        {/* Stats / Quick Actions */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-border flex flex-col justify-center space-y-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white">Quick Review</h3>
          <div className="space-y-3">
            <Link href="/vocabulary" className="block">
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors text-sm font-medium">
                <span>Vocabulary List</span>
                <span className="text-xs bg-gray-200 dark:bg-zinc-600 px-2 py-0.5 rounded text-gray-600 dark:text-gray-300">12 New</span>
              </button>
            </Link>
            <MistakesButton />
          </div>
        </div>
      </div>

      {/* Recent Activity or Upcoming */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Upcoming Modules</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {[13, 14, 15].map((week) => {
            const module = getModule(week);
            return (
              <Link key={week} href={`/week/${week}`} className="block">
                <div className="p-4 rounded-lg border border-border bg-white dark:bg-zinc-900 hover:border-primary/50 transition-colors cursor-pointer opacity-70 hover:opacity-100 h-full">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Week {week}</span>
                  <h4 className="font-semibold mt-1">{module ? module.title : "Coming Soon"}</h4>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
