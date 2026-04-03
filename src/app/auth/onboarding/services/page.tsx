"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function OnboardingServicesPage() {
  const { t } = useI18n();

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[var(--color-text-muted)]">{t("onboarding.step")} 3 {t("onboarding.stepOf")} 5</span>
          <button className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)]">{t("onboarding.skip")}</button>
        </div>
        <div className="h-1.5 bg-[var(--color-champagne)] rounded-full">
          <div className="h-full bg-[var(--color-gold)] rounded-full transition-all" style={{ width: "60%" }} />
        </div>
      </div>

      <div className="mb-8">
        <h1
          className="text-[28px] font-semibold tracking-[-0.5px]"
          style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
        >
          {t("onboarding.service.title")}
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-2">
          {t("onboarding.service.subtitle")}
        </p>
      </div>

      <Card className="p-6 space-y-5">
        <Input label={t("onboarding.service.name")} placeholder={t("onboarding.service.namePlaceholder")} />

        <div>
          <label className="text-sm font-medium text-[var(--color-text)] mb-1.5 block">{t("onboarding.service.category")}</label>
          <select className="w-full bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] px-[14px] py-[10px] text-[15px] text-[var(--color-text)] focus:border-[var(--color-gold)] focus:outline-2 focus:outline-[var(--color-gold-tint)]">
            <option value="">{t("onboarding.service.selectCategory")}</option>
            <option>{t("cat.law")}</option>
            <option>{t("cat.finance")}</option>
            <option>{t("cat.design")}</option>
            <option>{t("cat.marketing")}</option>
            <option>{t("cat.it")}</option>
            <option>{t("cat.consulting")}</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label={t("onboarding.service.price")} type="number" placeholder="5000" />
          <Input label={t("onboarding.service.deadline")} type="number" placeholder="7" />
        </div>

        <div>
          <label className="text-sm font-medium text-[var(--color-text)] mb-1.5 block">{t("onboarding.service.description")}</label>
          <textarea
            placeholder={t("onboarding.service.descPlaceholder")}
            rows={3}
            className="w-full bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] px-[14px] py-[10px] text-[15px] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-gold)] focus:outline-2 focus:outline-[var(--color-gold-tint)] transition-all resize-none"
          />
        </div>
      </Card>

      <div className="flex gap-3 mt-6">
        <Link href="/auth/onboarding/profile">
          <Button variant="ghost" size="md">
            <ArrowLeft size={18} />
            {t("onboarding.back")}
          </Button>
        </Link>
        <Link href="/auth/onboarding/verify" className="flex-1">
          <Button variant="primary" size="lg" className="w-full">
            {t("onboarding.continue")}
            <ArrowRight size={18} />
          </Button>
        </Link>
      </div>

      <div className="text-center mt-4">
        <Link href="/auth/onboarding/verify" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
          {t("onboarding.service.skipLater")}
        </Link>
      </div>
    </div>
  );
}
