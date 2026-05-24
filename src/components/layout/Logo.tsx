import houseSrc from "@/assets/logo-house.png";
import miedemaSrc from "@/assets/logo-miedema.png";
import propertySrc from "@/assets/logo-property.png";
import managementSrc from "@/assets/logo-management.png";

/**
 * Miedema header lockup. Uses the same crisp source images on every
 * breakpoint so the brown ink stays saturated; only the sizing changes.
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
    <div
      className={`flex h-14 w-full items-center justify-center gap-2 px-0 sm:h-20 sm:justify-between sm:gap-3 sm:px-5 ${className}`}
    >
      <img
        src={houseSrc}
        alt=""
        aria-hidden="true"
        className={`h-full w-auto shrink-0 object-contain sm:h-14 ${tint}`}
      />
      <img
        src={miedemaSrc}
        alt="Miedema"
        className={`h-[150%] w-auto max-w-[60%] -my-2 object-contain sm:h-[140%] sm:max-w-[75%] sm:-my-4 ${tint}`}
      />
      <div className="flex shrink-0 flex-col items-end gap-0.5 sm:gap-1">
        <img
          src={propertySrc}
          alt="Property"
          className={`h-2.5 w-auto object-contain sm:h-4 ${tint}`}
        />
        <img
          src={managementSrc}
          alt="Management"
          className={`h-2.5 w-auto object-contain sm:h-4 ${tint}`}
        />
      </div>
      <span className="sr-only">Miedema Property Management</span>
    </div>
  );
}
