import logoSrc from "@/assets/miedema-logo.png";

/**
 * Miedema wordmark — transparent, blends into header/footer surface.
 */
export function Logo({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "onDark";
}) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src={logoSrc}
        alt="Miedema Property Management"
        className={`h-16 w-auto object-contain md:h-20 ${
          variant === "onDark" ? "brightness-0 invert opacity-90" : ""
        }`}
      />
    </div>
  );
}
