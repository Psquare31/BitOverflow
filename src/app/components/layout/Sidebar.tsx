"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Compass,
  Home,
  MessageCircleQuestion,
  Tag,
  Trophy,
  Users,
} from "lucide-react";

type SidebarProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const sidebarItems = [
  { id: "home", label: "Home", icon: Home, href: "/" },
  { id: "questions", label: "Questions", icon: MessageCircleQuestion, href: "/questions" },
  { id: "tags", label: "Tags", icon: Tag, href: "/questions" },
  { id: "events", label: "Events", icon: Bell, href: "/events" },
  { id: "clubs", label: "Clubs", icon: Users, href: "/club" },
  { id: "leaderboard", label: "Leaderboard", icon: Trophy, href: "/leaderboard" },
  { id: "remap", label: "Remap", icon: Compass, href: "https://re-maps.vercel.app/", external: true },
];

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed left-4 top-[7.7rem] z-30 hidden h-[calc(100vh-9.2rem)] transition-all duration-300 md:left-6 lg:left-8 lg:block ${
        isSidebarOpen ? "w-48" : "w-[68px]"
      }`}
    >
      <div className="glass-panel flex h-full flex-col rounded-[30px] p-3">
        <div className={`px-3 pb-4 pt-2 ${isSidebarOpen ? "block" : "hidden"}`}>
          <p className="mono-label text-[10px] text-[var(--soft)]">Navigate</p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Campus tools, discussions, and live student spaces.
          </p>
        </div>

        <nav className="flex flex-1 flex-col gap-2" aria-label="Sidebar">
          {sidebarItems.map((item) => {
            const active =
              !item.external &&
              (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href));

            return (
              <Link
                key={item.id}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className={`flex items-center gap-3 rounded-[20px] px-3 py-3 text-sm transition-colors ${
                  active
                    ? "bg-black/8 text-[var(--text)] dark:bg-white/12 dark:text-white"
                    : "text-[var(--muted)] hover:bg-white/60 hover:text-[var(--text)] dark:hover:bg-white/5"
                }`}
              >
                <item.icon size={18} />
                <span className={`${isSidebarOpen ? "block" : "hidden"}`}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <button
          onClick={toggleSidebar}
          className="glass-panel mt-3 flex h-11 items-center justify-center gap-2 rounded-[20px] border border-[var(--border)] text-sm text-[var(--muted)] transition-colors hover:text-[var(--text)]"
        >
          {isSidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          <span className={`${isSidebarOpen ? "block" : "hidden"}`}>Collapse rail</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
