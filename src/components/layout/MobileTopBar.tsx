import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Logo } from "./Logo";
import { SidebarNav } from "./SidebarNav";
import { ThemeToggle } from "./ThemeToggle";

export function MobileTopBar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/60 bg-background/85 px-4 backdrop-blur-md lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-muted"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </SheetTrigger>
        <SheetContent side="left" className="w-72 border-r-0 bg-sidebar p-0 text-sidebar-foreground">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SheetDescription className="sr-only">Site navigation menu</SheetDescription>
          <div className="px-5 py-6">
            <Logo />
          </div>
          <div className="py-2">
            <SidebarNav onNavigate={() => setOpen(false)} layoutIdSuffix="mobile" />
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex-1 pl-2 pr-3">
        <Logo className="max-w-[180px] mr-auto" />
      </div>

      <ThemeToggle className="text-foreground hover:bg-muted hover:text-foreground" />
    </header>
  );
}
