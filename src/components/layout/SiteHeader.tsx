import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { NAV_ITEMS } from "./nav-items";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-b border-[oklch(1_0_0/0.5)] bg-[oklch(0.98_0.012_80/0.55)] backdrop-blur-2xl backdrop-saturate-200 shadow-[0_1px_0_0_oklch(1_0_0/0.7)_inset,0_10px_30px_-12px_oklch(0.235_0.028_50/0.35)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="flex items-center gap-2 px-3 pt-2">
        <ThemeToggle />
        <Link to="/" className="flex flex-1 justify-center">
          <Logo />
        </Link>
        {/* spacer to balance the theme toggle so the logo stays optically centered */}
        <span aria-hidden="true" className="h-10 w-10 shrink-0" />
      </div>

      <nav aria-label="Primary">
        <ul className="flex items-end justify-center gap-1 px-2 pb-1 pt-2 sm:gap-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors sm:text-xs ${
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
