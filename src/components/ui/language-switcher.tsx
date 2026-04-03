"use client";

import { useState, useRef, useEffect } from "react";
import { useI18n, localeNames, localeFlags, type Locale } from "@/lib/i18n";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const locales: Locale[] = ["sl", "en", "ru", "de"];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-[var(--radius-md)] hover:bg-[var(--color-green-forest)] transition-colors text-sm text-[var(--color-sage)] hover:text-[#F5F0E8]"
      >
        <Globe size={16} />
        <span className="uppercase text-xs font-medium">{locale}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-[var(--shadow-card)] py-1 min-w-[180px] z-50">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => { setLocale(l); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                l === locale
                  ? "bg-[var(--color-champagne)] text-[var(--color-text)] font-medium"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg)]"
              }`}
            >
              <span className="text-base">{localeFlags[l]}</span>
              <span>{localeNames[l]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
