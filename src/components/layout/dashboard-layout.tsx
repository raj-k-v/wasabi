import { ReactNode } from "react";

import { CommandPalette } from "@/components/layout/command-palette";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-6 sm:px-6 xl:px-8">
      <Sidebar />
      <MobileSidebar />
      <CommandPalette />
      <main className="min-w-0 flex-1">
        <Navbar />
        <div className="pt-6">{children}</div>
      </main>
    </div>
  );
}
