import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ExportButton() {
  return (
    <Button variant="secondary">
      <Download className="mr-2 h-4 w-4" />
      Export PDF
    </Button>
  );
}
