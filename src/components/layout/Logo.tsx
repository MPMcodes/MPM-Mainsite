import houseSrc from "@/assets/logo-house.png";
import miedemaSrc from "@/assets/logo-miedema.png";
import propertySrc from "@/assets/logo-property.png";
import managementSrc from "@/assets/logo-management.png";
import mobileHeaderSrc from "@/assets/logo-header-mobile.png";

/**
 * Miedema header lockup. On mobile, renders the bordered combined header
 * artwork. On sm+ screens, composes the individual logo pieces.
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
      className={`flex h-24 w-full items-center justify-between gap-2 px-2 sm:h-20 sm:px-5 sm:gap-3 ${className}`}
    >
      <img
        src={houseSrc}
        alt=""
        aria-hidden="true"
        className={`h-16 w-auto shrink-0 object-contain sm:h-14 ${tint}`}
      />
      <img
        src={miedemaSrc}
        alt="Miedema"
        className={`h-[180%] w-auto max-w-[70%] -my-6 object-contain sm:h-[140%] sm:max-w-[75%] sm:-my-4 ${tint}`}
      />
      <div className="flex shrink-0 flex-col items-end gap-1">
        <img
          src={propertySrc}
          alt="Property"
          className={`h-3.5 w-auto object-contain sm:h-4 ${tint}`}
        />
        <img
          src={managementSrc}
          alt="Management"
          className={`h-3.5 w-auto object-contain sm:h-4 ${tint}`}
        />
      </div>
      <span className="sr-only">Miedema Property Management</span>
    </div>

  );
}
