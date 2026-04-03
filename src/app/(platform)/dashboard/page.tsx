"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { shortName, formatAmount } from "@/lib/utils";
import {
  ShoppingBag, TrendingUp, Star, Eye, ArrowRight, Plus, UserPen,
} from "lucide-react";

const orders = [
  { id: "ORD-001", title: "Registracija d.o.o.", client: "Олег Тарасов", confirmed: true, amount: 350, statusKey: "dash.statusInProgress" as const, statusColor: "bg-[var(--color-gold-tint)] text-[#8A6A10]" },
  { id: "ORD-002", title: "Sestavitev pogodbe", client: "Светлана Морозова", confirmed: true, amount: 120, statusKey: "dash.statusNew" as const, statusColor: "bg-[var(--color-success-bg)] text-[var(--color-success)]" },
  { id: "ORD-003", title: "Pravno svetovanje", client: "Андрей Белов", confirmed: false, amount: 80, statusKey: "dash.statusCompleted" as const, statusColor: "bg-[var(--color-champagne)] text-[var(--color-text-muted)]" },
];

const messages = [
  { name: "Олег Тарасов", text: "Добрый день! Когда будут готовы документы?", time: "14:23", unread: true },
  { name: "Светлана Морозова", text: "Спасибо за быстрый ответ!", time: "12:05", unread: false },
  { name: "Андрей Белов", text: "Оставил отзыв, посмотрите", time: "вчера", unread: false },
];

export default function DashboardOverviewPage() {
  const { t, locale } = useI18n();

  const metrics = [
    { label: t("dash.activeOrders"), value: "3", icon: ShoppingBag, color: "var(--color-green-mid)" },
    { label: t("dash.monthlyIncome"), value: formatAmount(45200, locale), icon: TrendingUp, color: "var(--color-gold)" },
    { label: t("catalog.rating"), value: "4.9", icon: Star, color: "var(--color-gold)" },
    { label: t("dash.profileViews"), value: "128", icon: Eye, color: "var(--color-sage)" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-[24px] font-semibold tracking-[-0.5px]"
          style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
        >
          {t("dash.overview")}
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <UserPen size={16} />
            {t("dash.updateProfile")}
          </Button>
          <Button variant="primary" size="sm">
            <Plus size={16} />
            {t("dash.addService")}
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
            <h2 className="text-lg font-medium">{t("dash.recentOrders")}</h2>
            <Button variant="ghost" size="sm" className="text-[var(--color-gold)]">
              {t("dash.allOrders")} <ArrowRight size={14} />
            </Button>
          </div>
          <Card className="divide-y divide-[var(--color-border)] !p-0">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center gap-4 px-[18px] py-4">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{order.title}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{order.confirmed ? order.client : shortName(order.client)}</div>
                </div>
                <div className="text-sm font-medium whitespace-nowrap">{formatAmount(order.amount, locale)}</div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${order.statusColor}`}>
                  {t(order.statusKey)}
                </span>
              </div>
            ))}
          </Card>
        </div>

        {/* Messages */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">{t("dash.messages")}</h2>
            <Button variant="ghost" size="sm" className="text-[var(--color-gold)]">
              {t("dash.all")} <ArrowRight size={14} />
            </Button>
          </div>
          <Card className="divide-y divide-[var(--color-border)] !p-0">
            {messages.map((msg, i) => (
              <div key={i} className="flex items-start gap-3 px-[18px] py-4">
                <Avatar name={msg.name} size={36} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${msg.unread ? "font-medium" : ""}`}>{msg.name}</span>
                    <span className="text-xs text-[var(--color-text-muted)]">{msg.time}</span>
                  </div>
                  <p className={`text-xs truncate mt-0.5 ${msg.unread ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)]"}`}>
                    {msg.text}
                  </p>
                </div>
                {msg.unread && <span className="w-2 h-2 rounded-full bg-[var(--color-gold)] mt-2 shrink-0" />}
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
