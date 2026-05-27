"use client";

import { useMemo } from "react";

import { AlertCard } from "@/components/alerts/alert-card";
import { AlertFilters } from "@/components/alerts/alert-filters";
import { Card } from "@/components/ui/card";
import { useIntelligenceStore } from "@/store/intelligence-store";
import { useUIStore } from "@/store/ui-store";

export function AlertsFeed() {
  const { alerts } = useIntelligenceStore();
  const { selectedAlertFilter } = useUIStore();

  const filtered = useMemo(() => {
    if (selectedAlertFilter === "all") return alerts;
    return alerts.filter((alert) => alert.category === selectedAlertFilter);
  }, [alerts, selectedAlertFilter]);

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Alerts feed</p>
          <h3 className="mt-2 text-xl font-semibold">Live intelligence alerts</h3>
        </div>
        <AlertFilters />
      </div>
      <div className="mt-6 space-y-3">
        {filtered.map((alert, index) => (
          <AlertCard key={alert.id} alert={alert} index={index} />
        ))}
      </div>
    </Card>
  );
}
