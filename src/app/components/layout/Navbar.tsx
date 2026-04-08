"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";

import { useAuthStore } from "@/store/Auth";
import slugify from "@/utils/slugify";

import Logo from "../ui/Logo";

type NavbarProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

type NavItem = {
  href: string;
  label: string;
  external?: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { session, logout, user } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = useMemo<NavItem[]>(
    () => [
      { href: "/questions", label: "Questions" },
      { href: "/club", label: "Clubs" },
      { href: "/events", label: "Events" },
      { href: "/leaderboard", label: "Leaderboard" },
      { href: "https://re-maps.vercel.app/", label: "Remap", external: true },
    ],
    []
  );

  const profileHref = user ? `/users/${user.$id}/${slugify(user.name)}` : "";

  const isActive = (href: string, external?: boolean) => {
    if (external) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 pt-4">
      <div className="page-shell">
        <div
          className={`glass-panel relative rounded-[28px] px-4 py-3 transition-all duration-300 md:px-6 ${
            isScrolled ? "shadow-[var(--shadow)]" : "shadow-[var(--shadow-soft)]"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <Logo />

            <div className="hidden items-center gap-2 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    isActive(item.href, item.external)
                      ? "bg-[var(--text)] text-white"
                      : "text-[var(--muted)] hover:text-[var(--text)]"
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {item.label}
                    {item.external ? <ArrowUpRight size={14} /> : null}
                  </span>
                </Link>
              ))}
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <button
                onClick={toggleDarkMode}
                className="glass-panel flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)] transition-colors hover:text-[var(--accent)]"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {session ? (
                <div className="flex items-center gap-3">
                  <Link href={profileHref} className="chip">
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="paper-button paper-button-primary text-sm font-semibold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/login" className="paper-button paper-button-secondary text-sm">
                    Login
                  </Link>
                  <Link href="/register" className="paper-button paper-button-primary text-sm font-semibold">
                    Join BitOverflow
                  </Link>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={toggleDarkMode}
                className="glass-panel flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)] transition-colors hover:text-[var(--accent)]"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setIsOpen((current) => !current)}
                className="glass-panel flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)]"
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 lg:hidden ${
              isOpen ? "max-h-[420px] pt-4" : "max-h-0"
            }`}
          >
            <div className="soft-divider space-y-3 pt-4">
              <div className="grid gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    className={`flex items-center justify-between rounded-[18px] px-4 py-3 text-sm transition-colors ${
                      isActive(item.href, item.external)
                        ? "bg-[var(--text)] text-white"
                        : "glass-panel text-[var(--muted)]"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{item.label}</span>
                    {item.external ? <ArrowUpRight size={16} /> : null}
                  </Link>
                ))}
              </div>

              {session ? (
                <div className="grid gap-2">
                  <Link
                    href={profileHref}
                    className="paper-button paper-button-secondary justify-between text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      logout();
                    }}
                    className="paper-button paper-button-primary justify-center text-sm font-semibold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid gap-2 sm:grid-cols-2">
                  <Link
                    href="/login"
                    className="paper-button paper-button-secondary text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="paper-button paper-button-primary text-sm font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    Join BitOverflow
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
