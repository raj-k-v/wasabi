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

import { Card } from "@/components/ui/card";
import type { TrendChartsData } from "@/types";
import { cn } from "@/lib/utils";

export function TrendCharts({ chartSeries }: { chartSeries: TrendChartsData }) {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <ChartCard title="Pricing Trends">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartSeries.pricing}>
            <CartesianGrid stroke="#1f2937" vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
            <YAxis stroke="#64748b" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid #1f2937", borderRadius: 8, color: "#f8fafc" }} itemStyle={{ color: "#f8fafc" }} />
            <Area type="monotone" dataKey="value" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.1} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="Hiring Activity">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartSeries.hiring}>
            <CartesianGrid stroke="#1f2937" vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
            <YAxis stroke="#64748b" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
            <Tooltip cursor={{ fill: "#111827" }} contentStyle={{ background: "#0a0a0a", border: "1px solid #1f2937", borderRadius: 8, color: "#f8fafc" }} itemStyle={{ color: "#f8fafc" }} />
            <Bar dataKey="value" fill="#14b8a6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="Market Sentiment">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartSeries.sentiment}>
            <CartesianGrid stroke="#1f2937" vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
            <YAxis stroke="#64748b" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid #1f2937", borderRadius: 8, color: "#f8fafc" }} itemStyle={{ color: "#f8fafc" }} />
            <Area type="monotone" dataKey="positive" stackId="1" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.2} />
            <Area type="monotone" dataKey="neutral" stackId="1" stroke="#64748b" fill="#64748b" fillOpacity={0.1} />
            <Area type="monotone" dataKey="negative" stackId="1" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.1} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="Alert Volume">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartSeries.frequency}>
            <CartesianGrid stroke="#1f2937" vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
            <YAxis stroke="#64748b" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid #1f2937", borderRadius: 8, color: "#f8fafc" }} itemStyle={{ color: "#f8fafc" }} />
            <Area type="monotone" dataKey="value" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.1} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted/60">Last 30 Days</span>
      </div>
      {children}
    </Card>
  );
}

