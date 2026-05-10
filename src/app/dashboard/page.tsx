"use client";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { ArrowRight, AlertTriangle, CheckCircle, Zap, Info, ScanSearch } from "lucide-react";
import { useUserStore } from "@/stores/userStore";
import type { FeedbackSeverity } from "@/types";

const SCORE_LABELS: Record<string, string> = {
  attractiveness: "Attractiveness",
  trustworthiness: "Trustworthiness",
  conversation_potential: "Conversation Bait",
  masculinity: "Masculinity",
  authenticity: "Authenticity",
  status_signaling: "Status Signal",
  differentiation: "Differentiation",
};

function severityIcon(s: FeedbackSeverity) {
  if (s === "critical") return Zap;
  if (s === "warning") return AlertTriangle;
  if (s === "strong") return CheckCircle;
  return Info;
}

function severityBg(s: FeedbackSeverity) {
  if (s === "critical") return "bg-red-500/20";
  if (s === "warning") return "bg-amber-500/20";
  if (s === "strong") return "bg-green-500/20";
  return "bg-blue-500/20";
}

function severityText(s: FeedbackSeverity) {
  if (s === "critical") return "text-red-400";
  if (s === "warning") return "text-amber-400";
  if (s === "strong") return "text-green-400";
  return "text-blue-400";
}

function overallLabel(score: number) {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Needs Work";
  if (score >= 55) return "Below Average";
  return "Needs Major Work";
}

export default function DashboardPage() {
  const { latestAnalysis } = useUserStore();

  if (!latestAnalysis) {
    return (
      <div className="p-8 max-w-4xl">
        <div className="mb-8">
          <p className="text-xs text-[var(--text3)] uppercase tracking-widest mb-1">
            Your Profile Score
          </p>
          <h1 className="font-display font-extrabold text-3xl text-[var(--text)] tracking-tight">
            No Analysis Yet
          </h1>
          <p className="text-sm text-[var(--text2)] mt-1">
            Run your first profile analysis to see your score
          </p>
        </div>

        <Card className="flex flex-col items-center py-16 gap-5 text-center">
          <div className="w-16 h-16 rounded-2xl bg-accent/15 border border-accent/20 flex items-center justify-center">
            <ScanSearch size={28} className="text-accent" />
          </div>
          <div>
            <p className="font-display font-bold text-lg text-[var(--text)] mb-2">
              Run Your First Analysis
            </p>
            <p className="text-sm text-[var(--text3)] max-w-xs">
              Paste your bio and prompts to get a psychological breakdown and a score across 7 dimensions.
            </p>
          </div>
          <Link
            href="/analyzer"
            className="flex items-center gap-2 bg-accent hover:bg-accent-2 text-white font-medium px-6 py-3 rounded-xl text-sm transition-all"
          >
            Analyze My Profile <ArrowRight size={15} />
          </Link>
        </Card>
      </div>
    );
  }

  const { scores, feedback, archetype, estimated_match_quality, estimated_response_rate } = latestAnalysis;
  const subScores = Object.entries(scores)
    .filter(([k]) => k !== "overall")
    .map(([key, val]) => ({ label: SCORE_LABELS[key] ?? key, score: val as number }));

  const priorityFixes = feedback
    .filter((f) => f.severity === "critical" || f.severity === "warning")
    .slice(0, 4);

  const positives = feedback.filter((f) => f.severity === "strong").slice(0, 2);
  const displayFeedback = [...priorityFixes, ...positives].slice(0, 5);

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs text-[var(--text3)] uppercase tracking-widest mb-1">
            Your Profile Score
          </p>
          <h1 className="font-display font-extrabold text-3xl text-[var(--text)] tracking-tight">
            {overallLabel(scores.overall)}
          </h1>
          <p className="text-sm text-[var(--text2)] mt-1">
            Archetype: <span className="text-accent">{archetype}</span>
          </p>
        </div>
        <ScoreRing score={scores.overall} size={100} label="Overall" />
      </div>

      {/* Sub-score grid */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {subScores.map((s) => (
          <Card key={s.label} className="text-center py-4">
            <p className="text-[10px] text-[var(--text3)] uppercase tracking-widest mb-2">
              {s.label}
            </p>
            <ScoreRing score={s.score} size={64} />
          </Card>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <Card>
          <p className="text-[10px] text-[var(--text3)] uppercase tracking-widest mb-1">Est. Match Quality</p>
          <p className="text-sm font-medium text-[var(--text)]">{estimated_match_quality}</p>
        </Card>
        <Card>
          <p className="text-[10px] text-[var(--text3)] uppercase tracking-widest mb-1">Est. Response Rate</p>
          <p className="text-sm font-medium text-[var(--text)]">{estimated_response_rate}</p>
        </Card>
      </div>

      {/* Priority fixes */}
      {displayFeedback.length > 0 && (
        <div className="mb-8">
          <h2 className="font-display font-bold text-base text-[var(--text)] mb-4">
            Priority Fixes
          </h2>
          <div className="flex flex-col gap-3">
            {displayFeedback.map((item, i) => {
              const Icon = severityIcon(item.severity);
              const badgeVariant =
                item.severity === "critical" ? "danger" :
                item.severity === "warning" ? "warning" :
                item.severity === "strong" ? "success" : "accent";
              return (
                <Card key={i} className="flex gap-4">
                  <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5 ${severityBg(item.severity)}`}>
                    <Icon size={15} className={severityText(item.severity)} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[13px] font-medium text-[var(--text)]">
                        {item.category}
                      </span>
                      <Badge variant={badgeVariant}>{item.severity}</Badge>
                    </div>
                    <p className="text-[13px] text-[var(--text3)] leading-relaxed">
                      {item.message}
                    </p>
                    {item.fix && (
                      <p className="text-[12px] text-accent mt-1">Fix: {item.fix}</p>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

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
          Re-analyze
        </Link>
      </div>
    </div>
  );
}
