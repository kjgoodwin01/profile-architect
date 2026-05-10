import type { ProfileScore, FeedbackItem } from "@/types";

export function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-400";
  if (score >= 60) return "text-amber-400";
  return "text-red-400";
}

export function getScoreLabel(score: number): string {
  if (score >= 90) return "Exceptional";
  if (score >= 80) return "Strong";
  if (score >= 70) return "Good";
  if (score >= 60) return "Average";
  if (score >= 50) return "Needs Work";
  return "Critical";
}

export function getOverallScore(scores: ProfileScore): number {
  const weights = {
    attractiveness: 0.25,
    trustworthiness: 0.15,
    masculinity: 0.15,
    conversation_potential: 0.2,
    authenticity: 0.1,
    status_signaling: 0.1,
    differentiation: 0.05,
  };

  return Math.round(
    scores.attractiveness * weights.attractiveness +
      scores.trustworthiness * weights.trustworthiness +
      scores.masculinity * weights.masculinity +
      scores.conversation_potential * weights.conversation_potential +
      scores.authenticity * weights.authenticity +
      scores.status_signaling * weights.status_signaling +
      scores.differentiation * weights.differentiation
  );
}

export function sortFeedbackBySeverity(items: FeedbackItem[]): FeedbackItem[] {
  const order = { critical: 0, warning: 1, info: 2, strong: 3 };
  return [...items].sort((a, b) => order[a.severity] - order[b.severity]);
}

export function getSeverityStyles(severity: FeedbackItem["severity"]) {
  switch (severity) {
    case "critical":
      return {
        badge: "bg-red-500/20 text-red-400",
        icon: "bg-red-500/20 text-red-400",
        label: "CRITICAL",
      };
    case "warning":
      return {
        badge: "bg-amber-500/20 text-amber-400",
        icon: "bg-amber-500/20 text-amber-400",
        label: "WARNING",
      };
    case "strong":
      return {
        badge: "bg-green-500/20 text-green-400",
        icon: "bg-green-500/20 text-green-400",
        label: "STRONG",
      };
    default:
      return {
        badge: "bg-blue-500/20 text-blue-400",
        icon: "bg-blue-500/20 text-blue-400",
        label: "INFO",
      };
  }
}
