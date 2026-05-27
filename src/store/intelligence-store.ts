"use client";

import { create } from "zustand";

import type { AlertItem, MonitoringEvent } from "@/types";

interface IntelligenceState {
  notifications: number;
  alerts: AlertItem[];
  monitoringFeed: MonitoringEvent[];
  hydrate: (payload: { alerts: AlertItem[]; monitoringFeed: MonitoringEvent[] }) => void;
  dismissNotification: () => void;
}

export const useIntelligenceStore = create<IntelligenceState>((set) => ({
  notifications: 0,
  alerts: [],
  monitoringFeed: [],
  hydrate: ({ alerts, monitoringFeed }) =>
    set({
      alerts,
      monitoringFeed,
      notifications: alerts.length,
    }),
  dismissNotification: () =>
    set((state) => ({
      notifications: Math.max(0, state.notifications - 1),
      alerts: state.alerts.slice(1),
    })),
}));
