import { cn } from "@/lib/utils/cn";

type BadgeVariant = "accent" | "success" | "warning" | "danger" | "neutral" | "gold";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  accent: "bg-accent/20 text-accent border-accent/20",
  success: "bg-green-500/20 text-green-400 border-green-500/20",
  warning: "bg-amber-500/20 text-amber-400 border-amber-500/20",
  danger: "bg-red-500/20 text-red-400 border-red-500/20",
  neutral: "bg-[var(--bg4)] text-[var(--text3)] border-[var(--border2)]",
  gold: "bg-amber-500/10 text-[var(--gold)] border-amber-500/20",
};

export function Badge({
  children,
  variant = "neutral",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-[10px] font-semibold px-2.5 py-0.5 rounded-full border tracking-wide uppercase",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
