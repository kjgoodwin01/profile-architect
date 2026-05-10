"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useUserStore } from "@/stores/userStore";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  {
    step: 1,
    title: "First, the basics.",
    sub: "Quick facts — takes 30 seconds.",
    type: "inputs" as const,
    fields: [
      { label: "Age", id: "age", placeholder: "e.g. 28" },
      { label: "City", id: "city", placeholder: "e.g. Austin, TX" },
      { label: "Height", id: "height", placeholder: "e.g. 6'1\"" },
    ],
  },
  {
    step: 2,
    title: "What do you do?",
    sub: "Career and ambition signaling matters more than you think.",
    type: "options" as const,
    key: "career",
    options: [
      { title: "Tech / Engineering", sub: "Software, data, product" },
      { title: "Finance / Business", sub: "Banking, consulting, strategy" },
      { title: "Creative / Media", sub: "Design, film, writing, music" },
      { title: "Healthcare / Science", sub: "Medicine, research, bio" },
      { title: "Entrepreneur", sub: "Building something yourself" },
      { title: "Trade / Skilled", sub: "Construction, skilled work" },
    ],
  },
  {
    step: 3,
    title: "How do you carry yourself?",
    sub: "Honest self-assessment. This shapes your profile archetype.",
    type: "options" as const,
    key: "masculine_archetype",
    options: [
      { title: "Quiet confidence", sub: "Say little, mean a lot" },
      { title: "Warm and sociable", sub: "Natural with people" },
      { title: "Intellectual", sub: "Curious, thoughtful, a bit nerdy" },
      { title: "Adventurous", sub: "Always planning the next thing" },
      { title: "Dry humor", sub: "Deadpan, understated wit" },
      { title: "Driven achiever", sub: "Goals, focus, momentum" },
    ],
  },
  {
    step: 4,
    title: "What's your style?",
    sub: "Visual positioning matters for photo strategy.",
    type: "options" as const,
    key: "style_aesthetic",
    options: [
      { title: "Clean minimal", sub: "Simple, well-fitted, unfussy" },
      { title: "Smart casual", sub: "Elevated everyday" },
      { title: "Streetwear", sub: "Sneaker culture, graphic tees" },
      { title: "Outdoorsy", sub: "Fleece, trail boots, gear" },
      { title: "Business casual", sub: "Chinos, blazers, structure" },
    ],
  },
  {
    step: 5,
    title: "Rate your current situation.",
    sub: "Brutal honesty = better recommendations.",
    type: "sliders" as const,
    fields: [
      { label: "Photo quality", id: "photo_quality", min: 1, max: 10, val: 5 },
      { label: "Bio quality", id: "bio_quality", min: 1, max: 10, val: 5 },
      { label: "App effort", id: "app_effort", min: 1, max: 10, val: 5 },
    ],
  },
  {
    step: 6,
    title: "What's your goal?",
    sub: "This calibrates how aggressive your optimization should be.",
    type: "options" as const,
    key: "relationship_goal",
    options: [
      { title: "More quality matches", sub: "Fewer, better fits" },
      { title: "More total matches", sub: "Volume approach" },
      { title: "Specific demographic", sub: "Targeting a type" },
      { title: "Long-term relationship", sub: "Serious intent signaling" },
      { title: "Casual dating", sub: "Low commitment positioning" },
    ],
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string | number>>({});
  const router = useRouter();
  const { setOnboardingData, completeOnboarding } = useUserStore();

  const current = STEPS[step];
  const progress = ((step + 1) / (STEPS.length + 1)) * 100;

  function handleNext() {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setOnboardingData(data as never);
      completeOnboarding();
      router.push("/dashboard");
    }
  }

  function handleOptionSelect(key: string, value: string) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10 justify-center">
          <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-white font-display font-black text-sm">P</span>
          </div>
          <span className="font-display font-bold text-[var(--text)]">
            Profile<span className="text-accent">Architect</span>
          </span>
        </div>

        {/* Progress */}
        <div className="h-0.5 bg-[var(--bg4)] rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            {/* Header */}
            <div className="mb-6">
              <p className="text-[11px] text-[var(--text3)] uppercase tracking-widest font-medium mb-2">
                Step {current.step} of {STEPS.length}
              </p>
              <h1 className="font-display font-extrabold text-3xl text-[var(--text)] tracking-tight mb-2">
                {current.title}
              </h1>
              <p className="text-sm text-[var(--text2)]">{current.sub}</p>
            </div>

            {/* Content */}
            {current.type === "inputs" && (
              <div className="flex flex-col gap-4 mb-8">
                {current.fields.map((f) => (
                  <div key={f.id}>
                    <label className="text-xs text-[var(--text3)] uppercase tracking-wide font-medium mb-1.5 block">
                      {f.label}
                    </label>
                    <input
                      value={(data[f.id] as string) || ""}
                      onChange={(e) =>
                        setData((prev) => ({ ...prev, [f.id]: e.target.value }))
                      }
                      placeholder={f.placeholder}
                      className="w-full bg-[var(--bg3)] border border-[var(--border2)] rounded-xl px-4 py-3 text-[var(--text)] text-sm outline-none focus:border-accent transition-colors"
                    />
                  </div>
                ))}
              </div>
            )}

            {current.type === "options" && current.key && (
              <div className="grid grid-cols-2 gap-3 mb-8">
                {current.options?.map((opt) => {
                  const selected = data[current.key!] === opt.title;
                  return (
                    <button
                      key={opt.title}
                      onClick={() => handleOptionSelect(current.key!, opt.title)}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        selected
                          ? "bg-accent/10 border-accent/40 text-accent"
                          : "bg-[var(--bg3)] border-[var(--border2)] text-[var(--text2)] hover:border-[var(--border3)] hover:text-[var(--text)]"
                      }`}
                    >
                      <p className="text-sm font-medium mb-0.5">{opt.title}</p>
                      <p className="text-xs opacity-60">{opt.sub}</p>
                    </button>
                  );
                })}
              </div>
            )}

            {current.type === "sliders" && (
              <div className="flex flex-col gap-5 mb-8">
                {current.fields.map((f) => (
                  <div key={f.id}>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm text-[var(--text2)]">{f.label}</label>
                      <span className="text-sm font-medium text-[var(--text)]">
                        {(data[f.id] as number) ?? f.val}/10
                      </span>
                    </div>
                    <input
                      type="range"
                      min={f.min}
                      max={f.max}
                      value={(data[f.id] as number) ?? f.val}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          [f.id]: parseInt(e.target.value),
                        }))
                      }
                      className="w-full accent-[var(--accent)] h-1 rounded-full"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Nav */}
            <div className="flex justify-between items-center">
              {step > 0 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="text-sm text-[var(--text3)] hover:text-[var(--text)] transition-colors"
                >
                  ← Back
                </button>
              ) : (
                <span />
              )}
              <Button onClick={handleNext}>
                {step < STEPS.length - 1 ? "Continue →" : "Build My Profile →"}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
