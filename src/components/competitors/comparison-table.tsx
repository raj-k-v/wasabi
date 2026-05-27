import { Card } from "@/components/ui/card";

const rows = [
  ["Tesla", "Enterprise bundle expanded", "+40%", "72", "2"],
  ["Rivian", "No change", "+24%", "58", "1"],
  ["OpenAI", "Stable", "+31%", "81", "3"],
  ["Anthropic", "Stable", "+18%", "73", "1"],
];

export function ComparisonTable() {
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
              <th className="px-6 py-4 font-medium">Sentiment</th>
              <th className="px-6 py-4 font-medium">Launches</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-t border-white/6 text-slate-200">
                {row.map((cell) => (
                  <td key={cell} className="px-6 py-4">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
