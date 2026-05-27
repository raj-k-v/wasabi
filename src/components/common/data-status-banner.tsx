import { TriangleAlert } from "lucide-react";

import { Card } from "@/components/ui/card";

export function DataStatusBanner({ message }: { message: string }) {
  return (
    <Card className="border-amber-300/20 bg-amber-300/5 p-4">
      <div className="flex items-start gap-3">
        <div className="rounded-full border border-amber-300/20 bg-amber-300/10 p-2">
          <TriangleAlert className="h-4 w-4 text-amber-200" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">Backend data is degraded</p>
          <p className="mt-1 text-sm text-slate-300">{message}</p>
        </div>
      </div>
    </Card>
  );
}
