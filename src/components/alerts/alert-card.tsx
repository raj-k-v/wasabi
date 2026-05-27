"use client";

import { motion } from "framer-motion";

import type { AlertItem } from "@/types";
import { SeverityBadge } from "@/components/alerts/severity-badge";
import { Card } from "@/components/ui/card";

export function AlertCard({ alert, index = 0 }: { alert: AlertItem; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="p-4 transition hover:-translate-y-0.5 hover:border-cyan/20">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold text-white">
            {alert.companyMark}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium text-white">{alert.company}</p>
              <SeverityBadge severity={alert.severity} />
              <span className="text-xs text-slate-400">{alert.timestamp}</span>
            </div>
            <p className="mt-2 text-base font-medium text-slate-100">{alert.title}</p>
            <p className="mt-2 text-sm text-slate-400">{alert.summary}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-500">{alert.source}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
