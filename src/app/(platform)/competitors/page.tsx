import { CompetitorCard } from "@/components/competitors/competitor-card";
import { ComparisonTable } from "@/components/competitors/comparison-table";
import { CompetitorTimeline } from "@/components/competitors/competitor-timeline";
import { HiringSignals } from "@/components/competitors/hiring-signals";
import { SearchBar } from "@/components/dashboard/search-bar";
import { competitors } from "@/services/mock-data";

export default function CompetitorsPage() {
  return (
    <div className="space-y-6">
      <SearchBar />
      <div className="grid gap-6 xl:grid-cols-2">
        {competitors.map((item) => (
          <CompetitorCard key={item.id} item={item} />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <ComparisonTable />
        <div className="space-y-6">
          <HiringSignals />
          <CompetitorTimeline />
        </div>
      </div>
    </div>
  );
}
