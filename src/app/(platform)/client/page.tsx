"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { useI18n } from "@/lib/i18n";
import {
  ShoppingBag, Wallet, Heart, Star, ArrowRight, Search, Clock,
} from "lucide-react";
import Link from "next/link";

function formatAmount(value: number, locale: string) {
  const currency = locale === "ru" ? "₽" : "€";
  const formatted = value.toLocaleString("ru-RU");
  return `${formatted} ${currency}`;
}

const orders = [
  { id: "1", specialist: "Ana Novak", service: "Registracija d.o.o.", amount: 120, statusKey: "client.statusInProgress" as const, statusColor: "bg-[var(--color-gold-tint)] text-[#8A6A10]", date: "28.03.2026" },
  { id: "2", specialist: "Luka Krajnc", service: "Davčno svetovanje", amount: 90, statusKey: "client.statusCompleted" as const, statusColor: "bg-[var(--color-success-bg)] text-[var(--color-success)]", date: "22.03.2026" },
  { id: "3", specialist: "Maja Horvat", service: "Oblikovanje logotipa", amount: 200, statusKey: "client.statusReview" as const, statusColor: "bg-[var(--color-champagne)] text-[var(--color-text-muted)]", date: "15.03.2026" },
];

const recommended = [
  { name: "Nina Zupan", title: "Odvetnica", rating: 4.9, reviews: 38, price: 100, avatar: null },
  { name: "Rok Vidmar", title: "Računovodja", rating: 4.8, reviews: 25, price: 70, avatar: null },
  { name: "Eva Mlakar", title: "UX oblikovalka", rating: 5.0, reviews: 52, price: 130, avatar: null },
];

export default function ClientOverviewPage() {
  const { t, locale } = useI18n();

  const metrics = [
    { label: t("client.activeOrders"), value: "2", icon: ShoppingBag, color: "var(--color-green-mid)" },
    { label: t("client.totalSpent"), value: formatAmount(1840, locale), icon: Wallet, color: "var(--color-gold)" },
    { label: t("client.savedSpecs"), value: "7", icon: Heart, color: "var(--color-error)" },
    { label: t("client.reviewsLeft"), value: "5", icon: Star, color: "var(--color-gold)" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-[24px] font-semibold tracking-[-0.5px]"
          style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
        >
          {t("client.overview")}
        </h1>
        <div className="flex gap-2">
          <Link href="/catalog">
            <Button variant="outline" size="sm">
              <Search size={16} />
              {t("client.findSpecialist")}
            </Button>
          </Link>
          <Button variant="primary" size="sm">
            <ShoppingBag size={16} />
            {t("client.newOrder")}
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((m) => (
          <Card key={m.label} className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `color-mix(in srgb, ${m.color} 15%, transparent)` }}
            >
              <m.icon size={20} style={{ color: m.color }} />
            </div>
            <div>
              <div className="text-xl font-semibold">{m.value}</div>
              <div className="text-xs text-[var(--color-text-muted)]">{m.label}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Orders */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">{t("client.recentOrders")}</h2>
            <Button variant="ghost" size="sm" className="text-[var(--color-gold)]">
              {t("client.allOrders")} <ArrowRight size={14} />
            </Button>
          </div>
          <Card className="divide-y divide-[var(--color-border)] !p-0">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center gap-4 px-[18px] py-4">
                <Avatar name={order.specialist} size={36} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{order.service}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{order.specialist}</div>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                  <Clock size={12} />
                  {order.date}
                </div>
                <div className="text-sm font-medium whitespace-nowrap">{formatAmount(order.amount, locale)}</div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${order.statusColor}`}>
                  {t(order.statusKey)}
                </span>
              </div>
            ))}
          </Card>
        </div>

        {/* Recommended specialists */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">{t("client.recommended")}</h2>
            <Link href="/catalog">
              <Button variant="ghost" size="sm" className="text-[var(--color-gold)]">
                {t("client.viewAll")} <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
          <Card className="divide-y divide-[var(--color-border)] !p-0">
            {recommended.map((spec, i) => (
              <div key={i} className="flex items-center gap-3 px-[18px] py-4">
                <Avatar name={spec.name} size={40} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{spec.name}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{spec.title}</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Rating value={spec.rating} size={12} />
                    <span className="text-xs text-[var(--color-text-muted)]">({spec.reviews})</span>
                  </div>
                </div>
                <div className="text-sm font-medium text-[var(--color-gold)]">
                  {formatAmount(spec.price, locale)}
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
