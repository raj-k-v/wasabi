import { SearchBar } from "@/components/dashboard/search-bar";
import { CompetitorCard } from "@/components/competitors/competitor-card";
import { Card } from "@/components/ui/card";
import { competitors, suggestions } from "@/services/mock-data";

export default function SearchPage() {
  return (
    <div className="space-y-6">
      <SearchBar />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card className="p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Search intelligence</p>
          <h1 className="mt-2 text-3xl font-semibold">Search companies and markets</h1>
          <div className="mt-5 space-y-3">
            {suggestions.map((item) => (
              <div key={item.name} className="rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-4">
                <p className="font-medium text-white">{item.name}</p>
                <p className="mt-1 text-sm text-slate-400">{item.category}</p>
              </div>
            ))}
          </div>
        </Card>
        <div className="space-y-6">
          {competitors.map((item) => (
            <CompetitorCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
