import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em]",
  {
    variants: {
      variant: {
        default: "border-white/10 bg-card/5 text-slate-200",
        critical: "border-rose-400/30 bg-rose-400/10 text-rose-200",
        high: "border-orange-400/30 bg-orange-400/10 text-orange-200",
        medium: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
        low: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
