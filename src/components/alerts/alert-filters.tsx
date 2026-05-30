"use client";

import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

const filters = ["all", "pricing", "hiring", "sentiment", "funding", "launch"];

export function AlertFilters() {
  const { selectedAlertFilter, setSelectedAlertFilter } = useUIStore();

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setSelectedAlertFilter(filter)}
          className={cn(
            "rounded-full border px-3 py-2 text-xs uppercase tracking-[0.18em] transition",
            selectedAlertFilter === filter
              ? "border-cyan/30 bg-cyan/10 text-cyan-100"
              : "border-white/10 bg-card/5 text-slate-400 hover:text-white",
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
