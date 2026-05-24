import { Link, NavLink } from "react-router-dom";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { NAV_ITEMS } from "./nav-items";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[oklch(1_0_0/0.5)] bg-[oklch(0.98_0.012_80/0.7)] backdrop-blur-2xl backdrop-saturate-200 shadow-[0_1px_0_0_oklch(1_0_0/0.7)_inset,0_8px_24px_-12px_oklch(0.235_0.028_50/0.3)]">
      <div className="flex items-center gap-2 px-3 pt-2">
        <ThemeToggle />
        <Link to="/" className="flex flex-1 justify-center">
          <Logo />
        </Link>
        <span aria-hidden="true" className="h-10 w-10 shrink-0" />
      </div>

      <nav aria-label="Primary">
        <ul className="flex items-end justify-between gap-0.5 px-2 pb-1.5 pt-1 sm:justify-center sm:gap-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.to} className="min-w-0">
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-0.5 rounded-md px-1.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] transition-colors sm:flex-row sm:gap-1.5 sm:text-xs ${
                    isActive
                      ? "text-accent"
                      : "text-foreground/75 hover:text-accent"
                  }`
                }
              >
                <item.icon className="size-3.5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
