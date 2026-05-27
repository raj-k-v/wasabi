import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import { AlertsFeed } from "@/components/dashboard/alerts-feed";
import { IntelligencePanel } from "@/components/dashboard/intelligence-panel";
import { MonitoringFeed } from "@/components/dashboard/monitoring-feed";
import { SearchBar } from "@/components/dashboard/search-bar";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { TrendCharts } from "@/components/dashboard/trend-chart";
import { CompetitorCard } from "@/components/competitors/competitor-card";
import { competitors } from "@/services/mock-data";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <SearchBar />
          <StatsCards />
          <IntelligencePanel />
        </div>
        <MonitoringFeed />
      </div>
      <TrendCharts />
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <AlertsFeed />
        <div className="space-y-6">
          {competitors.map((item) => (
            <CompetitorCard key={item.id} item={item} />
          ))}
          <ActivityTimeline />
        </div>
      </div>
    </div>
  );
}
