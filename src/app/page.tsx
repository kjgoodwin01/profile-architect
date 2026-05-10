import Link from "next/link";
import { ArrowRight, Zap, Camera, PenLine, BarChart2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">
      {/* Nav */}
      <nav className="border-b border-[var(--border)] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-white font-display font-black text-sm">P</span>
          </div>
          <span className="font-display font-bold text-[var(--text)]">
            Profile<span className="text-accent">Architect</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="text-sm text-[var(--text2)] hover:text-[var(--text)] transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/auth/register"
            className="bg-accent hover:bg-accent-2 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-xs font-medium px-4 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
          AI-Powered Profile Engineering
        </div>

        <h1 className="font-display font-extrabold text-5xl md:text-6xl leading-[1.08] tracking-tight mb-6 text-[var(--text)]">
          Your profile is{" "}
          <span className="text-gradient">leaving matches on the table</span>
        </h1>

        <p className="text-[17px] text-[var(--text2)] leading-relaxed mb-10 max-w-xl font-light">
          Most men fail on dating apps because of poor positioning, weak photos,
          and bad psychology — not because they&apos;re not good enough.
          Profile Architect fixes that.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/auth/register"
            className="bg-accent hover:bg-accent-2 text-white font-medium px-7 py-3.5 rounded-xl transition-all flex items-center gap-2 active:scale-[0.98]"
          >
            Analyze My Profile <ArrowRight size={16} />
          </Link>
          <Link
            href="/dashboard"
            className="bg-transparent border border-[var(--border3)] text-[var(--text)] font-medium px-7 py-3.5 rounded-xl transition-all hover:bg-[var(--bg3)]"
          >
            View Demo
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 mt-16 border border-[var(--border)] rounded-xl overflow-hidden divide-x divide-[var(--border)] w-full max-w-lg">
          {[
            { num: "3.2×", label: "avg match increase" },
            { num: "67%", label: "higher response rate" },
            { num: "12min", label: "setup time" },
          ].map((s) => (
            <div key={s.label} className="bg-[var(--bg2)] py-5 text-center">
              <div className="font-display font-extrabold text-2xl text-[var(--text)]">
                {s.num}
              </div>
              <div className="text-xs text-[var(--text3)] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-[var(--border)]">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-[var(--border)]">
          {[
            {
              icon: Zap,
              title: "Profile Analyzer",
              desc: "Brutally honest psychological breakdown. No fake positivity.",
            },
            {
              icon: Camera,
              title: "AI Photo Studio",
              desc: "Realistic optimized photos. No uncanny AI look.",
            },
            {
              icon: PenLine,
              title: "Profile Builder",
              desc: "Scientifically engineered bios and prompts for Hinge, Bumble, Tinder.",
            },
            {
              icon: BarChart2,
              title: "Success Engine",
              desc: "Predictive scoring on match quality, response rate, and swipe power.",
            },
          ].map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="bg-[var(--bg2)] p-7 hover:bg-[var(--bg3)] transition-colors">
                <div className="w-9 h-9 rounded-lg bg-[var(--bg4)] border border-[var(--border2)] flex items-center justify-center mb-4">
                  <Icon size={16} className="text-accent" />
                </div>
                <div className="font-display font-bold text-[14px] text-[var(--text)] mb-2">
                  {f.title}
                </div>
                <div className="text-[13px] text-[var(--text3)] leading-relaxed">
                  {f.desc}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
