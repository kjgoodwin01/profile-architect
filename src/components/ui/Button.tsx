"use client";
import { cn } from "@/lib/utils/cn";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-body font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none";

    const variants = {
      primary:
        "bg-accent hover:bg-accent-2 text-white active:scale-[0.98]",
      secondary:
        "bg-transparent border border-[var(--border3)] text-[var(--text)] hover:bg-[var(--bg3)] active:scale-[0.98]",
      ghost:
        "bg-transparent text-[var(--text2)] hover:text-[var(--text)] hover:bg-[var(--bg3)]",
      danger:
        "bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30",
    };

    const sizes = {
      sm: "text-xs px-3 py-2",
      md: "text-sm px-5 py-[11px]",
      lg: "text-base px-7 py-[13px]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <LoadingDots />
            {children}
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

function LoadingDots() {
  return (
    <span className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </span>
  );
}
