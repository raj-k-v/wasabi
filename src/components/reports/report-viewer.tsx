import { reportMarkdown } from "@/services/mock-data";
import { Card } from "@/components/ui/card";

export function ReportViewer() {
  return (
    <Card className="p-6">
      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Report viewer</p>
      <div className="mt-5 whitespace-pre-wrap rounded-[24px] border border-white/6 bg-white/[0.03] p-5 text-sm leading-7 text-slate-300">
        {reportMarkdown}
      </div>
    </Card>
  );
}
