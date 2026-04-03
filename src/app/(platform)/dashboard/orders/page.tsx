"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useI18n } from "@/lib/i18n";
import { Filter, Clock, CheckCircle, AlertCircle } from "lucide-react";

function formatAmount(value: number, locale: string) {
  const currency = locale === "ru" ? "₽" : "€";
  return `${value.toLocaleString("ru-RU")} ${currency}`;
}

const allOrders = [
  { id: "ORD-001", title: "Registracija d.o.o.", client: "Олег Тарасов", amount: 15000, statusKey: "dash.statusInProgress" as const, statusColor: "bg-[var(--color-gold-tint)] text-[#8A6A10]", icon: Clock, date: "28.03.2026" },
  { id: "ORD-002", title: "Sestavitev najemne pogodbe", client: "Светлана Морозова", amount: 5000, statusKey: "dash.statusNew" as const, statusColor: "bg-[var(--color-success-bg)] text-[var(--color-success)]", icon: AlertCircle, date: "25.03.2026" },
  { id: "ORD-003", title: "Pravno svetovanje", client: "Андрей Белов", amount: 3000, statusKey: "dash.statusCompleted" as const, statusColor: "bg-[var(--color-champagne)] text-[var(--color-text-muted)]", icon: CheckCircle, date: "20.03.2026" },
  { id: "ORD-004", title: "Davčna optimizacija", client: "Марина Козлова", amount: 8000, statusKey: "dash.statusCompleted" as const, statusColor: "bg-[var(--color-champagne)] text-[var(--color-text-muted)]", icon: CheckCircle, date: "15.03.2026" },
  { id: "ORD-005", title: "Registracija blagovne znamke", client: "Дмитрий Волков", amount: 12000, statusKey: "dash.statusInProgress" as const, statusColor: "bg-[var(--color-gold-tint)] text-[#8A6A10]", icon: Clock, date: "10.03.2026" },
];

export default function SpecialistOrdersPage() {
  const { t, locale } = useI18n();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-[24px] font-semibold tracking-[-0.5px]"
          style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
        >
          {t("dash.orders")}
        </h1>
        <Button variant="outline" size="sm">
          <Filter size={16} />
          Filter
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="text-center">
          <div className="text-2xl font-semibold text-[var(--color-gold)]">2</div>
          <div className="text-xs text-[var(--color-text-muted)] mt-1">{t("dash.statusInProgress")}</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-semibold text-[var(--color-success)]">1</div>
          <div className="text-xs text-[var(--color-text-muted)] mt-1">{t("dash.statusNew")}</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-semibold text-[var(--color-text-muted)]">2</div>
          <div className="text-xs text-[var(--color-text-muted)] mt-1">{t("dash.statusCompleted")}</div>
        </Card>
      </div>

      {/* Orders list */}
      <Card className="divide-y divide-[var(--color-border)] !p-0">
        {allOrders.map((order) => (
          <div key={order.id} className="flex items-center gap-4 px-5 py-4 hover:bg-[var(--color-bg)] transition-colors cursor-pointer">
            <Avatar name={order.client} size={40} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{order.title}</span>
                <span className="text-xs text-[var(--color-text-muted)]">#{order.id}</span>
              </div>
              <div className="text-xs text-[var(--color-text-muted)] mt-0.5">{order.client}</div>
            </div>
            <div className="hidden sm:block text-xs text-[var(--color-text-muted)]">{order.date}</div>
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
