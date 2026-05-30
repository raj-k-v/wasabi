"use client";

import { Menu, SearchIcon } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { NotificationsDropdown } from "@/components/layout/notifications-dropdown";
import { useUIStore } from "@/store/ui-store";

export function Navbar() {
  const { toggleCommandPalette, toggleMobileSidebar } = useUIStore();

  return (
    <div className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-6">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => toggleMobileSidebar(true)}>
        <Menu className="h-5 w-5" />
      </Button>
      
      <div className="flex flex-1 items-center gap-4">
        <button
          onClick={() => toggleCommandPalette(true)}
          className="flex flex-1 max-w-md items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-left transition-colors hover:border-gray-300"
        >
          <SearchIcon className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-500">Quick search...</span>
          <kbd className="hidden rounded bg-white px-1.5 py-0.5 text-[10px] font-medium text-gray-400 border border-gray-200 sm:block">⌘K</kbd>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <NotificationsDropdown />
        <Avatar initials="JD" className="h-8 w-8 text-xs" />

      </div>
    </div>
  );
}

