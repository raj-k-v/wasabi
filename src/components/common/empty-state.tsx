"use client";

import { Inbox } from "lucide-react";

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="glass-panel flex min-h-56 flex-col items-center justify-center rounded-[28px] p-8 text-center">
      <div className="mb-4 rounded-full border border-white/10 bg-white/5 p-4">
        <Inbox className="h-6 w-6 text-slate-300" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm">{description}</p>
    </div>
  );
}
