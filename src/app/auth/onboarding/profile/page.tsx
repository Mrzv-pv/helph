"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Upload, Camera } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function OnboardingProfilePage() {
  const { t } = useI18n();

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[var(--color-text-muted)]">{t("onboarding.step")} 2 {t("onboarding.stepOf")} 5</span>
          <button className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)]">{t("onboarding.skip")}</button>
        </div>
        <div className="h-1.5 bg-[var(--color-champagne)] rounded-full">
          <div className="h-full bg-[var(--color-gold)] rounded-full transition-all" style={{ width: "40%" }} />
        </div>
      </div>

      <div className="mb-8">
        <h1
          className="text-[28px] font-semibold tracking-[-0.5px]"
          style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
        >
          {t("onboarding.profile.title")}
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-2">
          {t("onboarding.profile.subtitle")}
        </p>
      </div>

      <Card className="p-6 space-y-5">
        {/* Avatar upload */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-[var(--color-green-forest)] flex items-center justify-center text-[#F5F0E8]">
            <Camera size={28} />
          </div>
          <div>
            <Button variant="outline" size="sm">
              <Upload size={16} />
              {t("onboarding.profile.uploadPhoto")}
            </Button>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">{t("onboarding.profile.photoFormat")}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label={t("auth.firstName")} placeholder="Иван" />
          <Input label={t("auth.lastName")} placeholder="Петров" />
        </div>

        <div>
          <label className="text-sm font-medium text-[var(--color-text)] mb-1.5 block">
            {t("onboarding.profile.bio")}
          </label>
          <textarea
            placeholder={t("onboarding.profile.bioPlaceholder")}
            maxLength={200}
            rows={3}
            className="w-full bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] px-[14px] py-[10px] text-[15px] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-gold)] focus:outline-2 focus:outline-[var(--color-gold-tint)] transition-all resize-none"
          />
          <p className="text-xs text-[var(--color-text-muted)] text-right mt-1">0 / 200</p>
        </div>

        <Input label={t("onboarding.profile.specialization")} placeholder={t("onboarding.profile.specPlaceholder")} />

        <div>
          <label className="text-sm font-medium text-[var(--color-text)] mb-1.5 block">
            {t("onboarding.profile.skills")}
          </label>
          <div className="flex flex-wrap gap-2 p-3 border border-[var(--color-border)] rounded-[var(--radius-md)] min-h-[44px]">
            <span className="bg-[var(--color-champagne)] text-[#8A6A10] text-xs px-3 py-1 rounded-full flex items-center gap-1">
              Figma <button className="hover:text-[var(--color-error)]">&times;</button>
            </span>
            <span className="bg-[var(--color-champagne)] text-[#8A6A10] text-xs px-3 py-1 rounded-full flex items-center gap-1">
              UI-дизайн <button className="hover:text-[var(--color-error)]">&times;</button>
            </span>
            <input type="text" placeholder={t("onboarding.profile.addSkill")} className="flex-1 min-w-[120px] text-sm border-0 outline-0 bg-transparent" />
          </div>
        </div>
      </Card>

      <div className="flex gap-3 mt-6">
        <Link href="/auth/onboarding/role">
          <Button variant="ghost" size="md">
            <ArrowLeft size={18} />
            {t("onboarding.back")}
          </Button>
        </Link>
        <Link href="/auth/onboarding/services" className="flex-1">
          <Button variant="primary" size="lg" className="w-full">
            {t("onboarding.continue")}
            <ArrowRight size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
