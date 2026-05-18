import logoSrc from "@/assets/miedema-logo.png";

/**
 * Miedema wordmark on a cream plate.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl bg-background/90 px-4 py-2 shadow-sm ${className}`}
    >
      <img
        src={logoSrc}
        alt="Miedema Property Management"
        className="h-12 w-auto object-contain"
      />
    </div>
  );
}
