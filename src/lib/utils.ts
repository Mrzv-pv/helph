export function cn(...classes: unknown[]) {
  return classes.filter((c) => typeof c === "string" && c.length > 0).join(" ");
}

/** Full name → "Ana N." for catalog/public contexts */
export function shortName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length < 2) return fullName;
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
}

/** Format currency based on locale */
export function formatAmount(value: number, locale: string): string {
  const currency = locale === "ru" ? "₽" : "€";
  const formatted = value.toLocaleString("ru-RU");
  return `${formatted} ${currency}`;
}
