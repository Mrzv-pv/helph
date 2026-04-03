"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Mail, Upload, Shield, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function OnboardingVerifyPage() {
  const { t } = useI18n();

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[var(--color-text-muted)]">{t("onboarding.step")} 4 {t("onboarding.stepOf")} 5</span>
          <button className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)]">{t("onboarding.skip")}</button>
        </div>
        <div className="h-1.5 bg-[var(--color-champagne)] rounded-full">
          <div className="h-full bg-[var(--color-gold)] rounded-full transition-all" style={{ width: "80%" }} />
        </div>
      </div>

      <div className="mb-8">
        <h1
          className="text-[28px] font-semibold tracking-[-0.5px]"
          style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
        >
          {t("onboarding.verify.title")}
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-2">
          {t("onboarding.verify.subtitle")}
        </p>
      </div>

      {/* Email verification */}
      <Card className="p-6 mb-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-[var(--color-champagne)] flex items-center justify-center text-[var(--color-gold)] shrink-0">
            <Mail size={20} />
          </div>
          <div className="flex-1">
            <h3 className="text-[15px] font-medium mb-1">{t("onboarding.verify.emailTitle")}</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-3">
              {t("onboarding.verify.emailSent")}
            </p>
            <div className="flex gap-2">
              <Input placeholder={t("onboarding.verify.enterCode")} className="max-w-[200px]" />
              <Button variant="primary" size="md">{t("onboarding.verify.confirm")}</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Document verification */}
      <Card className="p-6 mb-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-[var(--color-champagne)] flex items-center justify-center text-[var(--color-gold)] shrink-0">
            <Shield size={20} />
          </div>
          <div className="flex-1">
            <h3 className="text-[15px] font-medium mb-1">
              {t("onboarding.verify.docTitle")}
              <span className="text-xs text-[var(--color-text-muted)] font-normal ml-2">{t("onboarding.verify.optional")}</span>
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-3">
              {t("onboarding.verify.docDesc")}
            </p>
            <div className="flex items-center gap-3">
              <div className="flex-1 border-2 border-dashed border-[var(--color-border)] rounded-[var(--radius-md)] p-6 text-center hover:border-[var(--color-gold)] transition-colors cursor-pointer">
                <Upload size={24} className="mx-auto mb-2 text-[var(--color-text-muted)]" />
                <p className="text-sm text-[var(--color-text-muted)]">{t("onboarding.verify.dragDrop")}</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">{t("onboarding.verify.fileFormat")}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3 text-xs text-[var(--color-text-muted)]">
              <CheckCircle size={14} className="text-[var(--color-green-mid)]" />
              {t("onboarding.verify.processing")}
            </div>
          </div>
        </div>
      </Card>

      <div className="flex gap-3 mt-6">
        <Link href="/auth/onboarding/services">
          <Button variant="ghost" size="md">
            <ArrowLeft size={18} />
            {t("onboarding.back")}
          </Button>
        </Link>
        <Link href="/auth/onboarding/welcome" className="flex-1">
          <Button variant="primary" size="lg" className="w-full">
            {t("onboarding.continue")}
            <ArrowRight size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
