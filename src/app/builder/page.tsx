"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Platform, ProfilePrompt, ChatMessage } from "@/types";
import { RefreshCw, Copy, Check, Send } from "lucide-react";

const STARTER_PROMPTS: ProfilePrompt[] = [
  {
    id: "p1",
    platform: "hinge",
    question: "My simple pleasures...",
    answer:
      "The first coffee when the apartment is still quiet. A restaurant rec from someone who'll actually fight for it. That exact moment in a road trip when you've officially left the city.",
    score: 86,
    tone: "calm_intelligent",
    strengths: ["Specific", "Warm", "Opens conversation"],
    weaknesses: [],
  },
  {
    id: "p2",
    platform: "hinge",
    question: "I'll know it's love if...",
    answer:
      "You send me a voice note explaining something you're genuinely obsessed with. Passion is the thing.",
    score: 91,
    tone: "confident",
    strengths: ["Intriguing", "Masculine", "Elicits response"],
    weaknesses: [],
  },
  {
    id: "p3",
    platform: "hinge",
    question: "Typical Sunday...",
    answer:
      "Farmers market for things I'll ruin in the kitchen. Gym. Three hours reading something I'll never use. Dinner I'm unreasonably proud of.",
    score: 88,
    tone: "dry_humor",
    strengths: ["Lifestyle signal", "Humor", "Authenticity"],
    weaknesses: [],
  },
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "init",
    role: "assistant",
    content:
      "I've analyzed your profile archetype — you're calibrated as a **Calm Achiever**: competent, low-key confident, dry humor. Your prompts above lean into that. What would you like to refine?",
    timestamp: new Date(),
  },
];

export default function BuilderPage() {
  const [platform, setPlatform] = useState<Platform>("hinge");
  const [prompts, setPrompts] = useState<ProfilePrompt[]>(STARTER_PROMPTS);
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function regeneratePrompt(prompt: ProfilePrompt) {
    setRegeneratingId(prompt.id);
    try {
      const res = await fetch("/api/generate-prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform,
          question: prompt.question,
          tone: prompt.tone,
          regenerate: true,
        }),
      });
      const data = await res.json();
      setPrompts((prev) =>
        prev.map((p) =>
          p.id === prompt.id
            ? { ...p, answer: data.answer, score: data.score }
            : p
        )
      );
    } catch {
      // keep original
    } finally {
      setRegeneratingId(null);
    }
  }

  async function copyPrompt(id: string, text: string) {
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  async function sendMessage() {
    if (!input.trim() || chatLoading) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setChatLoading(true);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));
        for (const line of lines) {
          const data = line.slice(6);
          if (data === "[DONE]") break;
          try {
            const parsed = JSON.parse(data);
            fullText += parsed.text;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === aiMsg.id ? { ...m, content: fullText } : m
              )
            );
          } catch {}
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiMsg.id ? { ...m, content: "Error — try again." } : m
        )
      );
    } finally {
      setChatLoading(false);
    }
  }

  const scoreColor = (s: number) =>
    s >= 80 ? "success" : s >= 65 ? "warning" : "danger";

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display font-extrabold text-2xl text-[var(--text)] tracking-tight mb-2">
          Profile Builder
        </h1>
        <p className="text-sm text-[var(--text2)]">
          AI-generated prompts and bios engineered for response rates.
        </p>
      </div>

      {/* Platform tabs */}
      <div className="flex gap-2 mb-6">
        {(["hinge", "bumble", "tinder"] as Platform[]).map((p) => (
          <button
            key={p}
            onClick={() => setPlatform(p)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
              platform === p
                ? "bg-accent/15 border border-accent/30 text-accent"
                : "bg-[var(--bg3)] border border-[var(--border2)] text-[var(--text3)] hover:text-[var(--text)]"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Prompts */}
      <h2 className="font-display font-bold text-sm text-[var(--text)] mb-4">
        Generated Prompts
      </h2>
      <div className="flex flex-col gap-4 mb-8">
        {prompts.map((prompt) => (
          <Card key={prompt.id}>
            <p className="text-[11px] text-[var(--text3)] uppercase tracking-widest font-medium mb-2">
              {prompt.question}
            </p>
            <p className="text-[14px] text-[var(--text)] leading-relaxed mb-3">
              {regeneratingId === prompt.id ? (
                <span className="text-[var(--text3)] italic">Generating...</span>
              ) : (
                prompt.answer
              )}
            </p>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant={scoreColor(prompt.score) as "success" | "warning" | "danger"}>
                {prompt.score}/100
              </Badge>
              {prompt.strengths.map((s) => (
                <span key={s} className="text-[11px] text-[var(--text3)]">
                  · {s}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => regeneratePrompt(prompt)}
                disabled={regeneratingId === prompt.id}
                className="flex items-center gap-1.5 text-xs text-accent bg-accent/10 border border-accent/20 px-3 py-1.5 rounded-lg hover:bg-accent/20 transition-all disabled:opacity-50"
              >
                <RefreshCw size={12} />
                Regenerate
              </button>
              <button
                onClick={() => copyPrompt(prompt.id, prompt.answer)}
                className="flex items-center gap-1.5 text-xs text-[var(--text3)] bg-[var(--bg4)] border border-[var(--border2)] px-3 py-1.5 rounded-lg hover:text-[var(--text)] transition-all"
              >
                {copiedId === prompt.id ? (
                  <><Check size={12} /> Copied</>
                ) : (
                  <><Copy size={12} /> Copy</>
                )}
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* AI Coach Chat */}
      <h2 className="font-display font-bold text-sm text-[var(--text)] mb-4">
        AI Coach
      </h2>
      <Card className="p-0 overflow-hidden">
        <div className="p-4 flex flex-col gap-3 max-h-72 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold ${
                  msg.role === "assistant"
                    ? "bg-accent/20 text-accent border border-accent/30"
                    : "bg-[var(--bg4)] text-[var(--text3)] border border-[var(--border2)]"
                }`}
              >
                {msg.role === "assistant" ? "PA" : "Y"}
              </div>
              <div
                className={`rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed max-w-[82%] ${
                  msg.role === "assistant"
                    ? "bg-[var(--bg3)] border border-[var(--border)] text-[var(--text2)]"
                    : "bg-accent/10 border border-accent/20 text-[var(--text)]"
                }`}
                dangerouslySetInnerHTML={{
                  __html: msg.content
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                    .replace(/\n/g, "<br/>"),
                }}
              />
            </div>
          ))}
          {chatLoading && messages[messages.length - 1]?.content === "" && (
            <div className="flex gap-1 pl-10">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex gap-2 p-3 border-t border-[var(--border)]">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask anything — rewrite a prompt, change tone, get opener ideas..."
            className="flex-1 bg-[var(--bg3)] border border-[var(--border2)] rounded-xl px-3.5 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text3)] outline-none focus:border-accent transition-colors"
          />
          <button
            onClick={sendMessage}
            disabled={chatLoading || !input.trim()}
            className="bg-accent hover:bg-accent-2 text-white p-2.5 rounded-xl transition-all disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </div>
      </Card>
    </div>
  );
}
