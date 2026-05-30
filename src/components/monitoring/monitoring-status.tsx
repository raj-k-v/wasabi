import { Card } from "@/components/ui/card";
import type { MonitoringStatusItem } from "@/types";

export function MonitoringStatus({ statuses }: { statuses: MonitoringStatusItem[] }) {
  return (
    <Card className="p-6">
      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Monitoring status</p>
      <h3 className="mt-2 text-xl font-semibold">System posture</h3>
      <div className="mt-5 space-y-3">
        {statuses.map((status) => (
          <div key={status.label} className="flex items-center justify-between rounded-2xl border border-white/6 bg-card/[0.03] px-4 py-3">
            <span className="text-sm text-slate-400">{status.label}</span>
            <span className="text-sm font-medium text-white">{status.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
