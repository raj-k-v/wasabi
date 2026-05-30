import { SearchBar } from "@/components/dashboard/search-bar";
import { CompetitorCard } from "@/components/competitors/competitor-card";
import { LiveSearchResults } from "@/components/search/live-search-results";
import { Card } from "@/components/ui/card";
import {
  getCompetitors,
  getSettledValue,
  toCompetitorCards,
  toSearchSuggestions,
} from "@/lib/backend";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const query = params.q?.trim() ?? "";

  const [competitorsResult] = await Promise.allSettled([getCompetitors()]);

  const competitors = toCompetitorCards(getSettledValue(competitorsResult, []));
  const suggestions = toSearchSuggestions(getSettledValue(competitorsResult, []));

  return (
    <div className="space-y-6">
      <SearchBar defaultValue={query} suggestions={suggestions} />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card className="p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Search intelligence</p>
          <h1 className="mt-2 text-3xl font-semibold">Search companies and markets</h1>
          <div className="mt-5 space-y-3">
            {suggestions.map((item) => (
              <div key={item.name} className="rounded-2xl border border-white/6 bg-card/[0.03] px-4 py-4">
                <p className="font-medium text-white">{item.name}</p>
                <p className="mt-1 text-sm text-slate-400">{item.category}</p>
              </div>
            ))}
          </div>
        </Card>
        <div className="space-y-6">
          <LiveSearchResults query={query} />
          {competitors.map((item) => (
            <CompetitorCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
