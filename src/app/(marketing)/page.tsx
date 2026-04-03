"use client";

import { Button } from "@/components/ui/button";
import { SpecialistCard } from "@/components/features/specialist-card";
import { useI18n } from "@/lib/i18n";
import { getSpecialists, categories, getTestimonials } from "@/lib/mock-data";
import {
  Search, ArrowRight, CheckCircle, MessageSquare, Shield,
  Scale, Calculator, Palette, TrendingUp, Code, Users, Globe, MessageCircle,
} from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, React.ReactNode> = {
  Scale: <Scale size={28} />,
  Calculator: <Calculator size={28} />,
  Palette: <Palette size={28} />,
  TrendingUp: <TrendingUp size={28} />,
  Code: <Code size={28} />,
  MessageSquare: <MessageSquare size={28} />,
  Users: <Users size={28} />,
  Globe: <Globe size={28} />,
};

export default function HomePage() {
  const { t, locale } = useI18n();
  const specialists = getSpecialists(locale);
  const testimonials = getTestimonials(locale);
  const currency = locale === "ru" ? "\u20BD" : "\u20AC";

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[var(--color-green-dark)] relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label mb-4">{t("hero.label")}</p>
              <h1
                className="text-[36px] lg:text-[44px] font-semibold text-[#F5F0E8] leading-tight tracking-[-0.5px] mb-5"
                style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
              >
                {t("hero.title")}
              </h1>
              <p className="text-base lg:text-lg text-[var(--color-sage)] mb-8 max-w-xl leading-relaxed">
                {t("hero.subtitle")}
              </p>

              {/* Search bar */}
              <div className="flex gap-3 max-w-lg">
                <div className="flex-1 relative">
                  <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                  <input
                    type="text"
                    placeholder={t("hero.searchPlaceholder")}
                    className="w-full bg-white border-0 rounded-[var(--radius-md)] pl-10 pr-4 py-3 text-[15px] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-2 focus:outline-[var(--color-gold)]"
                  />
                </div>
                <Link href="/catalog">
                  <Button variant="primary" size="lg">
                    {t("hero.searchBtn")}
                  </Button>
                </Link>
              </div>

              {/* Trust numbers */}
              <div className="flex gap-8 mt-10">
                <div>
                  <div className="text-2xl font-semibold text-[var(--color-gold-light)]">2 500+</div>
                  <div className="text-sm text-[var(--color-sage)]">{t("hero.specialists")}</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-[var(--color-gold-light)]">12 000+</div>
                  <div className="text-sm text-[var(--color-sage)]">{t("hero.projects")}</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-[var(--color-gold-light)]">4.8</div>
                  <div className="text-sm text-[var(--color-sage)]">{t("hero.avgRating")}</div>
                </div>
              </div>
            </div>

            {/* Hero illustration (abstract SVG) */}
            <div className="hidden lg:flex items-center justify-center">
              <svg width="420" height="340" viewBox="0 0 420 340" fill="none" className="opacity-90">
                {/* Abstract connection illustration */}
                <circle cx="140" cy="170" r="80" fill="#1A4731" />
                <circle cx="280" cy="170" r="80" fill="#1A4731" />
                <rect x="140" y="150" width="140" height="40" rx="20" fill="#1A4731" />
                {/* Person silhouette 1 */}
                <circle cx="140" cy="145" r="28" fill="#2A6B47" />
                <path d="M112 200 a28 20 0 0 1 56 0" fill="#2A6B47" />
                {/* Person silhouette 2 */}
                <circle cx="280" cy="145" r="28" fill="#2A6B47" />
                <path d="M252 200 a28 20 0 0 1 56 0" fill="#2A6B47" />
                {/* Connection ring */}
                <circle cx="210" cy="170" r="30" stroke="#B8962E" strokeWidth="3" fill="none" />
                <circle cx="210" cy="170" r="8" fill="#B8962E" />
                {/* Decorative dots */}
                <circle cx="60" cy="80" r="4" fill="#7A9B88" opacity="0.5" />
                <circle cx="360" cy="260" r="4" fill="#7A9B88" opacity="0.5" />
                <circle cx="340" cy="70" r="6" fill="#B8962E" opacity="0.3" />
                <circle cx="80" cy="280" r="6" fill="#B8962E" opacity="0.3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <p className="section-label mb-3 text-center">{t("howItWorks.label")}</p>
          <h2
            className="text-[28px] font-semibold text-center mb-14 tracking-[-0.5px]"
            style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
          >
            {t("howItWorks.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Search size={28} />, title: t("howItWorks.step1.title"), desc: t("howItWorks.step1.desc") },
              { icon: <MessageCircle size={28} />, title: t("howItWorks.step2.title"), desc: t("howItWorks.step2.desc") },
              { icon: <CheckCircle size={28} />, title: t("howItWorks.step3.title"), desc: t("howItWorks.step3.desc") },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-champagne)] flex items-center justify-center mx-auto mb-5 text-[var(--color-gold)]">
                  {step.icon}
                </div>
                <div className="text-xs font-semibold text-[var(--color-gold)] mb-2">{t("howItWorks.step")} {i + 1}</div>
                <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <p className="section-label mb-3">{t("categories.label")}</p>
          <h2
            className="text-[28px] font-semibold mb-10 tracking-[-0.5px]"
            style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
          >
            {t("categories.title")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/catalog?category=${cat.slug}`}
                className="group flex flex-col items-center gap-3 p-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] hover:shadow-[var(--shadow-card)] hover:border-[var(--color-gold)] transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--color-champagne)] flex items-center justify-center text-[var(--color-gold)] group-hover:bg-[var(--color-gold)] group-hover:text-[var(--color-green-dark)] transition-colors">
                  {iconMap[cat.icon]}
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium">{t(cat.nameKey)}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{cat.count} {t("categories.specialists")}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Specialists */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-label mb-3">{t("topSpecs.label")}</p>
              <h2
                className="text-[28px] font-semibold tracking-[-0.5px]"
                style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
              >
                {t("topSpecs.title")}
              </h2>
            </div>
            <Link href="/catalog">
              <Button variant="outline" size="sm">
                {t("topSpecs.viewAll")} <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {specialists.slice(0, 4).map((s) => (
              <SpecialistCard key={s.id} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <p className="section-label mb-3 text-center">{t("testimonials.label")}</p>
          <h2
            className="text-[28px] font-semibold text-center mb-14 tracking-[-0.5px]"
            style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
          >
            {t("testimonials.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item, i) => (
              <div key={i} className="p-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg)]">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="var(--color-gold)" stroke="var(--color-gold)" strokeWidth="1.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">&ldquo;{item.text}&rdquo;</p>
                <div>
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[var(--color-green-dark)] py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 text-center">
          <h2
            className="text-[32px] font-semibold text-[#F5F0E8] mb-4 tracking-[-0.5px]"
            style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
          >
            {t("cta.title")}
          </h2>
          <p className="text-base text-[var(--color-sage)] mb-8 max-w-md mx-auto">
            {t("cta.subtitle")}
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/catalog">
              <Button variant="primary" size="lg">
                {t("cta.findSpecialist")}
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="outline" size="lg" className="border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-green-forest)]">
                {t("cta.becomeSpecialist")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
