"use client";

import { FormEvent, useEffect, useState } from "react";
import { SearchIcon, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import type { SearchSuggestion } from "@/types";

export function SearchBar({
  defaultValue = "",
  suggestions,
}: {
  defaultValue?: string;
  suggestions: SearchSuggestion[];
}) {
  const router = useRouter();
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState(defaultValue);

  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextQuery = query.trim();
    if (!nextQuery) return;
    router.push(`/search?q=${encodeURIComponent(nextQuery)}`);
  };

  const filteredSuggestions = query 
    ? suggestions.filter(s => s.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : suggestions.slice(0, 5);

  return (
    <div className="relative">
      <div className="relative flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900 px-4 py-1 transition-all focus-within:border-teal-500/30">
        <SearchIcon className="h-4 w-4 text-slate-500" />
        <form onSubmit={onSubmit} className="flex-1">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search assets, markers, data..."
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            className="h-10 border-0 bg-transparent px-0 text-sm text-white placeholder:text-slate-500 shadow-none focus:ring-0 focus-visible:ring-0"
          />
        </form>
        <Sparkles className={`h-3.5 w-3.5 transition-colors ${focused ? "text-teal-400" : "text-slate-600"}`} />
      </div>
      
      {focused && filteredSuggestions.length > 0 && (
        <Card className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden border border-slate-200 bg-white p-1 shadow-2xl">
          <div className="px-3 py-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Live Suggestions</p>
          </div>
          <div className="space-y-0.5">
            {filteredSuggestions.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setQuery(item.name);
                  router.push(`/search?q=${encodeURIComponent(item.name)}`);
                }}
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                  <span className="font-semibold text-slate-900">{item.name}</span>
                </div>
                <span className="text-xs text-slate-400">{item.category}</span>
              </button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}


