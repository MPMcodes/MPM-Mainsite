import { Home, Building2, FileText, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  external?: boolean;
}

export const RESIDENT_PORTAL_URL = "https://portal.miedemapropertymanagement.com";

export const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Home", icon: Home },
  { to: "/properties", label: "Properties", icon: Building2 },
  { to: "/journal", label: "Journal", icon: FileText },
  { to: RESIDENT_PORTAL_URL, label: "Residents", icon: Users, external: true },
];
