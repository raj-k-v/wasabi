import { Card } from "@/components/ui/card";

const signals = [
  "OpenAI added 31 platform and GTM roles in the last 14 days.",
  "Anthropic expanded reliability engineering and product legal coverage.",
  "Tesla increased applied AI and robotics openings across three regions.",
];

export function HiringSignals() {
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
