"use client";

import { Menu, SearchIcon } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { NotificationsDropdown } from "@/components/layout/notifications-dropdown";
import { useUIStore } from "@/store/ui-store";

export function Navbar() {
  const { toggleCommandPalette, toggleMobileSidebar } = useUIStore();

  return (
    <div className="glass-panel sticky top-4 z-20 flex items-center gap-3 rounded-[28px] px-4 py-3">
      <Button variant="secondary" size="icon" className="lg:hidden" onClick={() => toggleMobileSidebar(true)}>
        <Menu className="h-4 w-4" />
      </Button>
      <button
        onClick={() => toggleCommandPalette(true)}
        className="group flex flex-1 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-cyan/30"
      >
        <SearchIcon className="h-4 w-4 text-slate-400 transition group-hover:text-cyan-200" />
        <span className="flex-1 text-sm text-slate-400">Search companies, competitors, markets...</span>
        <div className="hidden rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-400 sm:block">⌘K</div>
      </button>
      <NotificationsDropdown />
      <Avatar initials="AI" />
    </div>
  );
}
