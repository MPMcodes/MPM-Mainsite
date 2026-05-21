import logoMobileSrc from "@/assets/miedema-logo-mobile.png";

/**
 * Miedema wordmark — transparent, blends into header/footer surface.
 * Uses the mobile banner asset across all viewports for a unified look.
 */
export function Logo({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "onDark";
}) {
  const tint = variant === "onDark" ? "brightness-0 invert opacity-90" : "";
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src={logoMobileSrc}
        alt="Miedema Property Management"
        className={`h-14 w-auto object-contain ${tint}`}
      />
    </div>
  );
}
