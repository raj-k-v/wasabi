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

  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan/20 to-violet/10 blur-2xl" />
      <div className="relative rounded-full border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
        <form onSubmit={onSubmit} className="flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/40 px-4 py-3">
          <SearchIcon className="h-4 w-4 text-cyan-200" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search companies, competitors, markets..."
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="border-0 bg-transparent px-0 focus:shadow-none"
          />
          <Sparkles className={`h-4 w-4 transition ${focused ? "text-cyan-200" : "text-slate-500"}`} />
        </form>
      </div>
      {focused ? (
        <Card className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-20 p-3">
          <p className="px-2 pb-2 text-xs uppercase tracking-[0.2em] text-slate-400">Suggestions</p>
          <div className="space-y-2">
            {suggestions.slice(0, 4).map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3">
                <span className="font-medium text-white">{item.name}</span>
                <span className="text-sm text-slate-400">{item.category}</span>
              </div>
            ))}
          </div>
        </Card>
      ) : null}
    </div>
  );
}
