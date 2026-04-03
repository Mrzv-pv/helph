"use client";

import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { shortName } from "@/lib/utils";
import Link from "next/link";

interface SpecialistCardProps {
  id: string;
  name: string;
  avatar?: string | null;
  title: string;
  rating: number;
  reviewsCount: number;
  priceFrom: number;
  category: string;
  verified?: boolean;
  online?: boolean;
  skills?: string[];
}

export function SpecialistCard({
  id, name, avatar, title, rating, reviewsCount, priceFrom, category, verified, online, skills = [],
}: SpecialistCardProps) {
  const { t, locale } = useI18n();
  const currency = locale === "ru" ? "\u20BD" : "\u20AC";

  return (
    <Link href={`/catalog/${id}`}>
      <Card hoverable className="group flex flex-col gap-4 h-full">
        <div className="flex items-start gap-4">
          <Avatar src={avatar} name={name} size={56} online={online} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-[15px] font-medium text-[var(--color-text)] truncate">{shortName(name)}</h3>
              {verified && <Badge variant="verified">{t("specialist.verified")}</Badge>}
            </div>
            <p className="text-sm text-[var(--color-text-muted)] mt-0.5">{title}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <Rating value={rating} size={14} showValue count={reviewsCount} />
            </div>
          </div>
        </div>

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="tag">{skill}</Badge>
            ))}
            {skills.length > 3 && (
              <span className="text-xs text-[var(--color-text-muted)] self-center">+{skills.length - 3}</span>
            )}
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
          <div>
            <span className="text-xs text-[var(--color-text-muted)]">{t("specialist.from")}</span>{" "}
            <span className="text-[15px] font-semibold text-[var(--color-text)]">
              {priceFrom.toLocaleString(locale === "de" ? "de-DE" : locale === "ru" ? "ru-RU" : "sl-SI")} {currency}
            </span>
          </div>
          <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
            {t("specialist.details")}
          </Button>
        </div>
      </Card>
    </Link>
  );
}
