"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Command, SearchIcon } from "lucide-react";
import Link from "next/link";

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUIStore } from "@/store/ui-store";
import type { SearchSuggestion } from "@/types";

export function CommandPalette({ suggestions }: { suggestions: SearchSuggestion[] }) {
  const router = useRouter();
  const { commandPaletteOpen, toggleCommandPalette, setSelectedCompany } = useUIStore();
  const [query, setQuery] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    toggleCommandPalette(false);
  };

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
  }, [query, suggestions]);

  return (
    <Dialog open={commandPaletteOpen} onOpenChange={toggleCommandPalette}>
      <DialogContent className="overflow-hidden p-0 max-w-2xl">
        <div className="border-b border-gray-100 p-8">
          <DialogTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-600">
            Quick Access
          </DialogTitle>
          <DialogDescription className="sr-only">
            Search companies, market markers, and portfolio assets.
          </DialogDescription>
          <form onSubmit={onSubmit} className="mt-4 flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 px-5 py-1 focus-within:border-teal-500/50 focus-within:ring-2 focus-within:ring-teal-500/10">
            <SearchIcon className="h-5 w-5 text-gray-400" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Type to search portfolio..."
              autoFocus
              className="h-12 border-0 bg-transparent px-0 text-lg font-medium text-gray-900 placeholder:text-gray-400 shadow-none focus-visible:ring-0"
            />
            <div className="hidden items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2 py-1 text-[10px] font-bold text-gray-400 sm:flex">
              <Command className="h-3 w-3" />K
            </div>
          </form>
        </div>
        
        <div className="max-h-[480px] space-y-1 overflow-y-auto p-4 pt-0">
          <div className="px-4 py-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Suggestions</p>
          </div>
          {filtered.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setSelectedCompany(item.name);
                toggleCommandPalette(false);
              }}
              className="group flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left transition-colors hover:bg-teal-50/50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-100 bg-white text-xs font-bold text-gray-900 group-hover:border-teal-200 group-hover:text-teal-600">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.category}</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-300 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-teal-600" />
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm text-gray-400">No results found for "{query}"</p>
            </div>
          )}

          <div className="mt-4 border-t border-gray-50 p-4">
            <Link 
              href="/search" 
              onClick={() => toggleCommandPalette(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              Open advanced filters
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

