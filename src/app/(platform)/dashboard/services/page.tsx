"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { Plus, Edit, Eye, Star } from "lucide-react";

function formatAmount(value: number, locale: string) {
  const currency = locale === "ru" ? "₽" : "€";
  return `${value.toLocaleString("ru-RU")} ${currency}`;
}

const services = [
  { id: "1", name: "Registracija d.o.o.", category: "Pravo", price: 120, orders: 47, rating: 4.9, active: true },
  { id: "2", name: "Sestavitev pogodbe", category: "Pravo", price: 80, orders: 32, rating: 4.8, active: true },
  { id: "3", name: "Pravno svetovanje (1 ura)", category: "Pravo", price: 50, orders: 61, rating: 4.9, active: true },
  { id: "4", name: "Davčna optimizacija", category: "Finance", price: 200, orders: 15, rating: 5.0, active: false },
];

export default function SpecialistServicesPage() {
  const { t, locale } = useI18n();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-[24px] font-semibold tracking-[-0.5px]"
          style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
        >
          {t("dash.myServices")}
        </h1>
        <Button variant="primary" size="sm">
          <Plus size={16} />
          {t("dash.addService")}
        </Button>
      </div>

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id} className="flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-[15px] font-medium">{service.name}</h3>
                {service.active ? (
                  <Badge variant="online">Active</Badge>
                ) : (
                  <Badge variant="status">Paused</Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                <span>{service.category}</span>
                <span className="flex items-center gap-1">
                  <Eye size={12} /> {service.orders} {t("dash.orders").toLowerCase()}
                </span>
                <span className="flex items-center gap-1">
                  <Star size={12} className="text-[var(--color-gold)]" /> {service.rating}
                </span>
              </div>
            </div>
            <div className="text-lg font-semibold text-[var(--color-gold)]">
              {formatAmount(service.price, locale)}
            </div>
            <Button variant="outline" size="sm">
              <Edit size={14} />
              {t("dash.editService")}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
