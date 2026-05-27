"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Command, SearchIcon } from "lucide-react";
import Link from "next/link";

import { suggestions } from "@/services/mock-data";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUIStore } from "@/store/ui-store";

export function CommandPalette() {
  const { commandPaletteOpen, toggleCommandPalette, setSelectedCompany } = useUIStore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        toggleCommandPalette();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleCommandPalette]);

  const filtered = useMemo(() => {
    if (!query) return suggestions;
    return suggestions.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <Dialog open={commandPaletteOpen} onOpenChange={toggleCommandPalette}>
      <DialogContent className="overflow-hidden p-0">
        <div className="border-b border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4">
            <SearchIcon className="h-4 w-4 text-slate-400" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search companies, competitors, markets..."
              className="border-0 bg-transparent px-0 focus:shadow-none"
            />
            <div className="hidden rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-400 sm:flex">
              <Command className="mr-1 h-3 w-3" />K
            </div>
          </div>
        </div>
        <div className="max-h-[420px] space-y-2 overflow-y-auto p-4">
          {filtered.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setSelectedCompany(item.name);
                toggleCommandPalette(false);
              }}
              className="flex w-full items-center justify-between rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3 text-left transition hover:border-cyan/30 hover:bg-white/[0.05]"
            >
              <div>
                <p className="font-medium text-white">{item.name}</p>
                <p className="text-sm text-slate-400">{item.category}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </button>
          ))}
          <Link href="/search" className="flex items-center justify-between rounded-2xl border border-dashed border-white/10 px-4 py-3 text-sm text-slate-300 transition hover:border-white/20 hover:text-white">
            Open advanced search
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
