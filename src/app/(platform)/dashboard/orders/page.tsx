"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { useI18n } from "@/lib/i18n";
import { shortName, formatAmount } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

type OrderStatus = "new" | "inProgress" | "awaiting" | "completed" | "onHold" | "cancelled";

interface Order {
  id: string;
  title: string;
  client: string;
  clientConfirmed: boolean;
  amount: number;
  status: OrderStatus;
  date: string;
}

const statusConfig: Record<OrderStatus, { key: string; color: string }> = {
  new: { key: "dash.statusNew", color: "bg-[var(--color-success-bg)] text-[var(--color-success)]" },
  inProgress: { key: "dash.statusInProgress", color: "bg-[var(--color-gold-tint)] text-[#8A6A10]" },
  awaiting: { key: "dash.statusAwaiting", color: "bg-blue-50 text-blue-600" },
  completed: { key: "dash.statusCompleted", color: "bg-[var(--color-champagne)] text-[var(--color-text-muted)]" },
  onHold: { key: "dash.statusOnHold", color: "bg-gray-100 text-gray-500" },
  cancelled: { key: "dash.statusCancelled", color: "bg-red-50 text-[var(--color-error)]" },
};

const allOrders: Order[] = [
  { id: "ORD-001", title: "Registracija d.o.o.", client: "Олег Тарасов", clientConfirmed: true, amount: 350, status: "inProgress", date: "28.03.2026" },
  { id: "ORD-002", title: "Sestavitev najemne pogodbe", client: "Светлана Морозова", clientConfirmed: true, amount: 120, status: "new", date: "25.03.2026" },
  { id: "ORD-003", title: "Pravno svetovanje", client: "Андрей Белов", clientConfirmed: true, amount: 80, status: "completed", date: "20.03.2026" },
  { id: "ORD-004", title: "Davčna optimizacija", client: "Марина Козлова", clientConfirmed: false, amount: 200, status: "awaiting", date: "15.03.2026" },
  { id: "ORD-005", title: "Registracija blagovne znamke", client: "Дмитрий Волков", clientConfirmed: true, amount: 1200, status: "inProgress", date: "10.03.2026" },
  { id: "ORD-006", title: "Skrbni pregled", client: "Наталья Соколова", clientConfirmed: false, amount: 350, status: "cancelled", date: "05.03.2026" },
];

const tabs: { status: OrderStatus | "all"; key: string }[] = [
  { status: "all", key: "dash.allStatuses" },
  { status: "inProgress", key: "dash.statusInProgress" },
  { status: "new", key: "dash.statusNew" },
  { status: "awaiting", key: "dash.statusAwaiting" },
  { status: "completed", key: "dash.statusCompleted" },
];

export default function SpecialistOrdersPage() {
  const { t, locale } = useI18n();
  const [activeTab, setActiveTab] = useState<OrderStatus | "all">("all");

  const filtered = activeTab === "all" ? allOrders : allOrders.filter((o) => o.status === activeTab);

  const countByStatus = (s: OrderStatus) => allOrders.filter((o) => o.status === s).length;

  return (
    <div>
      <h1
        className="text-[24px] font-semibold tracking-[-0.5px] mb-6"
        style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
      >
        {t("dash.orders")}
      </h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const count = tab.status === "all" ? allOrders.length : countByStatus(tab.status);
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

      {/* Orders list */}
      <Card className="divide-y divide-[var(--color-border)] !p-0">
        {filtered.map((order) => {
          const cfg = statusConfig[order.status];
          const displayName = order.clientConfirmed ? order.client : shortName(order.client);
          return (
            <div key={order.id} className="flex items-center gap-4 px-5 py-4 hover:bg-[var(--color-bg)] transition-colors cursor-pointer">
              <Avatar name={order.client} size={40} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{order.title}</span>
                  <span className="text-xs text-[var(--color-text-muted)]">#{order.id}</span>
                </div>
                <div className="text-xs text-[var(--color-text-muted)] mt-0.5">{displayName}</div>
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
