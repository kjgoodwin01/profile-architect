"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ScoreRing } from "@/components/ui/ScoreRing";
import type { ProfileAnalysis } from "@/types";

export default function AnalyzerPage() {
  const [profileText, setProfileText] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ProfileAnalysis | null>(null);
  const [error, setError] = useState("");

  async function runAnalysis() {
    if (!profileText.trim() && !analysis) {
      // Use demo data if empty
      setProfileText(
        "Bio: Just a guy who loves hiking, cooking, and travelling. Looking for someone to adventure with.\n\nPrompt 1 - My simple pleasures: Coffee, good music, and long drives.\nPrompt 2 - I'll know it's love if: We can sit in comfortable silence.\nPrompt 3 - Typical Sunday: Gym, meal prep, maybe a hike if the weather's good."
      );
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileText: profileText || "Demo profile" }),
      });
      if (!res.ok) throw new Error("Analysis failed");
      const data = await res.json();
      setAnalysis(data);
    } catch (e) {
      setError("Analysis failed. Check your API key in .env.local");
    } finally {
      setLoading(false);
    }
  }

  const severityVariant = (s: string) =>
    s === "critical" ? "danger" : s === "warning" ? "warning" : s === "strong" ? "success" : "accent";

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display font-extrabold text-2xl text-[var(--text)] tracking-tight mb-2">
          Profile Analyzer
        </h1>
        <p className="text-sm text-[var(--text2)]">
          Paste your bio, prompts, and photo descriptions for a brutally honest breakdown.
        </p>
      </div>

      <Card className="mb-6">
        <label className="text-xs text-[var(--text3)] uppercase tracking-widest font-medium mb-3 block">
          Your Current Profile
        </label>
        <textarea
          value={profileText}
          onChange={(e) => setProfileText(e.target.value)}
          placeholder="Paste your bio, prompts, photo descriptions, or any combination. Be specific — the more detail, the better the analysis."
          rows={7}
          className="w-full bg-[var(--bg3)] border border-[var(--border2)] rounded-xl px-4 py-3 text-[var(--text)] text-sm outline-none focus:border-accent transition-colors resize-none"
        />
        {error && (
          <p className="text-red-400 text-xs mt-2">{error}</p>
        )}
        <div className="flex justify-between items-center mt-4">
          <p className="text-xs text-[var(--text3)]">
            Leave blank to analyze a sample profile
          </p>
          <Button onClick={runAnalysis} loading={loading}>
            {loading ? "Analyzing..." : "Analyze Profile →"}
          </Button>
        </div>
      </Card>

      {analysis && (
        <div className="animate-fadeUp">
          {/* Score overview */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-lg text-[var(--text)]">
              Analysis Complete
            </h2>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-extrabold text-4xl text-[var(--text)]">
                {analysis.scores.overall}
              </span>
              <span className="text-[var(--text3)] text-lg">/100</span>
            </div>
          </div>

          {/* Sub-scores */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {Object.entries(analysis.scores)
              .filter(([k]) => k !== "overall")
              .map(([key, val]) => (
                <Card key={key} className="text-center py-3">
                  <ScoreRing score={val as number} size={56} />
                  <p className="text-[10px] text-[var(--text3)] uppercase tracking-wide mt-2">
                    {key.replace(/_/g, " ")}
                  </p>
                </Card>
              ))}
          </div>

          {/* Feedback */}
          <Card className="mb-6">
            <h3 className="font-display font-bold text-sm text-[var(--text)] mb-4 pb-3 border-b border-[var(--border)]">
              Detailed Feedback
            </h3>
            <div className="flex flex-col divide-y divide-[var(--border)]">
              {analysis.feedback.map((item, i) => (
                <div key={i} className="py-3 flex items-start gap-3">
                  <Badge variant={severityVariant(item.severity) as "danger" | "warning" | "success" | "accent"}>
                    {item.severity}
                  </Badge>
                  <div>
                    <p className="text-[13px] text-[var(--text)] font-medium mb-0.5">
                      {item.category}
                    </p>
                    <p className="text-[13px] text-[var(--text3)] leading-relaxed">
                      {item.message}
                    </p>
                    {item.fix && (
                      <p className="text-[12px] text-accent mt-1">
                        Fix: {item.fix}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Summary */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Profile Archetype", value: analysis.archetype },
              { label: "Est. Match Quality", value: analysis.estimated_match_quality },
              { label: "Est. Response Rate", value: analysis.estimated_response_rate },
              { label: "Demographic Appeal", value: analysis.demographic_appeal },
            ].map((s) => (
              <Card key={s.label}>
                <p className="text-[10px] text-[var(--text3)] uppercase tracking-widest mb-1">
                  {s.label}
                </p>
                <p className="text-sm font-medium text-[var(--text)]">{s.value}</p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
