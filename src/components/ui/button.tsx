"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[var(--color-gold)] text-[var(--color-green-dark)] hover:bg-[var(--color-gold-light)] font-semibold",
  secondary:
    "bg-[var(--color-green-forest)] text-[#F5F0E8] hover:bg-[var(--color-green-mid)]",
  outline:
    "bg-transparent border-[1.5px] border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold-tint)]",
  ghost:
    "bg-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
  danger:
    "bg-[var(--color-error)] text-white hover:opacity-90",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-[22px] py-[10px] text-[15px]",
  lg: "px-8 py-3 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] transition-all",
          "duration-[var(--duration-base)] ease-[var(--ease)]",
          "focus:outline-2 focus:outline-[var(--color-gold)] focus:outline-offset-2",
          "active:scale-[0.98] active:opacity-85",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          loading && "opacity-70 pointer-events-none",
          className,
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
