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
    <main className="overflow-hidden">
      <section className="relative mx-auto max-w-[1480px] px-4 pb-20 pt-6 sm:px-6 xl:px-8">
        {backendDegraded ? (
          <div className="mb-6">
            <DataStatusBanner message="Live backend preview data is unavailable right now, so this page is showing safe fallback values." />
          </div>
        ) : null}
        <div className="glass-panel flex items-center justify-between rounded-[28px] px-5 py-4">
          <div>
            <p className="text-lg text-white" style={{ fontFamily: "var(--font-display)" }}>SignalOS</p>
          </div>
          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#features">Features</a>
            <a href="#platform">Platform</a>
            <a href="#intelligence">Intelligence</a>
          </div>
          <Link href="/dashboard">
            <Button variant="secondary" size="sm">Enter Platform</Button>
          </Link>
        </div>

        <div className="relative grid gap-10 pb-12 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.22em] text-slate-300">
              <Sparkles className="h-3.5 w-3.5 text-cyan-200" />
              AI-powered web intelligence
            </div>
            <h1 className="max-w-4xl text-5xl leading-none sm:text-6xl lg:text-7xl">
              <span className="gradient-text">Autonomous AI Intelligence</span>
              <br />
              <span className="text-white">For The Live Web</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Monitor competitors, pricing, hiring, and market signals in real time using AI-powered web intelligence.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/dashboard">
                <Button size="lg">Get Started</Button>
              </Link>
              <Button variant="secondary" size="lg">
                Live Demo
              </Button>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {landingStats.map((item) => (
                <div key={item.label} className="glass rounded-[24px] p-4">
                  <p className="text-2xl font-semibold text-white">{item.value}</p>
                  <p className="mt-2 text-sm text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-cyan/20 blur-3xl" />
            <div className="absolute -right-8 bottom-10 h-44 w-44 rounded-full bg-violet/20 blur-3xl" />
            <div className="relative space-y-4">
              <Card className="animate-float p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Live Dashboard Preview</p>
                    <h2 className="mt-2 text-2xl font-semibold">{leadSignal?.summary ?? "Signal convergence detected"}</h2>
                  </div>
                  <BrainCircuit className="h-6 w-6 text-cyan-200" />
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {metricCards.slice(0, 4).map((card) => (
                    <div key={card.label} className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-sm text-slate-400">{card.label}</p>
                      <p className="mt-2 text-2xl font-semibold text-white">{card.value}</p>
                    </div>
                  ))}
                </div>
              </Card>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Monitoring</p>
                  <p className="mt-3 text-lg font-semibold">{dashboard.recent_activity[0]?.message ?? "Live monitoring active"}</p>
                  <p className="mt-2 text-sm text-slate-400">
                    {monitoringTasks[0]
                      ? `${monitoringTasks[0].company} is being checked on a ${monitoringTasks[0].frequency.replaceAll("_", " ")} cadence.`
                      : "Monitoring tasks will appear here once the backend is running."}
                  </p>
                </Card>
                <Card className="p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Hiring trend</p>
                  <p className="mt-3 text-lg font-semibold">{leadReport?.title ?? "AI-generated market brief"}</p>
                  <p className="mt-2 text-sm text-slate-400">{leadReport?.summary ?? "Backend reports will show up here once they are generated."}</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-[1480px] px-4 py-10 sm:px-6 xl:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            {
              icon: Radar,
              title: "Live monitoring",
              description: "Continuously scan pricing pages, hiring portals, release notes, and media surfaces.",
            },
            {
              icon: BrainCircuit,
              title: "AI synthesis",
              description: "Turn fragmented web changes into concise executive intelligence with context.",
            },
            {
              icon: ShieldCheck,
              title: "Enterprise-grade clarity",
              description: "Calm, high-signal views designed for operators, strategists, and leadership teams.",
            },
          ].map((feature) => (
            <Card key={feature.title} className="p-6">
              <feature.icon className="h-6 w-6 text-cyan-200" />
              <h3 className="mt-5 text-2xl font-semibold">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="platform" className="mx-auto max-w-[1480px] px-4 py-14 sm:px-6 xl:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">AI monitoring explained</p>
            <h2 className="mt-3 text-4xl">A command center for the live web</h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-slate-300">
              Agents observe structured and unstructured changes, rank relevance, generate summaries, and route signals into a single premium intelligence workspace.
            </p>
            <div className="mt-8 space-y-3">
              {showcaseMetrics.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Waves className="h-4 w-4 text-cyan-200" />
                    <span className="text-sm text-slate-300">{item.label}</span>
                  </div>
                  <span className="text-sm font-medium text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Dashboard preview</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                <p className="text-sm text-slate-400">AI summary</p>
                <p className="mt-3 text-lg font-semibold text-white">{leadSignal?.company ?? "Autonomous signal stream"}</p>
                <p className="mt-2 text-sm text-slate-400">{leadSignal?.summary ?? "Fresh backend intelligence will appear here."}</p>
              </div>
              <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                <p className="text-sm text-slate-400">Competitor intelligence</p>
                <p className="mt-3 text-lg font-semibold text-white">{leadReport?.title ?? "AI-generated competitor brief"}</p>
                <p className="mt-2 text-sm text-slate-400">{leadReport?.summary ?? "Generate reports from the platform to preview them here."}</p>
              </div>
              <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5 md:col-span-2">
                <p className="text-sm text-slate-400">Live monitoring feed</p>
                <div className="mt-4 space-y-3">
                  {(dashboard.recent_activity.length > 0
                    ? dashboard.recent_activity.map((item) => item.message)
                    : ["Backend online", "Monitoring tasks syncing", "Reports ready", "Signals waiting"]).map((line) => (
                    <div key={line} className="flex items-center gap-3 text-sm text-slate-300">
                      <Waves className="h-4 w-4 animate-pulse-soft text-cyan-200" />
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="intelligence" className="mx-auto max-w-[1480px] px-4 py-14 sm:px-6 xl:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Competitor intelligence showcase</p>
            <h2 className="mt-3 text-3xl font-semibold">Compare markets, not just metrics</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">Unify pricing moves, hiring trends, product launches, and market sentiment into side-by-side intelligence briefs.</p>
          </Card>
          <Card className="p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">CTA</p>
            <h2 className="mt-3 text-3xl font-semibold">Launch your web intelligence layer</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">Designed to feel operationally calm while giving high-leverage teams a live edge on competitive change.</p>
            <div className="mt-6">
              <Link href="/dashboard">
                <Button>
                  Open Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <footer className="mx-auto flex max-w-[1480px] items-center justify-between px-4 py-10 text-sm text-slate-500 sm:px-6 xl:px-8">
        <p>SignalOS by Wasabi Intelligence</p>
        <p>Premium frontend concept for AI web intelligence</p>
      </footer>
    </main>
  );
}
