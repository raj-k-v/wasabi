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
            <CartesianGrid stroke="#f3f4f6" vertical={false} />
            <XAxis dataKey="name" stroke="#9ca3af" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
            <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 8, boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
            <Area type="monotone" dataKey="value" stroke="#0d9488" fill="#0d9488" fillOpacity={0.05} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="Hiring Activity">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartSeries.hiring}>
            <CartesianGrid stroke="#f3f4f6" vertical={false} />
            <XAxis dataKey="name" stroke="#9ca3af" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
            <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
            <Tooltip cursor={{ fill: "#f9fafb" }} contentStyle={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 8 }} />
            <Bar dataKey="value" fill="#0d9488" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="Market Sentiment">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartSeries.sentiment}>
            <CartesianGrid stroke="#f3f4f6" vertical={false} />
            <XAxis dataKey="name" stroke="#9ca3af" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
            <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 8 }} />
            <Area type="monotone" dataKey="positive" stackId="1" stroke="#0d9488" fill="#0d9488" fillOpacity={0.1} />
            <Area type="monotone" dataKey="neutral" stackId="1" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.05} />
            <Area type="monotone" dataKey="negative" stackId="1" stroke="#e11d48" fill="#e11d48" fillOpacity={0.05} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="Alert Volume">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartSeries.frequency}>
            <CartesianGrid stroke="#f3f4f6" vertical={false} />
            <XAxis dataKey="name" stroke="#9ca3af" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
            <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 8 }} />
            <Area type="monotone" dataKey="value" stroke="#0d9488" fill="#0d9488" fillOpacity={0.05} strokeWidth={2} />
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
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">Last 30 Days</span>
      </div>
      {children}
    </Card>
  );
}

