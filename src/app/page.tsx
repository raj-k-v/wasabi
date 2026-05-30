import Link from "next/link";
import { ArrowRight, BrainCircuit, Radar, ShieldCheck, Sparkles, Waves } from "lucide-react";

import { DataStatusBanner } from "@/components/common/data-status-banner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getDashboard,
  getMonitoringTasks,
  getReports,
  getSettledValue,
  toLandingStats,
  toMetricCards,
  toShowcaseMetrics,
} from "@/lib/backend";

export default async function LandingPage() {
  const [dashboardResult, monitoringResult, reportsResult] = await Promise.allSettled([
    getDashboard(),
    getMonitoringTasks(),
    getReports(),
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
  const monitoringTasks = getSettledValue(monitoringResult, []);
  const reports = getSettledValue(reportsResult, []);
  const landingStats = toLandingStats(dashboard);
  const metricCards = toMetricCards(dashboard.stats);
  const showcaseMetrics = toShowcaseMetrics(dashboard, monitoringTasks);
  const leadSignal = dashboard.recent_signals[0];
  const leadReport = reports[0];
  const backendDegraded =
    dashboardResult.status === "rejected" ||
    monitoringResult.status === "rejected" ||
    reportsResult.status === "rejected";

  return (
    <main className="min-h-screen bg-background">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">Wasabi</span>
        </div>
        <div className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          <a href="#platform" className="hover:text-foreground">Platform</a>
          <a href="#intelligence" className="hover:text-foreground">Intelligence</a>
          <a href="#teams" className="hover:text-foreground">Teams</a>
        </div>
        <Link href="/dashboard">
          <Button variant="secondary" size="sm">Log In</Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-teal-900/40 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-teal-400">
            Market Intelligence for Enterprise
          </div>
          <h1 className="text-5xl font-bold leading-[1.1] text-foreground md:text-7xl">
            Autonomous web intelligence <br />
            <span className="text-teal-500">for the live market.</span>
          </h1>
          <p className="mt-8 text-lg text-muted leading-relaxed max-w-2xl">
            Monitor pricing, hiring, and strategic market signals in real time. 
            Designed for investors and leadership teams who require a high-signal edge.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="cta-shadow">Open Dashboard</Button>
            </Link>
            <Button variant="secondary" size="lg">Request Access</Button>
          </div>
        </div>

        <div className="mt-24 grid gap-8 sm:grid-cols-3">
          {landingStats.map((item) => (
            <div key={item.label} className="border-l border-line pl-8 py-2">
              <p className="text-4xl font-bold text-foreground">{item.value}</p>
              <p className="mt-2 text-sm font-medium text-muted uppercase tracking-widest">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Section */}
      <section id="platform" className="border-t border-line bg-panel/50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">High-leverage market monitoring.</h2>
              <p className="mt-4 text-muted leading-relaxed">
                Agents observe structured and unstructured changes, rank relevance, and route signals into a single premium intelligence workspace.
              </p>
              <div className="mt-10 space-y-6">
                {[
                  { title: "Live Signal Capture", desc: "Real-time indexing of pricing, talent, and release notes." },
                  { title: "AI Synthesis", desc: "Fragments are unified into concise executive briefs." },
                  { title: "Strategic Clarity", desc: "Calm, high-signal views designed for leadership." }
                ].map((feature) => (
                  <div key={feature.title} className="flex gap-4">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-teal-900/30 text-teal-500">
                      <Waves className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Card className="p-8 shadow-xl border-line">
                <div className="flex items-center justify-between border-b border-line pb-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Preview</p>
                    <h3 className="mt-1 text-lg font-bold text-foreground">Portfolio Update</h3>
                  </div>
                  <BrainCircuit className="h-5 w-5 text-teal-500" />
                </div>
                <div className="mt-6 space-y-4">
                  {metricCards.slice(0, 3).map(card => (
                    <div key={card.label} className="flex items-center justify-between rounded-lg border border-line bg-panel/50 p-4">
                      <span className="text-sm text-muted">{card.label}</span>
                      <span className="font-bold text-foreground">{card.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 border-t border-line pt-12 md:flex-row">
          <p className="text-sm text-muted">© 2026 Wasabi Intelligence. All rights reserved.</p>
          <div className="flex gap-8 text-sm font-medium text-muted">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

