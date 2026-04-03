import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)]",
          "px-[18px] py-4",
          hoverable && "transition-shadow duration-[var(--duration-base)] ease-[var(--ease)] hover:shadow-[var(--shadow-card)] cursor-pointer",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";
