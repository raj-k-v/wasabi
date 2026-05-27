import type { Severity } from "@/types";
import { Badge } from "@/components/ui/badge";

export function SeverityBadge({ severity }: { severity: Severity }) {
  return <Badge variant={severity}>{severity}</Badge>;
}
