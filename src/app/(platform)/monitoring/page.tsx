import { MonitoringStatus } from "@/components/monitoring/monitoring-status";
import { SignalCard } from "@/components/monitoring/signal-card";
import { WorkflowFeed } from "@/components/monitoring/workflow-feed";

export default function MonitoringPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <WorkflowFeed />
      <div className="space-y-6">
        <MonitoringStatus />
        <SignalCard />
      </div>
    </div>
  );
}
