import {
  Bell,
  ChartColumnBig,
  Gauge,
  Radar,
  Search,
  Settings,
  Users2,
} from "lucide-react";

import type { NavItem } from "@/types";

export const navItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: Gauge },
  { title: "Search", href: "/search", icon: Search },
  { title: "Competitors", href: "/competitors", icon: Users2 },
  { title: "Alerts", href: "/alerts", icon: Bell },
  { title: "Monitoring", href: "/monitoring", icon: Radar },
  { title: "Reports", href: "/reports", icon: ChartColumnBig },
  { title: "Settings", href: "/settings", icon: Settings },
];
