import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  size?: number;
  showValue?: boolean;
  count?: number;
  className?: string;
}

export function Rating({ value, max = 5, size = 16, showValue = false, count, className }: RatingProps) {
  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <div className="flex gap-0.5">
        {Array.from({ length: max }, (_, i) => (
          <Star
            key={i}
            size={size}
            className={i < Math.floor(value) ? "fill-[var(--color-gold)] text-[var(--color-gold)]" : "text-[var(--color-border)]"}
            strokeWidth={1.5}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-[var(--color-text)]">{value.toFixed(1)}</span>
      )}
      {count !== undefined && (
        <span className="text-sm text-[var(--color-text-muted)]">({count})</span>
      )}
    </div>
  );
}
