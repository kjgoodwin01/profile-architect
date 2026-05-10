"use client";
import { cn } from "@/lib/utils/cn";

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
}

export function ScoreRing({
  score,
  size = 80,
  strokeWidth = 5,
  label,
  className,
}: ScoreRingProps) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 80 ? "#4ade80" : score >= 60 ? "#fbbf24" : "#f87171";

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
      </svg>
      <span
        className="absolute font-display font-bold"
        style={{
          fontSize: size * 0.22,
          color: "var(--text)",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        {score}
      </span>
      {label && (
        <span className="mt-2 text-[11px] text-[var(--text3)] whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
}
