"use client";

import { Button } from "@/components/ui/button";
import { Search, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function OnboardingRolePage() {
  const [role, setRole] = useState<"client" | "specialist" | null>(null);
  const { t } = useI18n();

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[var(--color-text-muted)]">{t("onboarding.step")} 1 {t("onboarding.stepOf")} 5</span>
          <button className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)]">{t("onboarding.skip")}</button>
        </div>
        <div className="h-1.5 bg-[var(--color-champagne)] rounded-full">
          <div className="h-full bg-[var(--color-gold)] rounded-full transition-all" style={{ width: "20%" }} />
        </div>
      </div>

      <div className="text-center mb-10">
        <h1
          className="text-[28px] font-semibold tracking-[-0.5px]"
          style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
        >
          {t("onboarding.role.title")}
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-2">
          {t("onboarding.role.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => setRole("client")}
          className={`flex flex-col items-center gap-4 p-8 rounded-[var(--radius-lg)] border-2 transition-all ${
            role === "client"
              ? "border-[var(--color-gold)] bg-white shadow-[var(--shadow-card)]"
              : "border-[var(--color-border)] bg-white hover:border-[var(--color-gold)] hover:shadow-sm"
          }`}
        >
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
            role === "client" ? "bg-[var(--color-gold)] text-[var(--color-green-dark)]" : "bg-[var(--color-champagne)] text-[var(--color-gold)]"
          }`}>
            <Search size={28} />
          </div>
          <div className="text-center">
            <h3 className="text-[15px] font-medium mb-1">{t("onboarding.role.client")}</h3>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              {t("onboarding.role.clientDesc")}
            </p>
          </div>
        </button>

        <button
          onClick={() => setRole("specialist")}
          className={`flex flex-col items-center gap-4 p-8 rounded-[var(--radius-lg)] border-2 transition-all ${
            role === "specialist"
              ? "border-[var(--color-gold)] bg-white shadow-[var(--shadow-card)]"
              : "border-[var(--color-border)] bg-white hover:border-[var(--color-gold)] hover:shadow-sm"
          }`}
        >
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
            role === "specialist" ? "bg-[var(--color-gold)] text-[var(--color-green-dark)]" : "bg-[var(--color-champagne)] text-[var(--color-gold)]"
          }`}>
            <Briefcase size={28} />
          </div>
          <div className="text-center">
            <h3 className="text-[15px] font-medium mb-1">{t("onboarding.role.specialist")}</h3>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              {t("onboarding.role.specialistDesc")}
            </p>
          </div>
        </button>
      </div>

      <Link href="/auth/onboarding/profile">
        <Button variant="primary" size="lg" className="w-full" disabled={!role}>
          {t("onboarding.continue")}
          <ArrowRight size={18} />
        </Button>
      </Link>
    </div>
  );
}
