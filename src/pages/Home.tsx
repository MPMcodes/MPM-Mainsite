import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Megaphone,
  ShieldCheck,
  Wallet,
  Wrench,
  FolderLock,
  Gavel,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";

const HERO_PHOTO =
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=2400&q=80";

const QUICK_LINKS = [
  {
    to: "/properties",
    title: "Our Rentals",
    body: "Looking for a home to rent? View our listings to get started.",
  },
  {
    to: "/owners",
    title: "Our Services",
    body: "Full-service management or à la carte — tailored to you.",
  },
  {
    to: "/owners",
    title: "List Your Property",
    body: "Get started now and reclaim your peace of mind.",
  },
];

const PILLARS = [
  {
    title: "Our Rental Manager Systems",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    body: "We keep the lines of communication wide open. As a boutique-style firm, we offer the personal touch many enjoy. When an emergency comes up — and they always will — there is peace of mind in knowing exactly who to call and what the plan is. Our paperless systems give owners portal access to documents, photos, and accounting from anywhere.",
  },
  {
    title: "Property Maintenance Standards",
    image:
      "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=1400&q=80",
    body: "Maintenance is the most time-consuming piece of managing a property — and every home is unique. We customize the way we communicate so every owner stays informed, with budgets discussed and before-and-after photos shared. Because we don't profit from maintenance, vendor discounts pass straight through to you.",
  },
  {
    title: "Marketing & Leasing of Properties",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80",
    body: "A professional listing adds value and demand for your rental. We use a wide-angle lens and shoot 40–100 photos per home, syndicating to every major service. Our leasing agent provides weekly updates on inquiries, showings, and applications — placing high-quality residents in well-kept homes.",
  },
];

const SERVICES = [
  {
    icon: Megaphone,
    title: "Marketing",
    body: "Listings that stand out from the crowd and help attract top residents and rent. Some of the lowest local vacancy rates in the industry.",
  },
  {
    icon: ShieldCheck,
    title: "Resident Screening",
    body: "Qualifying standards that protect your investment from damage, lost income, and liability — fair to every applicant under housing law.",
  },
  {
    icon: Wallet,
    title: "Rent Collection",
    body: "Our online payment portal makes it easy for residents to pay on time each month. Faster transfers of funds, fewer late payments.",
  },
  {
    icon: Wrench,
    title: "24/7 Maintenance",
    body: "An in-house supervisor by day and an after-hours team by night — your residents stay comfortable around the clock.",
  },
  {
    icon: FolderLock,
    title: "Management Portal",
    body: "Accounting, tax documents, communications and more in one online system with bank-grade security and redundancy.",
  },
  {
    icon: Gavel,
    title: "Legal Actions & Notices",
    body: "We stay current on landlord and resident law so you're never caught off-guard. We know how to file actions and settle disputes.",
  },
];

const SOLUTIONS = [
  {
    title: "Turn-Key Services",
    body: "Getting your home rent-ready doesn't have to be a hassle. We oversee the process from start to finish using our trusted vendor network.",
  },
  {
    title: "Lease-Only Option",
    body: "Want us to locate a great resident on your terms? We have you covered — even if you don't require ongoing management.",
  },
  {
    title: "HOA Coordination",
    body: "Small word, big headaches. We make sure your property stays in compliance so your neighbors find something else to discuss.",
  },
];

const POSTS = [
  {
    title: "Rental Assistance Programs: How to Keep Residents Housed",
    body: "Rent has never been just about money — it's about offering someone a place where they feel they belong, in a city they're trying to call home.",
  },
  {
    title: "Common Filing Mistakes That Delay Eviction Proceedings",
    body: "Eviction is rarely delayed because a landlord lacks a valid reason. It is delayed due to minor procedural mistakes that compound quickly.",
  },
  {
    title: "How Smart Rent Collection Practices Benefit Landlords",
    body: "In real estate, cash flow plays the lead role — and just like a hit song needs perfect timing, your rental income depends on it.",
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
            Boutique Property Management
          </p>
          <h1 className="mt-6 font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Looking for Quality
            <br />
            Residential Property Management?
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            Miedema is a family-run property management company guided by the
            principles of stewardship, communication, and craft — caring for
            each home as if it were our own.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="uppercase tracking-[0.18em] text-xs">
              <Link to="/owners">Free Rental Analysis</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="uppercase tracking-[0.18em] text-xs">
              <Link to="/properties">View Rentals</Link>
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
              <Link to={q.to} className={`${cardBase} group flex items-start justify-between gap-4 p-7`}>
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-foreground">{q.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{q.body}</p>
                </div>
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- DIFFERENTIATORS ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
            What separates us
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            From other property management companies.
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
              Passionate management staff
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              The services behind a well-kept home.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground">
              We&apos;ll never try to sell you a service — we don&apos;t even have a
              sales team. We just believe in being good neighbors and loving
              what we do.
            </p>
            <div className="mt-7">
              <Button asChild size="lg" className="uppercase tracking-[0.18em] text-xs">
                <Link to="/owners">Free Rental Analysis</Link>
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
                  <Link
                    to="/owners"
                    className="mt-5 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-accent hover:text-primary"
                  >
                    Learn more <ArrowUpRight className="size-3" />
                  </Link>
                </motion.article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ---------- FLEXIBLE SOLUTIONS ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
            Flexible solutions
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Fit to your unique needs.
          </h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {SOLUTIONS.map((s) => (
            <article key={s.title} className={`${cardBase} p-8`}>
              <h3 className="font-serif text-2xl font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- RENTAL ANALYSIS CTA ---------- */}
      <section className="bg-sidebar text-sidebar-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-sidebar-foreground/60">
              No obligation
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-sidebar-foreground md:text-5xl">
              Get a free rental analysis in minutes.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-sidebar-foreground/75">
              Receive a detailed report directly in your inbox so you can make
              an informed decision on how to price your rental property.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-3 self-center rounded-2xl border border-sidebar-border bg-sidebar-accent/40 p-6 sm:p-8"
          >
            <label className="text-xs font-medium uppercase tracking-[0.2em] text-sidebar-foreground/70">
              Property address
            </label>
            <Input
              type="text"
              placeholder="123 Elm Street, Grand Rapids, MI"
              className="border-sidebar-border bg-sidebar text-sidebar-foreground placeholder:text-sidebar-foreground/40"
            />
            <Button type="submit" size="lg" className="mt-2 uppercase tracking-[0.18em] text-xs">
              Submit
            </Button>
          </form>
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
              Notes from the field.
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
