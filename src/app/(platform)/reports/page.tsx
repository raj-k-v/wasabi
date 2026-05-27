import { ExportButton } from "@/components/reports/export-button";
import { ReportCard } from "@/components/reports/report-card";
import { ReportViewer } from "@/components/reports/report-viewer";
import { EmptyState } from "@/components/common/empty-state";
import { getReports, getSettledValue, toReportItems } from "@/lib/backend";

export default async function ReportsPage() {
  const reportsResult = await Promise.allSettled([getReports()]);
  const reports = toReportItems(getSettledValue(reportsResult[0], []));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Reports</p>
          <h1 className="mt-2 text-3xl font-semibold">AI-generated market briefs</h1>
        </div>
        <ExportButton />
      </div>
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          {reports.length > 0 ? (
            reports.map((report) => <ReportCard key={report.id} report={report} />)
          ) : (
            <EmptyState
              title="No reports yet"
              description="Create a report from the backend and it will appear here."
            />
          )}
        </div>
        <ReportViewer report={reports[0] ?? null} />
      </div>
    </div>
  );
}
