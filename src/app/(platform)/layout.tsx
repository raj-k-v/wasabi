import { IntelligenceHydrator } from "@/components/common/intelligence-hydrator";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  getAlerts,
  getCompetitors,
  getMonitoringTasks,
  getSettledValue,
  toAlertItems,
  toMonitoringEvents,
  toSearchSuggestions,
} from "@/lib/backend";

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [alertsResult, monitoringResult, competitorsResult] = await Promise.allSettled([
    getAlerts(),
    getMonitoringTasks(),
    getCompetitors(),
  ]);
  const alerts = toAlertItems(getSettledValue(alertsResult, []));
  const monitoringFeed = toMonitoringEvents(getSettledValue(monitoringResult, []));
  const suggestions = toSearchSuggestions(getSettledValue(competitorsResult, []));

  return (
    <DashboardLayout suggestions={suggestions}>
      <IntelligenceHydrator alerts={alerts} monitoringFeed={monitoringFeed} />
      {children}
    </DashboardLayout>
  );
}
