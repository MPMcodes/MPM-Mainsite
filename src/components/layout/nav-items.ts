import { Home, Building2, Wrench, FileText, Users, Settings } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Home", icon: Home },
  { to: "/properties", label: "Properties", icon: Building2 },
  { to: "/maintenance", label: "Maintenance", icon: Wrench },
  { to: "/journal", label: "Journal", icon: FileText },
  { to: "/residents", label: "Residents", icon: Users },
  { to: "/owners", label: "Owners", icon: Settings },
];
