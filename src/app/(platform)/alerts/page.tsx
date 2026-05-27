import { AlertsFeed } from "@/components/dashboard/alerts-feed";
import { Card } from "@/components/ui/card";

export default function AlertsPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <AlertsFeed />
      <div className="space-y-6">
        <Card className="p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Alert analytics</p>
          <h1 className="mt-2 text-3xl font-semibold">Manage signal urgency</h1>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ["Critical", "14"],
              ["High", "39"],
              ["Medium", "58"],
              ["Low", "37"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/6 bg-white/[0.03] p-4">
                <p className="text-sm text-slate-400">{label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Detail drawer preview</p>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Each alert can expand into a source trace, confidence score, AI summary, and recommended follow-up action.
          </p>
        </Card>
      </div>
    </div>
  );
}
