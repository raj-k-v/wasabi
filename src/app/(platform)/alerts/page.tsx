import { AlertsFeed } from "@/components/dashboard/alerts-feed";
import { Card } from "@/components/ui/card";
import { getAlerts, getSettledValue } from "@/lib/backend";

export default async function AlertsPage() {
  const alertsResult = await Promise.allSettled([getAlerts()]);
  const alerts = getSettledValue(alertsResult[0], []);
  const counts = {
    critical: alerts.filter((alert) => alert.severity === "critical").length,
    high: alerts.filter((alert) => alert.severity === "high").length,
    medium: alerts.filter((alert) => alert.severity === "medium").length,
    low: alerts.filter((alert) => alert.severity === "low").length,
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <AlertsFeed />
      <div className="space-y-6">
        <Card className="p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Alert analytics</p>
          <h1 className="mt-2 text-3xl font-semibold">Manage signal urgency</h1>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ["Critical", counts.critical.toString()],
              ["High", counts.high.toString()],
              ["Medium", counts.medium.toString()],
              ["Low", counts.low.toString()],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/6 bg-card/[0.03] p-4">
                <p className="text-sm text-slate-400">{label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Detail drawer preview</p>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Each alert now comes from the backend feed and can be extended with source traces, confidence, and AI follow-up actions.
          </p>
        </Card>
      </div>
    </div>
  );
}
