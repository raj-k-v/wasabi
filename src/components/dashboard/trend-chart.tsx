"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { chartSeries } from "@/services/mock-data";
import { Card } from "@/components/ui/card";

export function TrendCharts() {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <ChartCard title="Pricing Trend Graph">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartSeries.pricing}>
            <defs>
              <linearGradient id="pricingFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#41d1ff" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#41d1ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "#091120", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16 }} />
            <Area type="monotone" dataKey="value" stroke="#41d1ff" fill="url(#pricingFill)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="Hiring Activity Chart">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartSeries.hiring}>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "#091120", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16 }} />
            <Bar dataKey="value" fill="#8b7cff" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="Sentiment Analysis Chart">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartSeries.sentiment}>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "#091120", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16 }} />
            <Area type="monotone" dataKey="positive" stackId="1" stroke="#41d1ff" fill="#41d1ff66" />
            <Area type="monotone" dataKey="neutral" stackId="1" stroke="#cbd5e1" fill="#cbd5e133" />
            <Area type="monotone" dataKey="negative" stackId="1" stroke="#fb7185" fill="#fb718544" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="Alerts Frequency Graph">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartSeries.frequency}>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "#091120", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16 }} />
            <Area type="monotone" dataKey="value" stroke="#7dd3fc" fill="#7dd3fc33" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="p-6">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Trends</p>
        <h3 className="mt-2 text-xl font-semibold">{title}</h3>
      </div>
      {children}
    </Card>
  );
}
