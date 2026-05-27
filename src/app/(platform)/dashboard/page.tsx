import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import { AlertsFeed } from "@/components/dashboard/alerts-feed";
import { IntelligencePanel } from "@/components/dashboard/intelligence-panel";
import { MonitoringFeed } from "@/components/dashboard/monitoring-feed";
import { SearchBar } from "@/components/dashboard/search-bar";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { TrendCharts } from "@/components/dashboard/trend-chart";
import { CompetitorCard } from "@/components/competitors/competitor-card";
import { DataStatusBanner } from "@/components/common/data-status-banner";
import { EmptyState } from "@/components/common/empty-state";
import {
  getCompetitors,
  getDashboard,
  getAlerts,
  getReports,
  getSettledValue,
  toCompetitorCards,
  toIntelligencePanel,
  toMetricCards,
  toSearchSuggestions,
  toTimelineEvents,
  toTrendChartsData,
} from "@/lib/backend";

export default async function DashboardPage() {
  const [dashboardResult, competitorsResult, reportsResult, alertsResult] = await Promise.allSettled([
    getDashboard(),
    getCompetitors(),
    getReports(),
    getAlerts(),
  ]);

  const dashboard = getSettledValue(dashboardResult, {
    stats: {
      monitored_companies: 0,
      active_alerts: 0,
      signals_detected: 0,
      reports_generated: 0,
    },
    recent_signals: [],
    recent_activity: [],
  });
  const competitors = toCompetitorCards(getSettledValue(competitorsResult, []));
  const reports = getSettledValue(reportsResult, []);
  const rawCompetitors = getSettledValue(competitorsResult, []);
  const rawAlerts = getSettledValue(alertsResult, []);
  const panel = toIntelligencePanel(reports, dashboard);
  const backendDegraded =
    dashboardResult.status === "rejected" ||
    competitorsResult.status === "rejected" ||
    alertsResult.status === "rejected";

  return (
    <div className="space-y-6">
      {backendDegraded ? (
        <DataStatusBanner message="One or more backend requests failed, so some dashboard sections may be showing cached or fallback data." />
      ) : null}
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <SearchBar suggestions={toSearchSuggestions(rawCompetitors)} />
          <StatsCards cards={toMetricCards(dashboard.stats)} />
          <IntelligencePanel title={panel.title} paragraphs={panel.paragraphs} />
        </div>
        <MonitoringFeed />
      </div>
      <TrendCharts chartSeries={toTrendChartsData(rawAlerts, rawCompetitors)} />
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <AlertsFeed />
        <div className="space-y-6">
          {competitors.length > 0 ? (
            competitors.map((item) => <CompetitorCard key={item.id} item={item} />)
          ) : (
            <EmptyState
              title="No competitors yet"
              description="The backend did not return competitor records for the dashboard."
            />
          )}
          <ActivityTimeline timeline={toTimelineEvents(dashboard.recent_activity)} />
        </div>
      </div>
    </div>
  );
}
