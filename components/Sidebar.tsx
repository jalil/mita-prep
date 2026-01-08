"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, TrendingUp, Calendar, Zap, Settings, Menu, X, GraduationCap, Lightbulb, Flame } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useAuth } from "@/components/providers/AuthProvider";
import { useXP } from "@/components/providers/XPProvider";
import { LogOut } from "lucide-react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const modules = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Week ${i + 1}`,
  topic: ["Ethics", "Media", "Global", "Education"][i % 4],
}));

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { streak, dailyXP, dailyGoal } = useXP();

  const progressPercent = Math.min(100, Math.round((dailyXP / dailyGoal) * 100));

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-background border border-border rounded-md md:hidden"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-border transition-transform duration-300 ease-in-out md:translate-x-0",
          !isOpen && "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <div className="p-1.5 bg-primary rounded-lg text-primary-foreground">
                <GraduationCap size={20} />
              </div>
              <span>Mita Prep</span>
            </Link>
          </div>

          <div className="px-5 py-2">
            <ThemeSwitcher />
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 no-scrollbar">

            {/* Stats Card */}
            {user && (
              <div className="mb-6 px-3">
                <div className="p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg border border-border space-y-3">
                  {/* Streak */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Flame className={cn("text-orange-500", streak > 0 && "fill-orange-500")} size={16} />
                      <span>{streak} Day Streak</span>
                    </div>
                  </div>

                  {/* Daily Goal */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Daily Goal</span>
                      <span>{dailyXP} / {dailyGoal} XP</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 transition-all duration-500 rounded-full"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="px-3 mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Main
            </div>
            <NavItem icon={<TrendingUp size={18} />} label="Dashboard" href="/" active={pathname === "/"} />
            <NavItem icon={<BookOpen size={18} />} label="Training" href="/training/paraphrase" active={pathname === "/training/paraphrase"} />
            <NavItem icon={<Zap size={18} />} label="Vocab Blitz" href="/training/blitz" active={pathname === "/training/blitz"} />
            <NavItem icon={<Zap size={18} />} label="No-Copy Trainer" href="/trainer" active={pathname === "/trainer"} />
            <NavItem icon={<Lightbulb size={18} />} label="Tips & Tricks" href="/tips" active={pathname === "/tips"} />

            <div className="mt-8 px-3 mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Curriculum (12 Weeks • 4 Passages/Wk)
            </div>
            {modules.map((mod) => (
              <Link
                key={mod.id}
                href={`/week/${mod.id}`}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname === `/week/${mod.id}`
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-accent hover:text-foreground dark:text-gray-400"
                )}
              >
                <span className="w-6 text-xs text-gray-400">W{mod.id}</span>
                <span className="flex-1 truncate">{mod.title}</span>
                <span
                  className={cn(
                    "w-2 h-2 rounded-full",
                    mod.topic === "Ethics" && "bg-ethics",
                    mod.topic === "Media" && "bg-media",
                    mod.topic === "Global" && "bg-global",
                    mod.topic === "Education" && "bg-education"
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            {/* Authenticated User Footer */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center font-bold text-xs uppercase">
                {user?.name.slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <button
                  onClick={logout}
                  className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 mt-0.5"
                >
                  <LogOut size={10} />
                  Log Out
                </button>
              </div>
              <Settings size={16} className="text-gray-400 hover:text-foreground cursor-pointer" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function NavItem({ icon, label, href, active }: { icon: React.ReactNode; label: string; href: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
        active ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-accent hover:text-foreground dark:text-gray-400"
      )}
    >
      {icon}
      {label}
    </Link>
  );
}
