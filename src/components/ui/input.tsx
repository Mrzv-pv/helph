"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[var(--color-text)]">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full bg-white border border-[var(--color-border)] rounded-[var(--radius-md)]",
              "px-[14px] py-[10px] text-[15px] text-[var(--color-text)]",
              "placeholder:text-[var(--color-text-muted)]",
              "focus:border-[var(--color-gold)] focus:outline-2 focus:outline-[var(--color-gold-tint)]",
              "transition-all duration-[var(--duration-fast)]",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              icon && "pl-10",
              error && "border-[var(--color-error)] focus:border-[var(--color-error)]",
              className,
            )}
            {...props}
          />
        </div>
        {error && <span className="text-[13px] text-[var(--color-error)]">{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";
