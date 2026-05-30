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
    <div className="space-y-10 pb-20">
      {backendDegraded ? (
        <DataStatusBanner message="Platform metrics are currently indexed from cache. Real-time syncing is active." />
      ) : null}

      <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
        {/* Left Column: KPI & Controls - Further increased width for premium look */}
        <div className="w-full space-y-12 lg:w-[520px] lg:shrink-0 lg:border-r lg:border-line lg:pr-10">
          <div className="space-y-3">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Intelligence Brief</h1>
            <p className="text-base font-medium text-muted">Curated market signals indexed for your portfolio.</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-1 w-10 rounded-full bg-teal-500" />
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted/70">Core Performance</h3>
            </div>
            <StatsCards cards={toMetricCards(dashboard.stats)} className="grid-cols-1 gap-5" />
          </div>

          <div className="rounded-2xl border border-line bg-card p-8 shadow-2xl">
            <h3 className="text-sm font-bold text-foreground tracking-wide">Search Portfolio</h3>
            <p className="mt-1 text-xs text-muted/70">Lookup assets, competitors, or analysts.</p>
            <div className="mt-8">
              <SearchBar suggestions={toSearchSuggestions(rawCompetitors)} />
            </div>
          </div>
        </div>


        {/* Right Column: Main Feed & Trends */}
        <div className="flex-1 space-y-12 min-w-0">
          <IntelligencePanel title={panel.title} paragraphs={panel.paragraphs} />
          
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <h2 className="text-2xl font-bold text-foreground">Market Dynamics</h2>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-teal-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Live Stream active</span>
              </div>
            </div>
            <TrendCharts chartSeries={toTrendChartsData(rawAlerts, rawCompetitors)} />
          </div>

          <div className="grid gap-10 xl:grid-cols-[1fr_400px]">
             <div className="space-y-6">
               <h2 className="text-xl font-bold text-foreground">Critical Signals</h2>
               <AlertsFeed />
             </div>
             <div className="space-y-6">
               <h2 className="text-xl font-bold text-foreground">Activity</h2>
               <MonitoringFeed />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

