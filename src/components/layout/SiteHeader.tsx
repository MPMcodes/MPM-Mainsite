import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { NAV_ITEMS } from "./nav-items";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const frosted = scrolled || open;

  return (
    <header
      className={`sticky top-0 z-30 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ${
        frosted
          ? "border-b border-border/60 bg-background/65 backdrop-blur-xl backdrop-saturate-150 shadow-[0_1px_0_0_oklch(1_0_0/0.4)_inset,0_8px_24px_-12px_oklch(0.235_0.028_50/0.25)]"
          : "border-b border-transparent bg-transparent backdrop-blur-0"
      }`}
    >
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
        <nav className="border-t border-border/60 bg-background/70 backdrop-blur-xl backdrop-saturate-150">
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
