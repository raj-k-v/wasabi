"use client";

import { useEffect } from "react";

import type { AlertItem, MonitoringEvent } from "@/types";
import { useIntelligenceStore } from "@/store/intelligence-store";

export function IntelligenceHydrator({
  alerts,
  monitoringFeed,
}: {
  alerts: AlertItem[];
  monitoringFeed: MonitoringEvent[];
}) {
  const hydrate = useIntelligenceStore((state) => state.hydrate);

  useEffect(() => {
    hydrate({ alerts, monitoringFeed });
  }, [alerts, hydrate, monitoringFeed]);

  return null;
}
