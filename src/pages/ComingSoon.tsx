export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24 lg:px-10">
      <section className="rounded-2xl border border-border/60 bg-card p-10 text-center text-card-foreground shadow-sm md:p-14">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
          In progress
        </p>
        <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight md:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground md:text-base">
          We&apos;re still hand-finishing this room. Check back soon.
        </p>
      </section>
    </div>
  );
}
