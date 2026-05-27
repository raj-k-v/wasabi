"use client";

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { navItems } from "@/components/layout/nav-config";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass-panel sticky top-6 hidden h-[calc(100vh-3rem)] w-72 flex-col rounded-[32px] p-5 lg:flex">
      <Link href="/" className="flex items-center gap-3 px-2 py-3">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan/30 to-violet/30 p-3">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-300">Wasabi Intelligence</p>
          <p className="text-xl font-semibold tracking-tight text-white">SignalOS</p>
        </div>
      </Link>
      <nav className="mt-8 flex flex-1 flex-col gap-2">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition",
                active
                  ? "bg-white/10 text-white shadow-glow"
                  : "text-slate-400 hover:bg-white/5 hover:text-white",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>
      <div className="glass rounded-[28px] p-4">
        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Live agents</p>
        <p className="mt-3 text-sm text-slate-200">12 autonomous crawlers are monitoring pricing, talent, and launch signals.</p>
      </div>
    </aside>
  );
}
