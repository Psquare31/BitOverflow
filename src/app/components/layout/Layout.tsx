"use client";

import React, { useEffect, useState } from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedMode !== null) {
      setDarkMode(savedMode === "true");
      return;
    }

    setDarkMode(prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-10rem] top-[-6rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(0,0,0,0.05),_transparent_68%)] blur-3xl dark:bg-[radial-gradient(circle,_rgba(255,255,255,0.05),_transparent_70%)]" />
        <div className="absolute right-[-10rem] top-[18rem] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,_rgba(0,0,0,0.045),_transparent_68%)] blur-3xl dark:bg-[radial-gradient(circle,_rgba(255,255,255,0.04),_transparent_68%)]" />
      </div>

      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode((current) => !current)} />

      <div className="flex gap-5 px-4 pb-14 pt-28 md:px-6 lg:gap-6 lg:px-8 lg:pt-32">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen((current) => !current)}
        />

        <main
          className={`min-w-0 flex-1 transition-[padding] duration-300 ${
            isSidebarOpen ? "lg:pl-[15.5rem]" : "lg:pl-[5.5rem]"
          }`}
        >
          <div className="w-full space-y-6">{children}</div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Layout;
