import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "./nav-items";

const ITEMS = NAV_ITEMS.slice(0, 5);

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur-md lg:hidden">
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2 py-2">
        {ITEMS.map((item) => (
          <li key={item.to} className="flex-1">
            {item.external ? (
              <a
                href={item.to}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-[11px] font-medium text-muted-foreground transition-all duration-200 hover:text-foreground"
              >
                <item.icon className="size-5" />
                <span>{item.label}</span>
              </a>
            ) : (
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-[11px] font-medium transition-all duration-200 ${
                    isActive
                      ? "-translate-y-0.5 text-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                <item.icon className="size-5" />
                <span>{item.label}</span>
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
