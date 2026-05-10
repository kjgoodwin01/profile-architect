import { ScoreRing } from "@/components/ui/ScoreRing";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { ArrowRight, AlertTriangle, CheckCircle, Zap } from "lucide-react";

const mockInsights = [
  {
    type: "critical" as const,
    icon: Zap,
    title: "First photo is low-energy",
    body:
      "Group shots as photo #1 reduce matches by 40%. Lead with a confident solo that shows your face clearly.",
  },
  {
    type: "warning" as const,
    icon: AlertTriangle,
    title: "Bio reads as low-effort",
    body:
      '"I love to have fun and travel" appears on 63% of male profiles. You\'re undifferentiated. Fix this first.',
  },
  {
    type: "warning" as const,
    icon: AlertTriangle,
    title: "No status signaling",
    body:
      "Your prompts don't demonstrate competence, ambition, or lifestyle. You're leaving your strongest assets on the table.",
  },
  {
    type: "strong" as const,
    icon: CheckCircle,
    title: "Strong authenticity score",
    body:
      "You're not try-hard. This is rare and valuable. Build on it — let more of your actual personality show.",
  },
];

const subScores = [
  { label: "Attractiveness", score: 68, change: "+4" },
  { label: "Trustworthiness", score: 81, change: "+2" },
  { label: "Conversation Bait", score: 54, change: null },
  { label: "Masculinity", score: 72, change: "+1" },
  { label: "Authenticity", score: 85, change: "+5" },
  { label: "Status Signal", score: 49, change: null },
];

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs text-[var(--text3)] uppercase tracking-widest mb-1">
            Your Profile Score
          </p>
          <h1 className="font-display font-extrabold text-3xl text-[var(--text)] tracking-tight">
            Needs Work
          </h1>
          <p className="text-sm text-[var(--text2)] mt-1">
            3 critical fixes will get you to 85+
          </p>
        </div>
        <div className="flex items-end gap-3">
          <ScoreRing score={72} size={100} label="Overall" />
        </div>
      </div>

      {/* Sub-score grid */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {subScores.map((s) => (
          <Card key={s.label} className="text-center py-4">
            <p className="text-[10px] text-[var(--text3)] uppercase tracking-widest mb-2">
              {s.label}
            </p>
            <ScoreRing score={s.score} size={64} />
            {s.change && (
              <p className="text-xs text-green-400 mt-3">↑ {s.change} this week</p>
            )}
          </Card>
        ))}
      </div>

      {/* Priority fixes */}
      <div className="mb-8">
        <h2 className="font-display font-bold text-base text-[var(--text)] mb-4">
          Priority Fixes
        </h2>
        <div className="flex flex-col gap-3">
          {mockInsights.map((item) => {
            const Icon = item.icon;
            const badgeVariant =
              item.type === "critical"
                ? "danger"
                : item.type === "warning"
                ? "warning"
                : "success";
            return (
              <Card key={item.title} className="flex gap-4">
                <div
                  className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5 ${
                    item.type === "critical"
                      ? "bg-red-500/20"
                      : item.type === "warning"
                      ? "bg-amber-500/20"
                      : "bg-green-500/20"
                  }`}
                >
                  <Icon
                    size={15}
                    className={
                      item.type === "critical"
                        ? "text-red-400"
                        : item.type === "warning"
                        ? "text-amber-400"
                        : "text-green-400"
                    }
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[13px] font-medium text-[var(--text)]">
                      {item.title}
                    </span>
                    <Badge variant={badgeVariant}>{item.type}</Badge>
                  </div>
                  <p className="text-[13px] text-[var(--text3)] leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex gap-3">
        <Link
          href="/builder"
          className="flex-1 bg-accent hover:bg-accent-2 text-white font-medium px-5 py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-all"
        >
          Fix My Profile <ArrowRight size={15} />
        </Link>
        <Link
          href="/photo-studio"
          className="bg-[var(--bg3)] border border-[var(--border2)] text-[var(--text)] font-medium px-5 py-3 rounded-xl text-sm hover:bg-[var(--bg4)] transition-all"
        >
          Photo Studio
        </Link>
        <Link
          href="/analyzer"
          className="bg-[var(--bg3)] border border-[var(--border2)] text-[var(--text)] font-medium px-5 py-3 rounded-xl text-sm hover:bg-[var(--bg4)] transition-all"
        >
          Full Analysis
        </Link>
      </div>
    </div>
  );
}
