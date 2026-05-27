import { Card } from "@/components/ui/card";
import { timeline } from "@/services/mock-data";

export function CompetitorTimeline() {
  return (
    <Card className="p-6">
      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Timeline</p>
      <h3 className="mt-2 text-xl font-semibold">Competitive intelligence activity</h3>
      <div className="mt-6 space-y-4">
        {timeline.map((item) => (
          <div key={item.time} className="flex gap-4">
            <div className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan" />
            <div>
              <div className="flex items-center gap-3">
                <p className="text-sm font-medium text-white">{item.title}</p>
                <span className="text-xs text-slate-500">{item.time}</span>
              </div>
              <p className="mt-1 text-sm text-slate-400">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
