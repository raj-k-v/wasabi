"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { navItems } from "@/components/layout/nav-config";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-64 flex-col border-r border-gray-200 bg-white/50 lg:flex">
      <Link href="/" className="mb-8 flex items-center gap-2 px-4 py-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white">
          <Sparkles className="h-5 w-5" />
        </div>
        <span className="text-xl font-bold tracking-tight text-gray-900">Wasabi</span>
      </Link>
      
      <nav className="flex flex-1 flex-col gap-1 px-2">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-teal-50 text-teal-700"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              <item.icon className={cn("h-4 w-4", active ? "text-teal-600" : "text-gray-400 group-hover:text-gray-600")} />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="p-4">
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Status</p>
          <p className="mt-2 text-xs leading-relaxed text-gray-600">
            Agents active. Monitoring market signals across 12 sectors.
          </p>
        </div>
      </div>
    </aside>
  );
}

