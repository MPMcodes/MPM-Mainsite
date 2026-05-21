import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { NAV_ITEMS } from "./nav-items";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="flex items-center gap-2 px-3 py-2">
        <ThemeToggle />
        <Link to="/" className="flex flex-1 justify-center">
          <Logo />
        </Link>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-muted"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border/60 bg-background/95 backdrop-blur-md">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-3 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-center lg:gap-2 lg:px-10">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium tracking-wide transition-colors lg:py-2 ${
                      isActive
                        ? "bg-muted text-accent"
                        : "text-foreground/80 hover:bg-muted hover:text-accent"
                    }`
                  }
                >
                  <item.icon className="size-4" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
