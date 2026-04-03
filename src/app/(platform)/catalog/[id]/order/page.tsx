"use client";

import { use, useState, useEffect, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { shortName } from "@/lib/utils";
import { getServiceForOrder, createOrder } from "@/lib/actions/orders";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import {
  ArrowLeft, Clock, Calendar, Shield, CheckCircle, Loader2,
} from "lucide-react";
import Link from "next/link";

interface ServiceData {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  price: number;
  priceType: string;
  deliveryDays: number;
  performerUserId: string;
  specialistName: string;
  specialistTitle: Record<string, string>;
  specialistRating: number;
  specialistVerified: boolean;
}

export default function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service");
  const { t, locale } = useI18n();

  const [service, setService] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const currency = locale === "ru" ? "₽" : "€";

  useEffect(() => {
    if (!serviceId) return;
    getServiceForOrder(serviceId).then((data) => {
      setService(data);
      setLoading(false);
    });
  }, [serviceId]);

  const platformFee = service ? Math.round(service.price * 0.1) : 0;
  const total = service ? service.price + platformFee : 0;

  function formatPrice(cents: number) {
    return (cents / 100).toLocaleString(locale === "ru" ? "ru-RU" : "sl-SI", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }

  function handleSubmit() {
    if (!service) return;
    setError("");
    startTransition(async () => {
      const result = await createOrder({
        serviceId: service.id,
        performerId: service.performerUserId,
        description,
        amount: total,
      });
      if (result.success) {
        setOrderNumber(result.orderNumber!);
        setSubmitted(true);
      } else {
        setError(result.error || "Error");
      }
    });
  }

  // Loading state
  if (loading) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16 flex justify-center">
        <Loader2 size={32} className="animate-spin text-[var(--color-text-muted)]" />
      </div>
    );
  }

  // No service found
  if (!service) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16 text-center">
        <p className="text-[var(--color-text-muted)]">Service not found</p>
        <Link href={`/catalog/${id}`}>
          <Button variant="outline" className="mt-4">
            <ArrowLeft size={16} />
            {t("order.back")}
          </Button>
        </Link>
      </div>
    );
  }

  // Success state
  if (submitted) {
    return (
      <div className="max-w-[560px] mx-auto px-6 py-16">
        <Card className="text-center py-10 px-8">
          <div className="w-16 h-16 rounded-full bg-[var(--color-green-mid)]/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-[var(--color-green-mid)]" />
          </div>
          <h1
            className="text-[24px] font-semibold mb-2 tracking-[-0.5px]"
            style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
          >
            {t("order.success")}
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mb-2">
            {t("order.successDesc")}
          </p>
          <p className="text-lg font-semibold text-[var(--color-gold)] mb-6">
            #{orderNumber}
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/client/orders">
              <Button variant="primary" size="lg" className="w-full">
                {t("order.goToOrders")}
              </Button>
            </Link>
            <Link href={`/catalog/${id}`}>
              <Button variant="outline" size="md" className="w-full">
                <ArrowLeft size={16} />
                {t("order.back")}
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  // Order form
  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-6">
        <Link href="/catalog" className="hover:text-[var(--color-text)]">{t("nav.specialists")}</Link>
        <span>/</span>
        <Link href={`/catalog/${id}`} className="hover:text-[var(--color-text)]">
          {shortName(service.specialistName)}
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">{t("order.title")}</span>
      </nav>

      <h1
        className="text-[28px] font-semibold mb-8 tracking-[-0.5px]"
        style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
      >
        {t("order.title")}
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: form */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Service info */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                {t("order.service")}
              </span>
              <Badge variant="tag">
                {service.priceType === "FIXED" ? t("order.fixed") : t("order.hourly")}
              </Badge>
            </div>
            <h2 className="text-[18px] font-medium mb-2">
              {service.title[locale] || service.title.sl}
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
              {service.description[locale] || service.description.sl}
            </p>
            <div className="flex items-center gap-6 pt-3 border-t border-[var(--color-border)]">
              <div className="flex items-center gap-1.5 text-sm">
                <span className="text-lg font-semibold">{formatPrice(service.price)} {currency}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
                <Calendar size={14} />
                {service.deliveryDays} {t("order.days")}
              </div>
            </div>
          </Card>

          {/* Specialist */}
          <Card>
            <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
              {t("order.specialist")}
            </span>
            <div className="flex items-center gap-3 mt-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-green-dark)] flex items-center justify-center text-sm font-medium text-[#F5F0E8]">
                {service.specialistName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{shortName(service.specialistName)}</span>
                  {service.specialistVerified && <Badge variant="verified">✓</Badge>}
                </div>
                <span className="text-xs text-[var(--color-text-muted)]">
                  {service.specialistTitle[locale] || service.specialistTitle.sl}
                </span>
              </div>
              <div className="ml-auto">
                <Rating value={service.specialistRating} showValue size={14} />
              </div>
            </div>
          </Card>

          {/* Task description */}
          <Card>
            <label className="block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
              {t("order.description")}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("order.descriptionHint")}
              rows={5}
              className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:border-[var(--color-gold)] transition-colors"
            />
          </Card>
        </div>

        {/* Right: summary sidebar */}
        <aside className="lg:w-[340px] shrink-0">
          <div className="lg:sticky lg:top-[88px] space-y-4">
            <Card>
              <h3
                className="text-[16px] font-semibold mb-4"
                style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
              >
                {t("order.summary")}
              </h3>

              <div className="space-y-3 pb-4 border-b border-[var(--color-border)]">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-muted)]">{t("order.subtotal")}</span>
                  <span className="font-medium">{formatPrice(service.price)} {currency}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-muted)]">{t("order.escrowFee")} (10%)</span>
                  <span className="font-medium">{formatPrice(platformFee)} {currency}</span>
                </div>
              </div>

              <div className="flex justify-between pt-4 mb-6">
                <span className="font-semibold">{t("order.total")}</span>
                <span className="text-lg font-semibold text-[var(--color-green-dark)]">
                  {formatPrice(total)} {currency}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] mb-4">
                <Clock size={14} />
                {t("order.delivery")}: {service.deliveryDays} {t("order.days")}
              </div>

              {error && (
                <p className="text-sm text-red-500 mb-3">{error}</p>
              )}

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleSubmit}
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Shield size={18} />
                )}
                {t("order.confirm")}
              </Button>
            </Card>

            <Card className="text-center text-xs text-[var(--color-text-muted)] leading-relaxed">
              <Shield size={18} className="mx-auto mb-2 text-[var(--color-green-mid)]" />
              {t("order.escrowInfo")}
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}
