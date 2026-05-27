import { cn } from "@/lib/utils";

export function Avatar({
  initials,
  className,
}: {
  initials: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-cyan/30 to-violet/30 text-sm font-semibold text-white",
        className,
      )}
    >
      {initials}
    </div>
  );
}
