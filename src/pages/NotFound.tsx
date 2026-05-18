import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-lg rounded-2xl border border-border/60 bg-card p-10 text-center text-card-foreground shadow-sm md:p-14">
      <p className="font-serif text-7xl font-semibold text-primary md:text-8xl">
        404
      </p>
      <h1 className="mt-4 font-serif text-2xl font-semibold">
        This page is off the map.
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        The page you&apos;re looking for has moved, or perhaps never existed.
      </p>
      <Button asChild className="mt-7">
        <Link to="/">Return home</Link>
      </Button>
    </section>
  );
}
