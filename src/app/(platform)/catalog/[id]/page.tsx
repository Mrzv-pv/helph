"use client";

import { use, useState } from "react";
import { getSpecialists, getServices, getReviews } from "@/lib/mock-data";
import { useI18n } from "@/lib/i18n";
import { shortName } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Clock, MapPin, MessageCircle, Calendar, ArrowLeft, CheckCircle, Briefcase, Shield,
} from "lucide-react";
import Link from "next/link";

export default function SpecialistProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { t, locale } = useI18n();

  const specialists = getSpecialists(locale);
  const services = getServices(locale);
  const reviews = getReviews(locale);

  const specialist = specialists.find((s) => s.id === id) || specialists[0];
  const [activeTab, setActiveTab] = useState<"services" | "reviews">("services");

  const currency = locale === "ru" ? "\u20BD" : "\u20AC";
  const dateLocale = locale === "ru" ? "ru-RU" : locale === "de" ? "de-DE" : locale === "sl" ? "sl-SI" : "en-US";

  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-6">
        <Link href="/" className="hover:text-[var(--color-text)]">{t("catalog.home")}</Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-[var(--color-text)]">{t("nav.specialists")}</Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">{specialist.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Profile header */}
          <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6 mb-6">
            <div className="flex items-start gap-5">
              <Avatar name={specialist.name} size={96} online={specialist.online} />
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1
                    className="text-[24px] font-semibold tracking-[-0.5px]"
                    style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
                  >
                    {specialist.name}
                  </h1>
                  {specialist.verified && <Badge variant="verified">{t("specialist.verified")}</Badge>}
                  {specialist.online && <Badge variant="online">{t("specialist.online")}</Badge>}
                </div>
                <p className="text-[15px] text-[var(--color-text-muted)] mt-1">{specialist.title}</p>
                <div className="flex items-center gap-4 mt-3">
                  <Rating value={specialist.rating} showValue count={specialist.reviewsCount} />
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mt-4 leading-relaxed max-w-2xl">
                  {specialist.bio}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {specialist.skills.map((skill) => (
                    <Badge key={skill} variant="tag">{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] p-1 mb-6 w-fit">
            <button
              onClick={() => setActiveTab("services")}
              className={`px-5 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "services" ? "bg-[var(--color-green-dark)] text-[#F5F0E8]" : "text-[var(--color-text-muted)]"
              }`}
            >
              {t("specialist.services")} ({services.length})
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-5 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "reviews" ? "bg-[var(--color-green-dark)] text-[#F5F0E8]" : "text-[var(--color-text-muted)]"
              }`}
            >
              {t("specialist.reviews")} ({reviews.length})
            </button>
          </div>

          {/* Services tab */}
          {activeTab === "services" && (
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service) => (
                <Card key={service.id} hoverable className="flex flex-col">
                  <h3 className="text-[15px] font-medium mb-2">{service.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4 flex-1">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border)]">
                    <div>
                      <span className="text-lg font-semibold text-[var(--color-text)]">
                        {service.price.toLocaleString(dateLocale)} {currency}
                      </span>
                      {service.priceType === "hourly" && (
                        <span className="text-xs text-[var(--color-text-muted)]"> / {t("specialist.perHour")}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                      <Calendar size={14} />
                      {service.deliveryDays} {t("specialist.days")}
                    </div>
                  </div>
                  <Link href="#">
                    <Button variant="primary" size="sm" className="w-full mt-3">
                      {t("specialist.order")}
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          )}

          {/* Reviews tab */}
          {activeTab === "reviews" && (
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <div className="flex items-start gap-4">
                    <Avatar name={review.reviewerName} size={40} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium">{shortName(review.reviewerName)}</span>
                          <span className="text-xs text-[var(--color-text-muted)] ml-2">
                            {new Date(review.date).toLocaleDateString(dateLocale, { day: "numeric", month: "long", year: "numeric" })}
                          </span>
                        </div>
                        <Rating value={review.rating} size={14} />
                      </div>
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{review.serviceName}</p>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-2 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Sticky sidebar */}
        <aside className="lg:w-[300px] shrink-0">
          <div className="lg:sticky lg:top-[88px] space-y-4">
            <Card className="space-y-4">
              <Button variant="primary" size="lg" className="w-full">
                <MessageCircle size={18} />
                {t("specialist.contact")}
              </Button>
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-text-muted)]">{t("specialist.priceFrom")}</span>
                  <span className="font-medium">{specialist.priceFrom.toLocaleString(dateLocale)} {currency}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-text-muted)]">{t("specialist.responseTime")}</span>
                  <span className="font-medium flex items-center gap-1">
                    <Clock size={14} className="text-[var(--color-text-muted)]" />
                    ~{specialist.responseTime} {t("specialist.hours")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-text-muted)]">{t("specialist.completedOrders")}</span>
                  <span className="font-medium flex items-center gap-1">
                    <Briefcase size={14} className="text-[var(--color-text-muted)]" />
                    {specialist.ordersCount}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-text-muted)]">{t("specialist.status")}</span>
                  <span className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${specialist.online ? "bg-[var(--color-green-mid)]" : "bg-[var(--color-border)]"}`} />
                    <span className="text-sm">{specialist.online ? t("specialist.online") : t("specialist.offline")}</span>
                  </span>
                </div>
              </div>
            </Card>

            <Card className="text-center text-sm text-[var(--color-text-muted)]">
              <Shield size={20} className="mx-auto mb-2 text-[var(--color-green-mid)]" />
              {t("specialist.escrow")}
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}
