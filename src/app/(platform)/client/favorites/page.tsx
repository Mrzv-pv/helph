"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { Heart, MessageCircle } from "lucide-react";

function formatAmount(value: number, locale: string) {
  const currency = locale === "ru" ? "₽" : "€";
  return `${value.toLocaleString("ru-RU")} ${currency}`;
}

const favorites = [
  { name: "Ana Novak", title: "Odvetnica za korporativno pravo", rating: 4.9, reviews: 47, price: 120, verified: true },
  { name: "Luka Krajnc", title: "Finančni svetovalec", rating: 4.8, reviews: 32, price: 90, verified: true },
  { name: "Maja Horvat", title: "UX/UI Oblikovalka", rating: 5.0, reviews: 61, price: 150, verified: true },
  { name: "Nina Zupan", title: "Davčna svetovalka", rating: 4.7, reviews: 28, price: 80, verified: false },
  { name: "Rok Vidmar", title: "SEO strokovnjak", rating: 4.6, reviews: 19, price: 100, verified: true },
  { name: "Eva Mlakar", title: "Prevajalka (EN/DE/SL)", rating: 4.9, reviews: 55, price: 60, verified: true },
  { name: "Tomaž Kos", title: "Računovodja", rating: 4.8, reviews: 41, price: 70, verified: false },
];

export default function ClientFavoritesPage() {
  const { t, locale } = useI18n();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-[24px] font-semibold tracking-[-0.5px]"
          style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
        >
          {t("client.favorites")} <span className="text-[var(--color-text-muted)] text-lg font-normal">({favorites.length})</span>
        </h1>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((spec, i) => (
          <Card key={i} hoverable className="flex flex-col">
            <div className="flex items-start gap-3 mb-3">
              <Avatar name={spec.name} size={48} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold truncate">{spec.name}</span>
                  {spec.verified && <Badge variant="verified">Verified</Badge>}
                </div>
                <p className="text-xs text-[var(--color-text-muted)] truncate">{spec.title}</p>
              </div>
              <button className="p-1 text-[var(--color-error)] hover:bg-red-50 rounded transition-colors shrink-0">
                <Heart size={18} fill="currentColor" />
              </button>
            </div>
            <div className="flex items-center gap-1 mb-3">
              <Rating value={spec.rating} size={14} />
              <span className="text-xs text-[var(--color-text-muted)] ml-1">{spec.rating} ({spec.reviews})</span>
            </div>
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--color-border)]">
              <span className="text-sm font-semibold text-[var(--color-gold)]">od {formatAmount(spec.price, locale)}</span>
              <Button variant="outline" size="sm">
                <MessageCircle size={14} />
                {t("client.messages")}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
