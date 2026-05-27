"use client";

import { create } from "zustand";

import { alerts, monitoringFeed } from "@/services/mock-data";

interface IntelligenceState {
  notifications: number;
  alerts: typeof alerts;
  monitoringFeed: typeof monitoringFeed;
  dismissNotification: () => void;
}

export const useIntelligenceStore = create<IntelligenceState>((set) => ({
  notifications: 7,
  alerts,
  monitoringFeed,
  dismissNotification: () =>
    set((state) => ({ notifications: Math.max(0, state.notifications - 1) })),
}));
