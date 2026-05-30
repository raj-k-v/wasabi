"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { navItems } from "@/components/layout/nav-config";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

export function MobileSidebar() {
  const pathname = usePathname();
  const { mobileSidebarOpen, toggleMobileSidebar } = useUIStore();

  return (
    <Dialog open={mobileSidebarOpen} onOpenChange={toggleMobileSidebar}>
      <DialogContent className="w-[94vw] p-4 lg:hidden">
        <div className="space-y-2 pt-6">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => toggleMobileSidebar(false)}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition",
                  active ? "bg-card/10 text-white" : "text-slate-300 hover:bg-card/5",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
