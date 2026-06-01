import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { HeroAmbient } from "@/components/motion/HeroAmbient";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  EASE_OUT,
  HOVER_SPRING,
  REVEAL_VIEWPORT,
  clipReveal,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import heroPhoto from "@/assets/home-hero.webp";
import lookedAfterImage from "@/assets/home-looked-after.webp";
import maintenanceImage from "@/assets/home-maintenance.webp";
import moveInImage from "@/assets/home-move-in.webp";
import newHerePhoto from "@/assets/home-new-here.webp";

// Local WebP (downloaded from Unsplash, optimized). Sits behind an 80%-opaque,
// blurred overlay, so a softer/smaller source is visually identical.
const HERO_PHOTO = heroPhoto;

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
    image: lookedAfterImage,
    alt: "A well-kept craftsman home with a welcoming front porch",
    body: "We're a family-run team, not a call center. When something comes up — and it always does — you know exactly who to call and what the plan is. Communication is open, friendly, and quick, because the people answering the phone are the same people who care for your home.",
  },
  {
    title: "Maintenance Done Right",
    image: maintenanceImage,
    alt: "A maintenance team member at work inside a home",
    body: "Every home is unique, and we treat it that way. Our in-house team handles requests promptly, with photos and updates as work progresses. Because we don't profit from maintenance markups, repairs stay fair and transparent — focused on keeping your home comfortable.",
  },
  {
    title: "Move-In You Can Look Forward To",
    image: moveInImage,
    alt: "A hand offering house keys at an open front door",
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

const CRM_URL = "#"; // TODO: replace with CRM intake endpoint

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Tell us a little about what you're looking for").max(1000),
});
type InquiryValues = z.infer<typeof inquirySchema>;

const cardBase = "rounded-2xl border border-border/60 bg-card text-card-foreground shadow-sm";

/* Hero headline — lines rise in sequence on load. */
const HEADLINE: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const HEADLINE_LINE: Variants = {
  hidden: { opacity: 0, y: "0.55em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

/* Service icon — scales in with its card, springs on card hover. */
const ICON: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE_OUT } },
  hover: { scale: 1.14, rotate: -6, transition: HOVER_SPRING },
};

/* One alternating image/text row. Owns its own scroll for image parallax. */
function PillarBlock({ pillar, flip }: { pillar: (typeof PILLARS)[number]; flip: boolean }) {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const drift = reduced ? 0 : isMobile ? 10 : 20;
  const imageY = useTransform(scrollYProgress, [0, 1], [drift, -drift]);

  return (
    <motion.div
      ref={ref}
      variants={reduced ? undefined : staggerContainer}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "show"}
      viewport={REVEAL_VIEWPORT}
      className={`grid items-center gap-10 md:grid-cols-2 md:gap-14 ${
        flip ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <motion.div
        variants={reduced ? undefined : clipReveal}
        className="overflow-hidden rounded-2xl border border-border/60 shadow-sm"
      >
        <motion.img
          src={pillar.image}
          alt={pillar.alt}
          loading="lazy"
          style={reduced ? undefined : { y: imageY, scale: 1.12 }}
          whileHover={reduced ? undefined : { scale: 1.18 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="aspect-[4/3] w-full object-cover"
        />
      </motion.div>
      <motion.div variants={reduced ? undefined : staggerItem}>
        <h3 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
          {pillar.title}
        </h3>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">{pillar.body}</p>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const form = useForm<InquiryValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });
  const onSubmit = (_values: InquiryValues) => {
    // TODO: wire to CRM intake
    window.location.href = CRM_URL;
  };

  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  // Hero background parallax — drifts gently as the hero scrolls away.
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroDrift = reduced ? 0 : isMobile ? 20 : 40;
  const heroBgY = useTransform(heroProgress, [0, 1], [0, heroDrift]);

  return (
    <div>
      {/* ---------- HERO ---------- */}
      <section ref={heroRef} className="relative isolate overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_PHOTO})`, y: heroBgY, scale: 1.2 }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-background/80 backdrop-blur-[2px]" />
        <HeroAmbient />

        <div className="mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center justify-center px-6 py-24 text-center lg:px-10">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
            Family-Run · For Our Residents
          </p>
          {reduced ? (
            <h1 className="mt-6 font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Looking for a Home
              <br />
              That Feels Cared For?
            </h1>
          ) : (
            <motion.h1
              variants={HEADLINE}
              initial="hidden"
              animate="show"
              className="mt-6 font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl"
            >
              <motion.span variants={HEADLINE_LINE} className="block">
                Looking for a Home
              </motion.span>
              <motion.span variants={HEADLINE_LINE} className="block">
                That Feels Cared For?
              </motion.span>
            </motion.h1>
          )}
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            Miedema is a family-owned residential community guided by stewardship, communication,
            and craft — caring for every home, and every resident, as if they were our own.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton>
              <Button asChild size="lg" className="uppercase tracking-[0.18em] text-xs">
                <Link to="/properties">View Available Homes</Link>
              </Button>
            </MagneticButton>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="uppercase tracking-[0.18em] text-xs"
            >
              <Link to="/properties">Book a Showing</Link>
            </Button>
          </div>
        </div>

        {/* Quick links — overlap onto next section */}
        <StaggerGrid className="relative mx-auto -mt-12 grid max-w-6xl gap-5 px-4 pb-4 sm:px-6 md:grid-cols-3 lg:px-10">
          {QUICK_LINKS.map((q) => (
            <StaggerItem key={q.title}>
              <motion.div whileHover={{ y: -3 }} transition={HOVER_SPRING}>
                {q.external ? (
                  <a
                    href={q.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${cardBase} group flex h-full items-start justify-between gap-4 p-7`}
                  >
                    <div>
                      <h3 className="font-serif text-2xl font-semibold text-foreground">
                        {q.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{q.body}</p>
                    </div>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-45">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </a>
                ) : (
                  <Link
                    to={q.to}
                    className={`${cardBase} group flex h-full items-start justify-between gap-4 p-7`}
                  >
                    <div>
                      <h3 className="font-serif text-2xl font-semibold text-foreground">
                        {q.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{q.body}</p>
                    </div>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-45">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </Link>
                )}
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* ---------- DIFFERENTIATORS ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
            What it's like to live here
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            More than a rental. A place that's looked after.
          </h2>
        </Reveal>

        <div className="mt-16 space-y-20">
          {PILLARS.map((p, i) => (
            <PillarBlock key={p.title} pillar={p} flip={i % 2 === 1} />
          ))}
        </div>
      </section>

      {/* ---------- SERVICES GRID ---------- */}
      <section className="border-y border-border/60 bg-muted/40">
        <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
              For our residents
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              The little things behind a well-kept home.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground">
              We don&apos;t have a sales team — we&apos;re just a family that loves what we do and
              the neighbors we get to do it with.
            </p>
            <div className="mt-7">
              <Button asChild size="lg" className="uppercase tracking-[0.18em] text-xs">
                <Link to="/properties">Browse Available Homes</Link>
              </Button>
            </div>
          </Reveal>

          <StaggerGrid className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <StaggerItem key={s.title}>
                <motion.article
                  whileHover="hover"
                  variants={{ hover: { y: -3 } }}
                  transition={HOVER_SPRING}
                  className={`${cardBase} h-full p-7`}
                >
                  <motion.span variants={ICON} className="inline-block text-accent">
                    <s.icon className="size-7" strokeWidth={1.5} />
                  </motion.span>
                  <h3 className="mt-5 font-serif text-2xl font-semibold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </motion.article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ---------- SHOWING CTA ---------- */}
      <section className="bg-sidebar text-sidebar-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-sidebar-foreground/60">
              We&apos;re here to help
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-sidebar-foreground md:text-5xl">
              See a home you love? Book a personal showing — or just say hi in the chat.
            </h2>
          </Reveal>
          <Reveal
            delay={0.12}
            className="flex flex-col gap-3 self-center rounded-2xl border border-sidebar-border bg-sidebar-accent/40 p-6 sm:p-8"
          >
            <p className="text-sm leading-relaxed text-sidebar-foreground/75">
              Browse our current listings and reserve a time that works for you, or message our
              family team directly.
            </p>
            <Button asChild size="lg" className="mt-2 uppercase tracking-[0.18em] text-xs">
              <Link to="/properties">View Available Homes</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ---------- NEW CLIENT INQUIRY FORM ---------- */}
      <section className="relative isolate overflow-hidden">
        {/* Welcoming front-door photo, washed behind an 80% overlay (hero treatment) */}
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${newHerePhoto})` }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-background/80 backdrop-blur-[2px]" />

        <div className="mx-auto max-w-3xl px-6 py-24 lg:px-10">
          <Reveal className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
              New here?
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Interested? Give us a chat.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Tell us a little about what you're looking for and our family team will reach out
              personally.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
              className={`${cardBase} mt-10 grid gap-5 p-7 sm:p-9`}
            >
              <div className="grid gap-2">
                <Label htmlFor="inq-name">Name</Label>
                <Input
                  id="inq-name"
                  autoComplete="name"
                  maxLength={100}
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="inq-email">Email</Label>
                  <Input
                    id="inq-email"
                    type="email"
                    autoComplete="email"
                    maxLength={255}
                    {...form.register("email")}
                  />
                  {form.formState.errors.email && (
                    <p className="text-xs text-destructive">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="inq-phone">
                    Phone <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Input
                    id="inq-phone"
                    type="tel"
                    autoComplete="tel"
                    maxLength={30}
                    {...form.register("phone")}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="inq-message">What are you looking for?</Label>
                <Textarea
                  id="inq-message"
                  rows={5}
                  maxLength={1000}
                  {...form.register("message")}
                />
                {form.formState.errors.message && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.message.message}
                  </p>
                )}
              </div>

              <MagneticButton className="mt-2 justify-self-start">
                <Button type="submit" size="lg" className="uppercase tracking-[0.18em] text-xs">
                  Send Inquiry <ArrowUpRight className="ml-1 size-4" />
                </Button>
              </MagneticButton>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
