import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { NAV_ITEMS } from "./nav-items";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/90 backdrop-blur-md">
      {/* Mobile / tablet: logo banner fills width, menu toggle sits inside its border */}
      <div className="relative lg:hidden">
        <Link to="/" className="block px-3 py-2">
          <Logo className="w-full max-w-none" />
        </Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-foreground hover:bg-muted"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72 border-l-0 bg-sidebar p-0 text-sidebar-foreground">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <SheetDescription className="sr-only">Site navigation menu</SheetDescription>
            <div className="px-5 py-6">
              <Logo variant="onDark" className="justify-start" />
            </div>
            <ul className="px-3 py-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium ${
                        isActive
                          ? "bg-sidebar-accent text-sidebar-primary"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      }`
                    }
                  >
                    <item.icon className="size-4" />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <ThemeToggle />
        </div>
      </div>

      {/* Desktop */}
      <div className="mx-auto hidden h-24 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:flex lg:px-10">
        <Link to="/" className="shrink-0">
          <Logo className="max-w-[240px]" />
        </Link>

        <nav className="flex flex-1 items-center justify-center gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
                  isActive
                    ? "text-accent"
                    : "text-foreground/80 hover:text-accent"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="uppercase tracking-[0.18em] text-xs">
            <Link to="/properties">View Rentals</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
      {/* hidden placeholder to satisfy structural symmetry */}
      <div className="hidden">
        <Sheet open={false}>
          <SheetContent side="right">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <SheetDescription className="sr-only">Site navigation menu</SheetDescription>
              <div className="px-5 py-6">
                <Logo variant="onDark" className="justify-start" />
              </div>
              <ul className="px-3 py-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium ${
                          isActive
                            ? "bg-sidebar-accent text-sidebar-primary"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                        }`
                      }
                    >
                      <item.icon className="size-4" />
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
