"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { useUserStore } from "@/stores/userStore";
import { Trash2, RotateCcw, CheckCircle, Smartphone } from "lucide-react";

export default function SettingsPage() {
  const { latestAnalysis, clearChat, chatHistory } = useUserStore();
  const [cleared, setCleared] = useState<string | null>(null);

  function clearAnalysis() {
    useUserStore.setState({ latestAnalysis: null });
    setCleared("analysis");
    setTimeout(() => setCleared(null), 2000);
  }

  function clearAllData() {
    useUserStore.setState({
      latestAnalysis: null,
      prompts: [],
      generatedPhotos: [],
      onboardingData: null,
      onboardingComplete: false,
      onboardingStep: 0,
    });
    clearChat();
    setCleared("all");
    setTimeout(() => setCleared(null), 2000);
  }

  function handleClearChat() {
    clearChat();
    setCleared("chat");
    setTimeout(() => setCleared(null), 2000);
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display font-extrabold text-2xl text-[var(--text)] tracking-tight mb-2">
          Settings
        </h1>
        <p className="text-sm text-[var(--text2)]">
          Manage your data and app preferences.
        </p>
      </div>

      {/* PWA Install */}
      <div className="mb-6">
        <h2 className="font-display font-bold text-sm text-[var(--text)] mb-3">
          Install App
        </h2>
        <Card className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0">
            <Smartphone size={20} className="text-accent" />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--text)] mb-1">Add to Home Screen</p>
            <p className="text-xs text-[var(--text3)] leading-relaxed">
              Install Profile Architect as a PWA for a native app experience. On iOS: tap the Share button then &quot;Add to Home Screen&quot;. On Android/Chrome: tap the menu then &quot;Install app&quot;.
            </p>
          </div>
        </Card>
      </div>

      {/* Current Data */}
      <div className="mb-6">
        <h2 className="font-display font-bold text-sm text-[var(--text)] mb-3">
          Current Data
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <p className="text-[10px] text-[var(--text3)] uppercase tracking-widest mb-1">
              Profile Analysis
            </p>
            <p className="text-sm font-medium text-[var(--text)]">
              {latestAnalysis ? `Score: ${latestAnalysis.scores.overall}/100` : "None saved"}
            </p>
          </Card>
          <Card>
            <p className="text-[10px] text-[var(--text3)] uppercase tracking-widest mb-1">
              Chat History
            </p>
            <p className="text-sm font-medium text-[var(--text)]">
              {chatHistory.length} message{chatHistory.length !== 1 ? "s" : ""}
            </p>
          </Card>
        </div>
      </div>

      {/* Data Management */}
      <div className="mb-6">
        <h2 className="font-display font-bold text-sm text-[var(--text)] mb-3">
          Data Management
        </h2>
        <div className="flex flex-col gap-3">
          <Card className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--text)]">Clear Chat History</p>
              <p className="text-xs text-[var(--text3)]">Remove all AI coach messages</p>
            </div>
            <button
              onClick={handleClearChat}
              disabled={chatHistory.length === 0}
              className="flex items-center gap-1.5 text-xs text-[var(--text3)] bg-[var(--bg3)] border border-[var(--border2)] px-3 py-2 rounded-lg hover:text-[var(--text)] transition-all disabled:opacity-40"
            >
              {cleared === "chat" ? (
                <><CheckCircle size={12} className="text-green-400" /> Cleared</>
              ) : (
                <><RotateCcw size={12} /> Clear</>
              )}
            </button>
          </Card>

          <Card className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--text)]">Clear Analysis</p>
              <p className="text-xs text-[var(--text3)]">Remove saved profile analysis from dashboard</p>
            </div>
            <button
              onClick={clearAnalysis}
              disabled={!latestAnalysis}
              className="flex items-center gap-1.5 text-xs text-[var(--text3)] bg-[var(--bg3)] border border-[var(--border2)] px-3 py-2 rounded-lg hover:text-[var(--text)] transition-all disabled:opacity-40"
            >
              {cleared === "analysis" ? (
                <><CheckCircle size={12} className="text-green-400" /> Cleared</>
              ) : (
                <><RotateCcw size={12} /> Clear</>
              )}
            </button>
          </Card>

          <Card className="flex items-center justify-between border-red-500/20">
            <div>
              <p className="text-sm font-medium text-red-400">Reset All Data</p>
              <p className="text-xs text-[var(--text3)]">Clear everything — analysis, prompts, photos, onboarding</p>
            </div>
            <button
              onClick={clearAllData}
              className="flex items-center gap-1.5 text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg hover:bg-red-500/20 transition-all"
            >
              {cleared === "all" ? (
                <><CheckCircle size={12} /> Done</>
              ) : (
                <><Trash2 size={12} /> Reset</>
              )}
            </button>
          </Card>
        </div>
      </div>

      {/* About */}
      <div>
        <h2 className="font-display font-bold text-sm text-[var(--text)] mb-3">About</h2>
        <Card>
          <div className="flex flex-col gap-2">
            {[
              { label: "App", value: "Profile Architect" },
              { label: "Version", value: "1.0.0" },
              { label: "Stack", value: "Next.js 14 · Claude AI · Supabase" },
              { label: "Powered by", value: "Anthropic Claude Sonnet" },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-center py-1 border-b border-[var(--border)] last:border-0">
                <span className="text-xs text-[var(--text3)] uppercase tracking-wide">{row.label}</span>
                <span className="text-xs text-[var(--text)]">{row.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
