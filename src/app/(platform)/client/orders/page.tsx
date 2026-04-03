"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { useI18n } from "@/lib/i18n";
import { formatAmount, cn } from "@/lib/utils";
import { Clock } from "lucide-react";

type OrderStatus = "new" | "inProgress" | "awaiting" | "completed" | "review" | "cancelled";

interface Order {
  id: string;
  service: string;
  specialist: string;
  amount: number;
  status: OrderStatus;
  date: string;
}

const statusConfig: Record<OrderStatus, { key: string; color: string }> = {
  new: { key: "dash.statusNew", color: "bg-[var(--color-success-bg)] text-[var(--color-success)]" },
  inProgress: { key: "client.statusInProgress", color: "bg-[var(--color-gold-tint)] text-[#8A6A10]" },
  awaiting: { key: "dash.statusAwaiting", color: "bg-blue-50 text-blue-600" },
  completed: { key: "client.statusCompleted", color: "bg-[var(--color-success-bg)] text-[var(--color-success)]" },
  review: { key: "client.statusReview", color: "bg-[var(--color-champagne)] text-[var(--color-text-muted)]" },
  cancelled: { key: "dash.statusCancelled", color: "bg-red-50 text-[var(--color-error)]" },
};

const orders: Order[] = [
  { id: "ORD-101", service: "Registracija d.o.o.", specialist: "Ana Novak", amount: 350, status: "inProgress", date: "28.03.2026" },
  { id: "ORD-102", service: "Davčno svetovanje", specialist: "Luka Krajnc", amount: 90, status: "completed", date: "22.03.2026" },
  { id: "ORD-103", service: "Oblikovanje logotipa", specialist: "Maja Horvat", amount: 150, status: "review", date: "15.03.2026" },
  { id: "ORD-104", service: "Prevod dokumentov", specialist: "Eva Mlakar", amount: 60, status: "completed", date: "10.03.2026" },
  { id: "ORD-105", service: "SEO optimizacija", specialist: "Rok Vidmar", amount: 200, status: "awaiting", date: "05.03.2026" },
  { id: "ORD-106", service: "Pravno svetovanje", specialist: "Ana Novak", amount: 80, status: "cancelled", date: "01.03.2026" },
];

const tabs: { status: OrderStatus | "all"; key: string }[] = [
  { status: "all", key: "dash.allStatuses" },
  { status: "inProgress", key: "client.statusInProgress" },
  { status: "awaiting", key: "dash.statusAwaiting" },
  { status: "review", key: "client.statusReview" },
  { status: "completed", key: "client.statusCompleted" },
];

export default function ClientOrdersPage() {
  const { t, locale } = useI18n();
  const [activeTab, setActiveTab] = useState<OrderStatus | "all">("all");

  const filtered = activeTab === "all" ? orders : orders.filter((o) => o.status === activeTab);
  const countByStatus = (s: OrderStatus) => orders.filter((o) => o.status === s).length;

  return (
    <div>
      <h1
        className="text-[24px] font-semibold tracking-[-0.5px] mb-6"
        style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
      >
        {t("client.myOrders")}
      </h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const count = tab.status === "all" ? orders.length : countByStatus(tab.status);
          const isActive = activeTab === tab.status;
          return (
            <button
              key={tab.status}
              onClick={() => setActiveTab(tab.status)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                isActive
                  ? "bg-[var(--color-green-dark)] text-[#F5F0E8]"
                  : "bg-[var(--color-champagne)] text-[var(--color-text-muted)] hover:bg-[var(--color-gold-tint)]"
              )}
            >
              {t(tab.key as Parameters<typeof t>[0])} ({count})
            </button>
          );
        })}
      </div>

      <Card className="divide-y divide-[var(--color-border)] !p-0">
        {filtered.map((order) => {
          const cfg = statusConfig[order.status];
          return (
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
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${cfg.color}`}>
                {t(cfg.key as Parameters<typeof t>[0])}
              </span>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="px-5 py-8 text-center text-sm text-[var(--color-text-muted)]">—</div>
        )}
      </Card>
    </div>
  );
}
