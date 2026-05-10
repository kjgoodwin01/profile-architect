"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/onboarding` },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/onboarding");
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center gap-2 mb-10 justify-center">
          <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-white font-display font-black text-sm">P</span>
          </div>
          <span className="font-display font-bold text-[var(--text)]">
            Profile<span className="text-accent">Architect</span>
          </span>
        </Link>

        <div className="bg-[var(--bg2)] border border-[var(--border)] rounded-2xl p-8">
          <h1 className="font-display font-bold text-xl text-[var(--text)] mb-1">
            Create your account
          </h1>
          <p className="text-sm text-[var(--text3)] mb-7">
            Build your optimized profile in minutes
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-[var(--text3)] font-medium mb-1.5 block uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[var(--bg3)] border border-[var(--border2)] rounded-xl px-4 py-3 text-[var(--text)] text-sm outline-none focus:border-accent transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-xs text-[var(--text3)] font-medium mb-1.5 block uppercase tracking-wide">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full bg-[var(--bg3)] border border-[var(--border2)] rounded-xl px-4 py-3 text-[var(--text)] text-sm outline-none focus:border-accent transition-colors"
                placeholder="Min 8 characters"
              />
            </div>
            <Button type="submit" loading={loading} size="lg" className="mt-2 w-full">
              Create Account →
            </Button>
          </form>

          <p className="text-center text-sm text-[var(--text3)] mt-6">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-accent hover:underline">
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
