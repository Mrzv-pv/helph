"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useI18n();

  return (
    <header className="bg-[var(--color-green-dark)] text-[#F5F0E8] sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-[72px]">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-[40px] h-[40px] rounded-lg bg-[var(--color-gold)] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 100 100" fill="none">
                {/* Letter H */}
                <rect x="15" y="10" width="14" height="80" rx="3" fill="#0D2818"/>
                <rect x="71" y="10" width="14" height="80" rx="3" fill="#0D2818"/>
                <rect x="29" y="40" width="42" height="14" rx="3" fill="#0D2818"/>
                {/* Hammer head on top of right leg */}
                <rect x="60" y="4" width="36" height="12" rx="2" fill="#0D2818"/>
              </svg>
            </div>
            <span className="text-xl font-semibold tracking-[-0.5px]" style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}>
              HELP<span className="text-[var(--color-gold)]">H</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/catalog" className="text-[15px] text-[var(--color-sage)] hover:text-[#F5F0E8] transition-colors">
              {t("nav.specialists")}
            </Link>
            <Link href="/catalog" className="text-[15px] text-[var(--color-sage)] hover:text-[#F5F0E8] transition-colors">
              {t("nav.categories")}
            </Link>
            <Link href="/catalog" className="text-[15px] text-[var(--color-sage)] hover:text-[#F5F0E8] transition-colors">
              {t("nav.howItWorks")}
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <button className="p-2 rounded-lg hover:bg-[var(--color-green-forest)] transition-colors">
              <Search size={20} className="text-[var(--color-sage)]" />
            </button>
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="text-[#F5F0E8] hover:text-[#F5F0E8]">
                {t("nav.login")}
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="primary" size="sm">
                {t("nav.register")}
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button className="p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-6 border-t border-[var(--color-green-forest)]">
            <nav className="flex flex-col gap-4 pt-4">
              <Link href="/catalog" className="text-[15px] text-[var(--color-sage)] hover:text-[#F5F0E8]">{t("nav.specialists")}</Link>
              <Link href="/catalog" className="text-[15px] text-[var(--color-sage)] hover:text-[#F5F0E8]">{t("nav.categories")}</Link>
              <Link href="/catalog" className="text-[15px] text-[var(--color-sage)] hover:text-[#F5F0E8]">{t("nav.howItWorks")}</Link>
              <div className="flex gap-3 pt-2">
                <Link href="/auth/login"><Button variant="outline" size="sm">{t("nav.login")}</Button></Link>
                <Link href="/auth/register"><Button variant="primary" size="sm">{t("nav.register")}</Button></Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
