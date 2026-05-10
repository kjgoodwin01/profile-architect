"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import {
  LayoutDashboard,
  ScanSearch,
  Camera,
  PenLine,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/analyzer", label: "Analyzer", icon: ScanSearch },
  { href: "/photo-studio", label: "Photo Studio", icon: Camera },
  { href: "/builder", label: "Profile Builder", icon: PenLine },
  { href: "/builder?tab=conversation", label: "Conversation", icon: MessageSquare },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <aside className="w-[220px] min-h-screen bg-[var(--bg2)] border-r border-[var(--border)] flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[var(--border)]">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-white font-display font-black text-sm">P</span>
          </div>
          <div>
            <div className="font-display font-bold text-[13px] text-[var(--text)] leading-none">
              Profile
            </div>
            <div className="font-display font-bold text-[13px] text-accent leading-none">
              Architect
            </div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href.split("?")[0]);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-all",
                active
                  ? "bg-accent/15 text-accent font-medium"
                  : "text-[var(--text3)] hover:text-[var(--text)] hover:bg-[var(--bg3)]"
              )}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-[var(--border)] flex flex-col gap-1">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] text-[var(--text3)] hover:text-[var(--text)] hover:bg-[var(--bg3)] transition-all"
        >
          <Settings size={16} />
          Settings
        </Link>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] text-[var(--text3)] hover:text-red-400 hover:bg-red-500/10 transition-all w-full"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
