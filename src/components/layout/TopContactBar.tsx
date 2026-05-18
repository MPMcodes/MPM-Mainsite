import { Mail, Phone, Wrench } from "lucide-react";

export function TopContactBar() {
  return (
    <div className="hidden border-b border-sidebar-border bg-sidebar text-sidebar-foreground md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-6 py-2 text-xs tracking-wide">
        <a href="mailto:hello@miedema.com" className="inline-flex items-center gap-2 hover:text-sidebar-primary">
          <Mail className="size-3.5" /> Email Us
        </a>
        <span className="inline-flex items-center gap-2">
          <Phone className="size-3.5" /> Office: <a href="tel:+16165550144" className="hover:text-sidebar-primary">616.555.0144</a>
        </span>
        <span className="inline-flex items-center gap-2">
          <Wrench className="size-3.5" /> 24/7 Maintenance: <a href="tel:+16165550199" className="hover:text-sidebar-primary">616.555.0199</a>
        </span>
      </div>
    </div>
  );
}
