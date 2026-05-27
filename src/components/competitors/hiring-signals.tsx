import { Card } from "@/components/ui/card";
 

export function HiringSignals({ signals }: { signals: string[] }) {
  return (
    <Card className="p-6">
      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Hiring signals</p>
      <h3 className="mt-2 text-xl font-semibold">Talent movement</h3>
      <div className="mt-5 space-y-3">
        {signals.map((signal) => (
          <div key={signal} className="rounded-2xl border border-white/6 bg-white/[0.03] p-4 text-sm text-slate-300">
            {signal}
          </div>
        ))}
      </div>
    </Card>
  );
}
