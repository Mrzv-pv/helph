"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function OnboardingWelcomePage() {
  const { t } = useI18n();

  return (
    <div className="bg-[var(--color-green-dark)] rounded-2xl p-12 text-center">
      {/* Progress bar */}
      <div className="mb-10">
        <div className="h-1.5 bg-[var(--color-green-forest)] rounded-full">
          <div className="h-full bg-[var(--color-gold)] rounded-full" style={{ width: "100%" }} />
        </div>
      </div>

      <div className="w-16 h-16 rounded-full bg-[var(--color-green-mid)] flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={32} className="text-[#F5F0E8]" />
      </div>

      <h1
        className="text-[32px] font-semibold text-[var(--color-gold)] tracking-[-0.5px] mb-3"
        style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
      >
        {t("onboarding.welcome.title")}
      </h1>
      <p className="text-base text-[var(--color-sage)] mb-10 max-w-sm mx-auto">
        {t("onboarding.welcome.subtitle")}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/catalog">
          <Button variant="primary" size="lg">
            {t("onboarding.welcome.findSpecialist")}
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline" size="lg" className="border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-green-forest)]">
            {t("onboarding.welcome.openProfile")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
