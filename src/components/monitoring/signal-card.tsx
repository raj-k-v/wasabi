import { Sparkles } from "lucide-react";

import { Card } from "@/components/ui/card";

export function SignalCard() {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <div className="rounded-2xl border border-cyan/20 bg-cyan/10 p-3">
          <Sparkles className="h-5 w-5 text-cyan-200" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Signal stream</p>
          <h3 className="mt-2 text-xl font-semibold">High-confidence event</h3>
          <p className="mt-3 text-sm text-slate-300">Detected synchronized pricing copy changes and new sales hiring patterns across two enterprise product surfaces.</p>
        </div>
      </div>
    </Card>
  );
}
