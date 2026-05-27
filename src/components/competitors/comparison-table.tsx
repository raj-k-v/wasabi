import { Card } from "@/components/ui/card";
import type { ComparisonRow } from "@/types";

export function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-white/10 px-6 py-5">
        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Comparison table</p>
        <h3 className="mt-2 text-xl font-semibold">Cross-company signal matrix</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/[0.03] text-slate-400">
            <tr>
              <th className="px-6 py-4 font-medium">Company</th>
              <th className="px-6 py-4 font-medium">Pricing</th>
              <th className="px-6 py-4 font-medium">Hiring</th>
              <th className="px-6 py-4 font-medium">Risk</th>
              <th className="px-6 py-4 font-medium">Alerts</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.company} className="border-t border-white/6 text-slate-200">
                <td className="px-6 py-4">{row.company}</td>
                <td className="px-6 py-4">{row.pricing}</td>
                <td className="px-6 py-4">{row.hiring}</td>
                <td className="px-6 py-4">{row.risk}</td>
                <td className="px-6 py-4">{row.launches}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
