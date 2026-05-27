"use client";

import { Bell, Dot } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useIntelligenceStore } from "@/store/intelligence-store";

export function NotificationsDropdown() {
  const { notifications, dismissNotification, alerts } = useIntelligenceStore();

  return (
    <div className="group relative">
      <Button variant="secondary" size="icon" className="relative">
        <Bell className="h-4 w-4" />
        {notifications > 0 ? (
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-cyan" />
        ) : null}
      </Button>
      <div className="pointer-events-none absolute right-0 top-14 z-30 w-80 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
        <Card className="p-3">
          <div className="mb-3 flex items-center justify-between px-2">
            <p className="text-sm font-medium text-white">Notifications</p>
            <button onClick={dismissNotification} className="text-xs text-slate-400 transition hover:text-white">
              Clear one
            </button>
          </div>
          <div className="space-y-2">
            {alerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className="rounded-2xl border border-white/6 bg-white/[0.03] p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white">{alert.company}</p>
                  <Badge variant={alert.severity}>{alert.severity}</Badge>
                </div>
                <p className="mt-2 text-sm text-slate-300">{alert.title}</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                  <Dot className="h-4 w-4" />
                  {alert.timestamp}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
