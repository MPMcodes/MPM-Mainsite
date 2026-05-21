import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { NAV_ITEMS } from "./nav-items";
import houseSrc from "@/assets/miedema-house.jpg";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-4 lg:px-10">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border border-sidebar-border/50 bg-sidebar-accent/20 shadow-md">
            <img
              src={houseSrc}
              alt="Miedema managed residence"
              className="mx-auto h-40 w-auto max-w-full object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-sidebar-foreground/70 leading-relaxed">
            Residential property management for owners and residents
            who care about the details.
          </p>
        </div>


        <div>
          <h4 className="font-serif text-lg text-sidebar-foreground">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-sidebar-foreground/75">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-sidebar-primary">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg text-sidebar-foreground">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-sidebar-foreground/75">
            <li>Office: 616.555.0144</li>
            <li>Maintenance: 616.555.0199</li>
            <li>hello@miedema.com</li>
            <li>Grand Rapids, Michigan</li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg text-sidebar-foreground">Portals</h4>
          <ul className="mt-4 space-y-2 text-sm text-sidebar-foreground/75">
            <li><Link to="/residents" className="hover:text-sidebar-primary">Resident Portal</Link></li>
            <li><Link to="/maintenance" className="hover:text-sidebar-primary">Submit a Request</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-sidebar-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-sidebar-foreground/60 sm:flex-row lg:px-10">
          <span>© {new Date().getFullYear()} Miedema Property Management. All rights reserved.</span>
          <span>A home, well kept.</span>
        </div>
      </div>
    </footer>
  );
}
