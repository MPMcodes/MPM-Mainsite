import { Logo } from "./Logo";
import { SidebarNav } from "./SidebarNav";
import { ThemeToggle } from "./ThemeToggle";

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-sidebar text-sidebar-foreground lg:flex">
      <div className="px-5 py-6">
        <Logo />
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        <SidebarNav />
      </div>
      <div className="flex items-center justify-between border-t border-sidebar-border px-5 py-4 text-xs text-sidebar-foreground/60">
        <span>© {new Date().getFullYear()} Miedema</span>
        <ThemeToggle />
      </div>
    </aside>
  );
}
