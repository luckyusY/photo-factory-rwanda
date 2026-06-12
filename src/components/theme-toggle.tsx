"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Floating Dark/Light theme switcher. A compact vertical segmented pill pinned
 * to the left edge of the viewport. Sets the chosen theme on <html>, persists it to
 * localStorage, and stays in sync with the no-flash inline script in the root
 * layout.
 */
export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const apply = (dark: boolean) => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      // Ignore storage failures (private mode, etc.)
    }
    setIsDark(dark);
  };

  // Before hydration resolves, treat light as active to match server output.
  const dark = mounted && isDark;

  const seg =
    "grid h-8 w-8 place-items-center rounded-full transition sm:h-9 sm:w-9";
  const active = "bg-[#d9a441] text-black shadow";
  const inactive = "text-[#ffcf57]/75 hover:bg-white/10 hover:text-[#ffcf57]";

  return (
    <div
      role="group"
      aria-label="Theme"
      className="fixed left-1 top-1/2 z-[60] -translate-y-1/2 print:hidden sm:left-2"
    >
      <div className="flex flex-col gap-0.5 rounded-full border border-[#d9a441]/40 bg-[#15110a]/95 p-0.5 shadow-lg shadow-black/30 backdrop-blur sm:p-1">
        <button
          type="button"
          onClick={() => apply(true)}
          title="Dark mode"
          aria-label="Dark mode"
          aria-pressed={dark}
          className={`${seg} ${dark ? active : inactive}`}
        >
          <Moon aria-hidden size={15} />
        </button>
        <button
          type="button"
          onClick={() => apply(false)}
          title="Light mode"
          aria-label="Light mode"
          aria-pressed={!dark}
          className={`${seg} ${!dark ? active : inactive}`}
        >
          <Sun aria-hidden size={15} />
        </button>
      </div>
    </div>
  );
}
