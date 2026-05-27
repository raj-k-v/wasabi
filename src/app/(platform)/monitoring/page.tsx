import { MonitoringStatus } from "@/components/monitoring/monitoring-status";
import { SignalCard } from "@/components/monitoring/signal-card";
import { WorkflowFeed } from "@/components/monitoring/workflow-feed";
import {
  getAlerts,
  getMonitoringTasks,
  getSettledValue,
  toMonitoringStatus,
  toSignalHighlight,
} from "@/lib/backend";

export default async function MonitoringPage() {
  const [monitoringResult, alertsResult] = await Promise.allSettled([
    getMonitoringTasks(),
    getAlerts(),
  ]);
  const monitoringTasks = getSettledValue(monitoringResult, []);
  const alerts = getSettledValue(alertsResult, []);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <WorkflowFeed />
      <div className="space-y-6">
        <MonitoringStatus statuses={toMonitoringStatus(monitoringTasks, alerts)} />
        <SignalCard signal={toSignalHighlight(null, alerts)} />
      </div>
    </div>
  );
}
