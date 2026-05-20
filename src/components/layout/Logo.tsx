import logoSrc from "@/assets/miedema-logo.png";
import logoMobileSrc from "@/assets/miedema-logo-mobile.png";

/**
 * Miedema wordmark — transparent, blends into header/footer surface.
 * Uses a dedicated mobile asset on small viewports.
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
        className={`h-14 w-auto object-contain md:hidden ${tint}`}
      />
      <img
        src={logoSrc}
        alt="Miedema Property Management"
        className={`hidden h-16 w-auto object-contain md:block md:h-20 ${tint}`}
      />
    </div>
  );
}
