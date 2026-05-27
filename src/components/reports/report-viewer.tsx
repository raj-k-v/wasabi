import { Card } from "@/components/ui/card";
import type { ReportItem } from "@/types";

export function ReportViewer({ report }: { report: ReportItem | null }) {
  return (
    <Card className="p-6">
      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Report viewer</p>
      <div className="mt-5 whitespace-pre-wrap rounded-[24px] border border-white/6 bg-white/[0.03] p-5 text-sm leading-7 text-slate-300">
        {report
          ? `# ${report.title}\n\n${report.excerpt}\n\nStatus: ${report.status}\nUpdated: ${report.updatedAt}`
          : "No report is available yet. Generate one from the backend to view it here."}
      </div>
    </Card>
  );
}
