"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-[var(--color-green-dark)] text-[#F5F0E8]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-[40px] h-[40px] rounded-lg bg-[var(--color-gold)] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D2818" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <span className="text-xl font-semibold tracking-[-0.5px]" style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}>
                HELP<span className="text-[var(--color-gold)]">H</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--color-sage)] leading-relaxed">{t("footer.description")}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-gold)] mb-4">{t("footer.platform")}</h4>
            <ul className="space-y-3">
              <li><Link href="/catalog" className="text-sm text-[var(--color-sage)] hover:text-[#F5F0E8] transition-colors">{t("footer.findSpecialist")}</Link></li>
              <li><Link href="/auth/register" className="text-sm text-[var(--color-sage)] hover:text-[#F5F0E8] transition-colors">{t("footer.becomeSpecialist")}</Link></li>
              <li><Link href="/catalog" className="text-sm text-[var(--color-sage)] hover:text-[#F5F0E8] transition-colors">{t("footer.serviceCategories")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-gold)] mb-4">{t("footer.company")}</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-[var(--color-sage)] hover:text-[#F5F0E8] transition-colors">{t("footer.about")}</Link></li>
              <li><Link href="/" className="text-sm text-[var(--color-sage)] hover:text-[#F5F0E8] transition-colors">{t("footer.blog")}</Link></li>
              <li><Link href="/" className="text-sm text-[var(--color-sage)] hover:text-[#F5F0E8] transition-colors">{t("footer.support")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-gold)] mb-4">{t("footer.legal")}</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-[var(--color-sage)] hover:text-[#F5F0E8] transition-colors">{t("footer.terms")}</Link></li>
              <li><Link href="/" className="text-sm text-[var(--color-sage)] hover:text-[#F5F0E8] transition-colors">{t("footer.privacy")}</Link></li>
              <li><Link href="/" className="text-sm text-[var(--color-sage)] hover:text-[#F5F0E8] transition-colors">{t("footer.cookie")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--color-green-forest)] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--color-sage)]">&copy; 2024 HELPH. {t("footer.rights")}</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[var(--color-sage)] hover:text-[#F5F0E8] transition-colors" aria-label="Telegram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.751-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.12.098.153.229.168.327.016.098.035.322.02.496z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
