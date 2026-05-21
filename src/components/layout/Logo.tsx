import houseSrc from "@/assets/miedema-house.png";

/**
 * Miedema header lockup — house icon on the far left, "Miedema" wordmark
 * centered, and stacked "Property / Management" pushed to the far right,
 * all sharing a single bordered frame.
 */
export function Logo({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "onDark";
}) {
  const textColor = variant === "onDark" ? "text-sidebar-foreground" : "text-foreground";
  const tint = variant === "onDark" ? "brightness-0 invert opacity-90" : "";

  return (
    <div
      className={`flex h-14 w-full items-center justify-between gap-3 rounded-md border border-border/70 px-3 ${textColor} ${className}`}
    >
      <img
        src={houseSrc}
        alt=""
        aria-hidden="true"
        className={`h-10 w-auto shrink-0 object-contain ${tint}`}
      />
      <span className="flex-1 text-center font-serif text-2xl font-semibold leading-none tracking-wide sm:text-3xl">
        Miedema
      </span>
      <span className="flex shrink-0 flex-col items-end text-right text-[0.65rem] font-medium uppercase leading-tight tracking-[0.2em] sm:text-xs">
        <span>Property</span>
        <span>Management</span>
      </span>
      <span className="sr-only">Miedema Property Management</span>
    </div>
  );
}
