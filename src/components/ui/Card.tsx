import { cn } from "@/lib/utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  accent?: boolean;
}

export function Card({ children, className, hover, accent }: CardProps) {
  return (
    <div
      className={cn(
        "bg-[var(--bg2)] border border-[var(--border)] rounded-xl p-5 relative overflow-hidden",
        hover && "transition-colors hover:bg-[var(--bg3)] cursor-pointer",
        accent && "border-accent/30 bg-accent/5",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-4 flex items-center justify-between", className)}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "font-display font-bold text-[15px] text-[var(--text)]",
        className
      )}
    >
      {children}
    </h3>
  );
}
