import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Home as HomeIcon,
  Wrench,
  Wallet,
  MessageCircle,
  KeyRound,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import maintenanceStandardsImage from "@/assets/maintenance-standards.png";
import rentalManagerSystemsImage from "@/assets/rental-manager-systems.png";

const HERO_PHOTO =
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=2400&q=80";

const RESIDENT_PORTAL_URL = "https://portal.miedemapropertymanagement.com";

const QUICK_LINKS = [
  {
    to: "/properties",
    title: "Available Homes",
    body: "Browse our current rentals and find the one that feels like yours.",
  },
  {
    to: "/properties",
    title: "Book a Showing",
    body: "Pick a time that works for you — in person or over a video tour.",
  },
  {
    to: RESIDENT_PORTAL_URL,
    title: "Current Residents",
    body: "Pay rent, request maintenance, and reach our team anytime.",
    external: true,
  },
];

const PILLARS = [
  {
    title: "A Home That's Looked After",
    image: rentalManagerSystemsImage,
    body: "We're a family-run team, not a call center. When something comes up — and it always does — you know exactly who to call and what the plan is. Communication is open, friendly, and quick, because the people answering the phone are the same people who care for your home.",
  },
  {
    title: "Maintenance Done Right",
    image: maintenanceStandardsImage,
    body: "Every home is unique, and we treat it that way. Our in-house team handles requests promptly, with photos and updates as work progresses. Because we don't profit from maintenance markups, repairs stay fair and transparent — focused on keeping your home comfortable.",
  },
  {
    title: "Move-In You Can Look Forward To",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80",
    body: "Clear leases, friendly walk-throughs, and a home that's truly ready on day one. We're with you from your first showing through every renewal — making sure settling in feels easy and welcoming.",
  },
];

const SERVICES = [
  {
    icon: HomeIcon,
    title: "Well-Kept Homes",
    body: "Move into a home that's been cleaned, inspected, and cared for — never rushed to market.",
  },
  {
    icon: Wrench,
    title: "24/7 Maintenance",
    body: "An in-house supervisor by day and an after-hours team by night, so you stay comfortable around the clock.",
  },
  {
    icon: Wallet,
    title: "Easy Online Rent",
    body: "A simple online portal makes paying rent quick, secure, and on your schedule.",
  },
  {
    icon: MessageCircle,
    title: "Real People, Real Answers",
    body: "Reach our family team directly — by phone, email, or live chat. No tickets disappearing into the void.",
  },
  {
    icon: KeyRound,
    title: "Smooth Move-In",
    body: "Clear paperwork, a friendly walk-through, and keys handed over by someone who knows the home.",
  },
  {
    icon: Sparkles,
    title: "Long-Term Care",
    body: "We invest in the homes you live in — so renewing feels like settling in deeper, not starting over.",
  },
];

const POSTS = [
  {
    title: "Settling In: A Resident's Guide to Your First Week",
    body: "From utilities to the quirks of an old furnace, here's what to set up first to make a new place feel like home.",
  },
  {
    title: "Rental Assistance Programs: Resources for Residents",
    body: "If life throws a curveball, you're not alone. Here are the programs and steps we walk through with our residents.",
  },
  {
    title: "How to Submit a Maintenance Request That Gets Fixed Fast",
    body: "A few details — and a photo or two — go a long way. Here's exactly what helps our team show up prepared.",
  },
];

const cardBase =
  "rounded-2xl border border-border/60 bg-card text-card-foreground shadow-sm";

export default function Home() {
  return (
    <div>
      {/* ---------- HERO ---------- */}
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_PHOTO})` }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-background/80 backdrop-blur-[2px]" />

        <div className="mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center justify-center px-6 py-24 text-center lg:px-10">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
            Family-Run · For Our Residents
          </p>
          <h1 className="mt-6 font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Looking for a Home
            <br />
            That Feels Cared For?
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            Miedema is a family-owned residential community guided by stewardship,
            communication, and craft — caring for every home, and every resident,
            as if they were our own.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="uppercase tracking-[0.18em] text-xs">
              <Link to="/properties">View Available Homes</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="uppercase tracking-[0.18em] text-xs">
              <Link to="/properties">Book a Showing</Link>
            </Button>
          </div>
        </div>

        {/* Quick links — overlap onto next section */}
        <div className="relative mx-auto -mt-12 grid max-w-6xl gap-5 px-4 pb-4 sm:px-6 md:grid-cols-3 lg:px-10">
          {QUICK_LINKS.map((q) => (
            <motion.div
              key={q.title}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              {q.external ? (
                <a href={q.to} target="_blank" rel="noopener noreferrer" className={`${cardBase} group flex items-start justify-between gap-4 p-7`}>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-foreground">{q.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{q.body}</p>
                  </div>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="size-4" />
                  </span>
                </a>
              ) : (
                <Link to={q.to} className={`${cardBase} group flex items-start justify-between gap-4 p-7`}>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-foreground">{q.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{q.body}</p>
                  </div>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="size-4" />
                  </span>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- DIFFERENTIATORS ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
            What it's like to live here
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            More than a rental. A place that's looked after.
          </h2>
        </div>

        <div className="mt-16 space-y-20">
          {PILLARS.map((p, i) => (
            <div
              key={p.title}
              className={`grid items-center gap-10 md:grid-cols-2 md:gap-14 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="overflow-hidden rounded-2xl border border-border/60 shadow-sm">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div>
                <h3 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- SERVICES GRID ---------- */}
      <section className="border-y border-border/60 bg-muted/40">
        <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
              For our residents
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              The little things behind a well-kept home.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground">
              We don&apos;t have a sales team — we&apos;re just a family that loves
              what we do and the neighbors we get to do it with.
            </p>
            <div className="mt-7">
              <Button asChild size="lg" className="uppercase tracking-[0.18em] text-xs">
                <Link to="/properties">Browse Available Homes</Link>
              </Button>
            </div>
          </div>

          <StaggerGrid className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <StaggerItem key={s.title}>
                <motion.article
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className={`${cardBase} h-full p-7`}
                >
                  <s.icon className="size-7 text-accent" strokeWidth={1.5} />
                  <h3 className="mt-5 font-serif text-2xl font-semibold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </motion.article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ---------- SHOWING CTA ---------- */}
      <section className="bg-sidebar text-sidebar-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-sidebar-foreground/60">
              We&apos;re here to help
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-sidebar-foreground md:text-5xl">
              See a home you love? Book a personal showing — or just say hi in the chat.
            </h2>
          </div>
          <div className="flex flex-col gap-3 self-center rounded-2xl border border-sidebar-border bg-sidebar-accent/40 p-6 sm:p-8">
            <p className="text-sm leading-relaxed text-sidebar-foreground/75">
              Browse our current listings and reserve a time that works for you,
              or message our family team directly.
            </p>
            <Button asChild size="lg" className="mt-2 uppercase tracking-[0.18em] text-xs">
              <Link to="/properties">View Available Homes</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ---------- JOURNAL TEASERS ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
              From the journal
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Notes for our residents.
            </h2>
          </div>
          <Link
            to="/journal"
            className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-accent hover:text-primary"
          >
            All posts <ArrowUpRight className="size-3" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {POSTS.map((post) => (
            <article key={post.title} className={`${cardBase} overflow-hidden`}>
              <div className="aspect-[16/10] bg-muted" />
              <div className="p-7">
                <h3 className="font-serif text-xl font-semibold leading-snug text-foreground">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {post.body}
                </p>
                <Link
                  to="/journal"
                  className="mt-5 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-accent hover:text-primary"
                >
                  Read more <ArrowUpRight className="size-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
