import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sprout, MessageCircle, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";

const PILLARS = [
  {
    icon: Sprout,
    title: "Stewardship",
    body: "We tend each property as if it were our own — patient maintenance, honest reporting, careful choices that hold up over the years.",
  },
  {
    icon: MessageCircle,
    title: "Communication",
    body: "Owners and residents hear from a real person, in plain language, within two business days. No portals shouting at you.",
  },
  {
    icon: Hammer,
    title: "Craft",
    body: "From the trim work to the lease language, we believe the small details are what make a house feel like a home.",
  },
];

const cardBase =
  "rounded-2xl border border-border/60 bg-card text-card-foreground p-8 md:p-10 shadow-sm";

export default function Home() {
  return (
    <div className="space-y-10 lg:space-y-14">
      {/* Hero */}
      <motion.section
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className={`${cardBase} text-center`}
      >
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Boutique Property Management
        </p>
        <h1 className="mt-4 font-serif text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
          A home, well kept.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
          Boutique residential property management for owners and residents
          who care about the details.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/owners">Owner inquiry</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/residents">Resident portal</Link>
          </Button>
        </div>
      </motion.section>

      {/* Pillars */}
      <StaggerGrid className="grid gap-5 md:grid-cols-3">
        {PILLARS.map((p) => (
          <StaggerItem key={p.title}>
            <motion.article
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className={`${cardBase} h-full`}
            >
              <p.icon className="size-7 text-accent" strokeWidth={1.5} />
              <h3 className="mt-5 font-serif text-2xl font-semibold text-foreground">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </motion.article>
          </StaggerItem>
        ))}
      </StaggerGrid>

      {/* Closing quote */}
      <section className={`${cardBase} text-center`}>
        <p className="mx-auto max-w-2xl font-serif text-2xl italic leading-relaxed text-foreground md:text-3xl">
          “A house remembers how it&apos;s cared for. We try to give every one
          of them something worth remembering.”
        </p>
        <p className="mt-5 text-sm uppercase tracking-[0.22em] text-muted-foreground">
          — The Miedema Family
        </p>
      </section>
    </div>
  );
}
