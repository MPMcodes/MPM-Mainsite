import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowUpRight,
  Bath,
  BedDouble,
  Bell,
  CalendarClock,
  Eye,
  House,
  KeyRound,
  Maximize,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { HeroAmbient } from "@/components/motion/HeroAmbient";
import { AmbientMesh } from "@/components/motion/AmbientMesh";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { HOVER_SPRING } from "@/lib/motion";
import gridPhoto from "@/assets/properties-grid.webp";
import notifyPhoto from "@/assets/properties-notify.webp";

const eyebrow = "text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground";
const cardBase = "rounded-2xl border border-border/60 bg-card text-card-foreground shadow-sm";

const HOME_TYPES = ["Single-family homes", "Townhomes", "1–4 bedrooms", "Pet-friendly options"];

/** Illustrative home categories — NOT live listings. They preview the card
 *  format a real opening will take once homes are added. */
const CATEGORIES = [
  { type: "Single-Family Home", blurb: "Room to spread out, with a yard to call your own." },
  { type: "Townhome", blurb: "Low-maintenance living, close to everything." },
  { type: "Apartment & Condo", blurb: "Bright, easy spaces in walkable spots." },
];

const STEPS = [
  {
    icon: Eye,
    title: "See it first",
    body: "Open homes appear here before they go anywhere else. Check back any time — or let us tell you.",
  },
  {
    icon: CalendarClock,
    title: "Tour in person",
    body: "Book a showing that fits your schedule, on-site or over a quick video walk-through.",
  },
  {
    icon: KeyRound,
    title: "Settle in",
    body: "A clear lease, a friendly walk-through, and keys handed over by someone who knows the home.",
  },
];

const notifySchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  preferences: z.string().trim().max(500).optional().or(z.literal("")),
});
type NotifyValues = z.infer<typeof notifySchema>;

/** A listing card in its empty "awaiting a home" state — same shape a real
 *  opening will use (image · beds/baths/sqft · price · CTA). */
function ListingPreviewCard({
  type,
  blurb,
  onNotify,
}: {
  type: string;
  blurb: string;
  onNotify: () => void;
}) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={HOVER_SPRING}
      className={`${cardBase} group flex h-full flex-col overflow-hidden`}
    >
      {/* Image well — a warm placeholder until a real photo lands here */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.88 0.03 80) 0%, oklch(0.83 0.045 68) 55%, oklch(0.78 0.055 58) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(120% 90% at 80% 0%, oklch(0.93 0.03 82 / 0.6), transparent 60%)",
          }}
        />
        <House
          aria-hidden
          strokeWidth={1}
          className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 text-foreground/15 transition-colors duration-500 group-hover:text-foreground/25"
        />
        <Badge className="absolute left-3 top-3 border-transparent bg-accent text-accent-foreground shadow-sm">
          When available
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-2xl font-semibold text-foreground">{type}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{blurb}</p>

        <div className="mt-5 flex items-center gap-5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <BedDouble className="size-4" strokeWidth={1.5} /> —
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="size-4" strokeWidth={1.5} /> —
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize className="size-4" strokeWidth={1.5} /> — sq ft
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-5">
          <span className="text-sm font-medium text-foreground/70">Pricing soon</span>
          <button
            type="button"
            onClick={onNotify}
            className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            Notify me <ArrowUpRight className="size-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function Properties() {
  const reduced = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<NotifyValues>({
    resolver: zodResolver(notifySchema),
    defaultValues: { name: "", email: "", preferences: "" },
  });

  const scrollToNotify = () => {
    document.getElementById("notify")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  const onSubmit = (_values: NotifyValues) => {
    // TODO: wire to CRM / notify list
    setSubmitted(true);
    toast.success("You're on the list — we'll reach out the moment a home opens up.");
  };

  return (
    <div>
      {/* ---------- HEADER (interactive: cursor light + motes) ---------- */}
      <section className="relative isolate overflow-hidden">
        <HeroAmbient />
        <div className="mx-auto max-w-6xl px-6 pb-10 pt-16 lg:px-10 lg:pt-24">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-border" />
              <span className={eyebrow}>Available Homes</span>
            </div>
            <h1 className="mt-6 max-w-3xl font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Homes worth <em className="font-normal italic text-accent">settling into.</em>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              We&apos;re a small, family-run team looking after a handful of homes in the
              neighborhoods we know best. They don&apos;t open up often — but when they do,
              they&apos;re clean, well-loved, and ready for someone to call home.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-3.5 py-1.5 text-xs font-medium text-foreground/80 shadow-sm">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent/60" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                No homes open right now
              </span>
              <span className="hidden h-4 w-px bg-border sm:block" />
              {HOME_TYPES.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border/60 px-3 py-1.5 text-xs text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- LISTING PREVIEW GRID (washed photo) ---------- */}
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${gridPhoto})` }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-background/80 backdrop-blur-[2px]" />
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
          <Reveal className="max-w-2xl">
            <p className={eyebrow}>What we manage</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              When a home opens, it shows up right here.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              A look at the kinds of homes we care for. The moment one&apos;s available, it&apos;ll
              appear in this spot — with photos, the details that matter, and a way to book a
              showing.
            </p>
          </Reveal>

          <StaggerGrid className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => (
              <StaggerItem key={c.type} className="h-full">
                <ListingPreviewCard type={c.type} blurb={c.blurb} onNotify={scrollToNotify} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ---------- HOW LEASING WORKS (interactive: reactive gradient mesh) ---------- */}
      <section className="relative isolate overflow-hidden border-y border-border/60 bg-muted/40">
        <AmbientMesh />
        <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className={eyebrow}>How leasing works</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              From first look to front door.
            </h2>
          </Reveal>

          <StaggerGrid className="mt-14 grid gap-10 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <StaggerItem key={s.title}>
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-full border border-border/60 bg-card text-accent shadow-sm">
                      <s.icon className="size-5" strokeWidth={1.5} />
                    </span>
                    <span className="font-serif text-lg text-muted-foreground">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 font-serif text-2xl font-semibold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ---------- NOTIFY CAPTURE (washed photo) ---------- */}
      <section id="notify" className="relative isolate scroll-mt-24 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${notifyPhoto})` }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-background/80 backdrop-blur-[2px]" />
        <div className="mx-auto max-w-3xl px-6 py-24 lg:px-10">
          <Reveal className="text-center">
            <p className={eyebrow}>Stay in the loop</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Be the first to know.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Tell us a little about what you&apos;re looking for, and our family team will reach
              out personally the moment a home that fits opens up.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            {submitted ? (
              <div
                className={`${cardBase} mt-10 flex flex-col items-center gap-3 p-10 text-center`}
                role="status"
              >
                <span className="grid size-12 place-items-center rounded-full bg-accent/15 text-accent">
                  <Bell className="size-6" strokeWidth={1.5} />
                </span>
                <h3 className="font-serif text-2xl font-semibold text-foreground">
                  You&apos;re on the list.
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                  We&apos;ll be in touch the moment a home that fits opens up. In the meantime, feel
                  free to reach our team directly any time.
                </p>
              </div>
            ) : (
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate
                className={`${cardBase} mt-10 grid gap-5 p-7 sm:p-9`}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="nt-name">Name</Label>
                    <Input
                      id="nt-name"
                      autoComplete="name"
                      maxLength={100}
                      {...form.register("name")}
                    />
                    {form.formState.errors.name && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="nt-email">Email</Label>
                    <Input
                      id="nt-email"
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
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="nt-pref">
                    What you&apos;re looking for{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Textarea
                    id="nt-pref"
                    rows={4}
                    maxLength={500}
                    placeholder="Bedrooms, part of town, move-in timing, pets…"
                    {...form.register("preferences")}
                  />
                </div>

                <MagneticButton className="mt-1 justify-self-start">
                  <Button type="submit" size="lg" className="uppercase tracking-[0.18em] text-xs">
                    <Bell className="size-4" /> Notify me when a home opens
                  </Button>
                </MagneticButton>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
