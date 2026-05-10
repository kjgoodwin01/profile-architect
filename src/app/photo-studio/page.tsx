"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Upload } from "lucide-react";
import type { GeneratedPhoto } from "@/types";

const PHOTO_STYLES = [
  {
    id: "coffee_shop_candid",
    title: "Coffee Shop Candid",
    sub: "Warm, approachable, intellectual",
    emoji: "☕",
    slot: "Best as Photo #1",
  },
  {
    id: "rooftop_night",
    title: "Rooftop Night Shot",
    sub: "Urban confidence, social lifestyle",
    emoji: "🌃",
    slot: "Good for Photo #2",
  },
  {
    id: "outdoors_hiking",
    title: "Outdoors / Hiking",
    sub: "Active, adventurous, healthy",
    emoji: "🏔",
    slot: "Lifestyle anchor Photo #3-4",
  },
  {
    id: "clean_apartment",
    title: "Clean Apartment",
    sub: "Lifestyle, taste, self-assurance",
    emoji: "🏠",
    slot: "Status signal Photo #4-5",
  },
  {
    id: "candid_laugh",
    title: "Candid Laugh",
    sub: "Warmth, social, non-try-hard",
    emoji: "😄",
    slot: "Trust builder Photo #2-3",
  },
  {
    id: "masculine_portrait",
    title: "Masculine Portrait",
    sub: "Direct confidence, quiet authority",
    emoji: "🎯",
    slot: "High-impact Photo #1-2",
  },
];

export default function PhotoStudioPage() {
  const [selectedStyle, setSelectedStyle] = useState("coffee_shop_candid");
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<GeneratedPhoto[]>([]);
  const [error, setError] = useState("");

  async function generatePhotos() {
    setGenerating(true);
    setError("");

    // Generate multiple styles at once
    const stylesToGen = [selectedStyle, "candid_laugh"];
    const promises = stylesToGen.map((style) =>
      fetch("/api/generate-photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ style }),
      }).then((r) => r.json())
    );

    try {
      const photos = await Promise.all(promises);
      setResults(photos);
    } catch {
      setError("Generation failed. Check your REPLICATE_API_TOKEN.");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display font-extrabold text-2xl text-[var(--text)] tracking-tight mb-2">
          AI Photo Studio
        </h1>
        <p className="text-sm text-[var(--text2)]">
          Generate realistic, optimized dating-app photos. No fake luxury. No uncanny AI look.
        </p>
      </div>

      {/* Upload zone */}
      <div className="border-2 border-dashed border-[var(--border3)] rounded-xl p-10 text-center mb-6 bg-[var(--bg2)] cursor-pointer hover:border-accent hover:bg-accent/5 transition-all group">
        <Upload size={28} className="mx-auto mb-3 text-[var(--text3)] group-hover:text-accent transition-colors" />
        <p className="text-[14px] font-medium text-[var(--text)] mb-1">
          Upload 3–5 reference photos
        </p>
        <p className="text-xs text-[var(--text3)]">
          Clear face shots in different lighting. JPG or PNG. (Connect Replicate API to enable)
        </p>
      </div>

      {/* Style grid */}
      <h2 className="font-display font-bold text-sm text-[var(--text)] mb-4">
        Choose Photo Style
      </h2>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {PHOTO_STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => setSelectedStyle(style.id)}
            className={`text-left p-4 rounded-xl border transition-all ${
              selectedStyle === style.id
                ? "bg-accent/10 border-accent/40"
                : "bg-[var(--bg2)] border-[var(--border2)] hover:border-[var(--border3)]"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5">{style.emoji}</span>
              <div>
                <p className="text-sm font-medium text-[var(--text)] mb-0.5">
                  {style.title}
                </p>
                <p className="text-xs text-[var(--text3)]">{style.sub}</p>
                <Badge variant="neutral" className="mt-2 text-[9px]">
                  {style.slot}
                </Badge>
              </div>
            </div>
          </button>
        ))}
      </div>

      {error && (
        <p className="text-red-400 text-sm mb-4 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl">
          {error}
        </p>
      )}

      <Button
        onClick={generatePhotos}
        loading={generating}
        size="lg"
        className="w-full font-display font-bold text-base"
      >
        {generating ? "Generating Photos..." : "Generate Photos"}
      </Button>

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-8">
          <h2 className="font-display font-bold text-sm text-[var(--text)] mb-4">
            Generated Photos
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {results.map((photo, i) => {
              const styleMeta = PHOTO_STYLES.find((s) => s.id === photo.category);
              return (
                <Card key={photo.id || i} className="p-0 overflow-hidden">
                  <div className="aspect-[3/4] bg-[var(--bg3)] flex items-center justify-center relative">
                    {photo.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={photo.url}
                        alt={photo.category}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="text-4xl mb-2 opacity-40">
                          {styleMeta?.emoji || "📸"}
                        </div>
                        <p className="text-xs text-[var(--text3)]">
                          {photo.mock
                            ? "Demo mode — add Replicate API key"
                            : "Processing..."}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-semibold text-[var(--gold)] uppercase tracking-wide">
                        {styleMeta?.title || photo.category}
                      </p>
                      <Badge variant="success">{photo.predicted_score}/100</Badge>
                    </div>
                    <p className="text-xs text-[var(--text3)] leading-relaxed mb-1">
                      {photo.psychological_reason}
                    </p>
                    <p className="text-[11px] text-accent">
                      {photo.slot_recommendation}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
