import type { ReportItem } from "@/types";
import { Card } from "@/components/ui/card";

export function ReportCard({ report }: { report: ReportItem }) {
  return (
    <Card className="p-6">
      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{report.category}</p>
      <h3 className="mt-3 text-xl font-semibold">{report.title}</h3>
      <p className="mt-3 text-sm text-slate-300">{report.excerpt}</p>
      <div className="mt-5 flex items-center justify-between text-sm">
        <span className="text-slate-400">{report.updatedAt}</span>
        <span className="text-cyan-100">{report.status}</span>
      </div>
    </Card>
  );
}
