"use client";

import { BellRing, BrainCircuit, Building2, Radar } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

import { Card } from "@/components/ui/card";
import type { MetricCardViewModel } from "@/types";
import { cn } from "@/lib/utils";

const statIconMap = {
  alerts: BellRing,
  companies: Building2,
  signals: Radar,
  reports: BrainCircuit,
};

export function StatsCards({ cards, className }: { cards: MetricCardViewModel[]; className?: string }) {
  return (
    <div className={cn("grid gap-4", className)}>

      {cards.map((card, index) => {
        const Icon = statIconMap[card.iconKey];
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted/60">{card.label}</p>
                <Icon className="h-4 w-4 text-muted/60" />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-foreground">{card.value}</p>
                  <p className={cn("mt-1 text-xs font-medium", card.trend.startsWith("+") ? "text-teal-400" : "text-rose-400")}>
                    {card.trend} <span className="text-muted/60 font-normal ml-0.5">from last month</span>
                  </p>
                </div>
                <div className="h-10 w-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={card.points.map((value, valueIndex) => ({ valueIndex, value }))}>
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#0d9488"
                        fill="#0d9488"
                        fillOpacity={0.05}
                        strokeWidth={1.5}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

