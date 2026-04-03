"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useI18n } from "@/lib/i18n";
import { Filter, Clock } from "lucide-react";

function formatAmount(value: number, locale: string) {
  const currency = locale === "ru" ? "₽" : "€";
  return `${value.toLocaleString("ru-RU")} ${currency}`;
}

const orders = [
  { id: "ORD-101", service: "Registracija d.o.o.", specialist: "Ana Novak", amount: 120, statusKey: "client.statusInProgress" as const, statusColor: "bg-[var(--color-gold-tint)] text-[#8A6A10]", date: "28.03.2026" },
  { id: "ORD-102", service: "Davčno svetovanje", specialist: "Luka Krajnc", amount: 90, statusKey: "client.statusCompleted" as const, statusColor: "bg-[var(--color-success-bg)] text-[var(--color-success)]", date: "22.03.2026" },
  { id: "ORD-103", service: "Oblikovanje logotipa", specialist: "Maja Horvat", amount: 200, statusKey: "client.statusReview" as const, statusColor: "bg-[var(--color-champagne)] text-[var(--color-text-muted)]", date: "15.03.2026" },
  { id: "ORD-104", service: "Prevod dokumentov", specialist: "Eva Mlakar", amount: 60, statusKey: "client.statusCompleted" as const, statusColor: "bg-[var(--color-success-bg)] text-[var(--color-success)]", date: "10.03.2026" },
  { id: "ORD-105", service: "SEO optimizacija", specialist: "Rok Vidmar", amount: 150, statusKey: "client.statusPending" as const, statusColor: "bg-[var(--color-champagne)] text-[var(--color-text-muted)]", date: "05.03.2026" },
];

export default function ClientOrdersPage() {
  const { t, locale } = useI18n();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-[24px] font-semibold tracking-[-0.5px]"
          style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
        >
          {t("client.myOrders")}
        </h1>
        <Button variant="outline" size="sm">
          <Filter size={16} />
          Filter
        </Button>
      </div>

      <Card className="divide-y divide-[var(--color-border)] !p-0">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center gap-4 px-5 py-4 hover:bg-[var(--color-bg)] transition-colors cursor-pointer">
            <Avatar name={order.specialist} size={40} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{order.service}</span>
                <span className="text-xs text-[var(--color-text-muted)]">#{order.id}</span>
              </div>
              <div className="text-xs text-[var(--color-text-muted)] mt-0.5">{order.specialist}</div>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
              <Clock size={12} />
              {order.date}
            </div>
            <div className="text-sm font-semibold whitespace-nowrap">{formatAmount(order.amount, locale)}</div>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${order.statusColor}`}>
              {t(order.statusKey)}
            </span>
          </div>
        ))}
      </Card>
    </div>
  );
}
