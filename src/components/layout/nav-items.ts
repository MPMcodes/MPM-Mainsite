import { Home, Building2, FileText, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Home", icon: Home },
  { to: "/properties", label: "Properties", icon: Building2 },
  { to: "/journal", label: "Journal", icon: FileText },
  { to: "/residents", label: "Residents", icon: Users },
];
