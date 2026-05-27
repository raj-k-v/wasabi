"use client";

import { TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ErrorState({
  title = "Something interrupted the signal flow",
  description = "Reconnect the monitoring stream or retry the intelligence snapshot.",
  actionLabel,
  onAction,
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="glass-panel flex min-h-56 flex-col items-center justify-center rounded-[28px] p-8 text-center">
      <div className="mb-4 rounded-full border border-rose-400/20 bg-rose-400/10 p-4">
        <TriangleAlert className="h-6 w-6 text-rose-200" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm">{description}</p>
      {actionLabel && onAction ? (
        <Button variant="secondary" className="mt-5" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
