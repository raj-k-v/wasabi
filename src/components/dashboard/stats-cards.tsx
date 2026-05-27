"use client";

import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

import { metricCards } from "@/services/mock-data";
import { Card } from "@/components/ui/card";

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metricCards.map((card, index) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 }}
        >
          <Card className="overflow-hidden p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-400">{card.label}</p>
                <p className="mt-3 text-3xl font-semibold text-white">{card.value}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <card.icon className="h-5 w-5 text-cyan-200" />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-emerald-300">{card.trend}</span>
              <div className="h-12 w-24">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={card.points.map((value, valueIndex) => ({ valueIndex, value }))}>
                    <defs>
                      <linearGradient id={`spark-${card.label}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#41d1ff" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#41d1ff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#41d1ff"
                      fill={`url(#spark-${card.label})`}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
