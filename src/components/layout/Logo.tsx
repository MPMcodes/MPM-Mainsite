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
      className={`flex h-24 w-full items-center justify-between gap-3 px-0 sm:h-20 sm:px-5 sm:gap-3 ${className}`}
    >
      {/* Mobile: single bordered header image */}
      <img
        src={mobileHeaderSrc}
        alt="Miedema Property Management"
        className={`block h-full w-full object-contain sm:hidden ${tint}`}
      />


      {/* sm+ : composed lockup */}
      <img
        src={houseSrc}
        alt=""
        aria-hidden="true"
        className={`hidden h-10 w-auto shrink-0 object-contain sm:block sm:h-14 ${tint}`}
      />
      <img
        src={miedemaSrc}
        alt="Miedema"
        className={`hidden h-[140%] w-auto max-w-[75%] -my-4 object-contain sm:block ${tint}`}
      />
      <div className="hidden shrink-0 flex-col items-end gap-1 sm:flex">
        <img
          src={propertySrc}
          alt="Property"
          className={`h-3 w-auto object-contain sm:h-4 ${tint}`}
        />
        <img
          src={managementSrc}
          alt="Management"
          className={`h-3 w-auto object-contain sm:h-4 ${tint}`}
        />
      </div>
      <span className="sr-only">Miedema Property Management</span>
    </div>
  );
}
