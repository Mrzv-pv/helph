"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SpecialistCard } from "@/components/features/specialist-card";
import { getSpecialists, categories } from "@/lib/mock-data";
import { useI18n } from "@/lib/i18n";
import { Search, SlidersHorizontal, X } from "lucide-react";

export default function CatalogPage() {
  const { t, locale } = useI18n();
  const specialists = getSpecialists(locale);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"rating" | "price" | "new">("rating");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = specialists
    .filter((s) => {
      if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedCategory && s.category !== selectedCategory) return false;
      if (verifiedOnly && !s.verified) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price") return a.priceFrom - b.priceFrom;
      return 0;
    });

  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-6">
        <a href="/" className="hover:text-[var(--color-text)]">{t("catalog.home")}</a>
        <span>/</span>
        <span className="text-[var(--color-text)]">{t("catalog.title")}</span>
      </nav>

      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-[32px] font-semibold tracking-[-0.5px]"
            style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
          >
            {t("catalog.title")}
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">{filtered.length} {t("catalog.found")}</p>
        </div>

        {/* Sort tabs */}
        <div className="hidden md:flex bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] p-1">
          {(["rating", "price", "new"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                sortBy === s ? "bg-[var(--color-green-dark)] text-[#F5F0E8]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              {s === "rating" ? t("catalog.sortRating") : s === "price" ? t("catalog.sortPrice") : t("catalog.sortNew")}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar filters */}
        <aside className={`${showFilters ? "fixed inset-0 z-50 bg-white p-6 overflow-y-auto" : "hidden"} lg:block lg:static lg:bg-transparent lg:p-0 lg:z-auto w-full lg:w-[240px] shrink-0`}>
          <div className="flex items-center justify-between lg:hidden mb-6">
            <h2 className="text-lg font-medium">{t("catalog.filters")}</h2>
            <button onClick={() => setShowFilters(false)}><X size={24} /></button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <Input
              placeholder={t("catalog.searchPlaceholder")}
              icon={<Search size={18} />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">{t("catalog.categories")}</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat.slug} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategory === cat.nameKey}
                    onChange={() => setSelectedCategory(selectedCategory === cat.nameKey ? null : cat.nameKey)}
                    className="w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-green-mid)] focus:ring-[var(--color-gold)]"
                  />
                  <span className="text-sm text-[var(--color-text-secondary)]">{t(cat.nameKey)}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">{t("catalog.rating")}</h3>
            <div className="space-y-2">
              {[4, 3].map((r) => (
                <label key={r} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="rating" className="w-4 h-4 border-[var(--color-border)] text-[var(--color-green-mid)] focus:ring-[var(--color-gold)]" />
                  <span className="text-sm">{t("catalog.ratingFrom")} {r}★ {t("catalog.andAbove")}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Verified toggle */}
          <div className="mb-6">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-medium">{t("catalog.verifiedOnly")}</span>
              <button
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`w-10 h-6 rounded-full transition-colors relative ${
                  verifiedOnly ? "bg-[var(--color-gold)]" : "bg-[var(--color-border)]"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    verifiedOnly ? "left-5" : "left-1"
                  }`}
                />
              </button>
            </label>
          </div>

          {/* Reset */}
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={() => {
              setSearch("");
              setSelectedCategory(null);
              setVerifiedOnly(false);
            }}
          >
            {t("catalog.resetFilters")}
          </Button>
        </aside>

        {/* Mobile filter button */}
        <button
          onClick={() => setShowFilters(true)}
          className="lg:hidden fixed bottom-6 right-6 z-40 bg-[var(--color-green-dark)] text-[#F5F0E8] p-4 rounded-full shadow-lg"
        >
          <SlidersHorizontal size={20} />
        </button>

        {/* Card grid */}
        <div className="flex-1">
          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((s) => (
                <SpecialistCard key={s.id} {...s} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Search size={48} className="mx-auto mb-4 text-[var(--color-text-muted)]" />
              <h3 className="text-lg font-medium mb-2">{t("catalog.nothingFound")}</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">
                {t("catalog.tryOtherQuery")}
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory(null);
                  setVerifiedOnly(false);
                }}
              >
                {t("catalog.resetFilters")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
