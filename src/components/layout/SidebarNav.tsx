import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { NAV_ITEMS } from "./nav-items";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface Props {
  onNavigate?: () => void;
  layoutIdSuffix?: string;
}

export function SidebarNav({ onNavigate, layoutIdSuffix = "desktop" }: Props) {
  const reduced = useReducedMotion();
  return (
    <nav className="flex flex-col gap-1 px-3">
      {NAV_ITEMS.map((item) =>
        item.external ? (
          <a
            key={item.to}
            href={item.to}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onNavigate}
            className="group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors duration-200 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
          >
            <item.icon className="size-5 shrink-0" />
            <span>{item.label}</span>
          </a>
        ) : (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            onClick={onNavigate}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && !reduced && (
                  <motion.span
                    layoutId={`activeNav-${layoutIdSuffix}`}
                    className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-sidebar-primary"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {isActive && reduced && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-sidebar-primary" />
                )}
                <item.icon className="size-5 shrink-0" />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        )
      )}
    </nav>
  );
}
