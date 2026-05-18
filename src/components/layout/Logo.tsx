/**
 * Temporary Miedema wordmark on a cream plate.
 * Swap the inner content for <img src="/logo.png" /> once the logo
 * is uploaded — the plate styling stays the same.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl bg-background/90 px-4 py-3 shadow-sm ${className}`}
    >
      <div className="text-center leading-none">
        <div className="font-serif text-2xl font-semibold italic text-primary">
          Miedema
        </div>
        <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Property Management
        </div>
      </div>
    </div>
  );
}
