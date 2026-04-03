import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type BadgeVariant = "verified" | "online" | "status" | "tag";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  verified:
    "bg-[var(--color-champagne)] text-[#8A6A10] text-[11px] font-semibold px-[10px] py-[3px]",
  online: "bg-[var(--color-success-bg)] text-[var(--color-success)] text-xs px-2 py-0.5",
  status: "text-xs font-medium px-2.5 py-1",
  tag: "bg-[var(--color-champagne)] text-[#8A6A10] text-xs px-3 py-1",
};

export function Badge({ variant = "tag", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-[var(--radius-full)]",
        variantStyles[variant],
        className,
      )}
    >
      {variant === "verified" && <Check size={12} strokeWidth={2.5} />}
      {variant === "online" && (
        <span className="w-2 h-2 rounded-full bg-[var(--color-green-mid)]" />
      )}
      {children}
    </span>
  );
}
