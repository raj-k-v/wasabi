import { Card } from "@/components/ui/card";
import { timeline } from "@/services/mock-data";

export function ActivityTimeline() {
  return (
    <Card className="p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Activity timeline</p>
        <h3 className="mt-2 text-xl font-semibold">Recent intelligence events</h3>
      </div>
      <div className="mt-6 space-y-5">
        {timeline.map((item) => (
          <div key={item.time} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="h-2.5 w-2.5 rounded-full bg-cyan" />
              <div className="mt-2 h-full w-px bg-white/10" />
            </div>
            <div className="pb-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-white">{item.time}</span>
                <span className="text-sm text-slate-200">{item.title}</span>
              </div>
              <p className="mt-2 text-sm text-slate-400">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
