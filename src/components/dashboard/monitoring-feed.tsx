"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock3, Radar, Sparkles } from "lucide-react";

import { Card } from "@/components/ui/card";
import { useIntelligenceStore } from "@/store/intelligence-store";

const iconMap = {
  running: Radar,
  completed: CheckCircle2,
  signal: Sparkles,
  queued: Clock3,
};

export function MonitoringFeed() {
  const { monitoringFeed } = useIntelligenceStore();

  return (
    <Card className="p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Monitoring feed</p>
        <h3 className="mt-2 text-xl font-semibold">Live web activity</h3>
      </div>
      <div className="mt-6 space-y-3">
        {monitoringFeed.map((event, index) => {
          const Icon = iconMap[event.status];
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className="flex items-start gap-4 rounded-2xl border border-white/6 bg-card/[0.03] p-4"
            >
              <div className="rounded-2xl border border-white/10 bg-card/5 p-3">
                <Icon className={`h-4 w-4 ${event.status === "signal" ? "animate-pulse-soft text-cyan-200" : "text-slate-200"}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-medium text-white">{event.title}</p>
                  <span className="text-xs text-slate-400">{event.time}</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{event.detail}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
