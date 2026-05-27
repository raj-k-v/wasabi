import { Card } from "@/components/ui/card";
import type { CompetitorCardItem } from "@/types";

export function CompetitorCard({ item }: { item: CompetitorCardItem }) {
  return (
    <Card className="p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.industry}</p>
      <h3 className="mt-3 text-2xl font-semibold">{item.name}</h3>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <Metric label="Risk" value={item.riskLevel} />
        <Metric label="Signals" value={item.signalsCount.toString()} />
        <Metric label="Website" value={item.website} />
        <Metric label="Last checked" value={item.lastCheckedAt} />
      </div>
      <p className="mt-5 text-sm text-slate-300">{item.insight}</p>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/6 bg-white/[0.03] p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-medium text-white">{value}</p>
    </div>
  );
}
