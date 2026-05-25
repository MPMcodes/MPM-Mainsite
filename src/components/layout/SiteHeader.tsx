import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { NAV_ITEMS } from "./nav-items";

/**
 * Frosted drawer header (mobile-first).
 * - Logo lockup stays crisp + saturated in the center.
 * - Theme toggle left, hamburger right; menu opens a drawer below.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Close drawer on route change via Escape, prevent background scroll.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-[oklch(1_0_0/0.5)] bg-[oklch(0.98_0.012_80/0.7)] backdrop-blur-2xl backdrop-saturate-200 shadow-[0_1px_0_0_oklch(1_0_0/0.7)_inset,0_8px_24px_-12px_oklch(0.235_0.028_50/0.3)] relative">
      <div className="flex items-center gap-2 px-3 py-2">
        <ThemeToggle />
        <Link to="/" className="flex flex-1 justify-center" aria-label="Miedema Property Management — Home">
          <Logo />
        </Link>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="primary-nav"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted active:scale-95"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav
          id="primary-nav"
          aria-label="Primary"
          className="absolute left-0 right-0 top-full border-t border-border/50 bg-[oklch(0.98_0.012_80/0.95)] backdrop-blur-2xl backdrop-saturate-200 shadow-[0_8px_24px_-12px_oklch(0.235_0.028_50/0.3)]"
        >
          <ul className="flex flex-col gap-1 px-3 py-3 sm:px-6">

            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                {item.external ? (
                  <a
                    href={item.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium tracking-wide transition-colors text-foreground/80 hover:bg-muted hover:text-accent"
                  >
                    <item.icon className="size-4" />
                    {item.label}
                  </a>
                ) : (
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium tracking-wide transition-colors ${
                        isActive
                          ? "bg-muted text-accent"
                          : "text-foreground/80 hover:bg-muted hover:text-accent"
                      }`
                    }
                  >
                    <item.icon className="size-4" />
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
