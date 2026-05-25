import houseSrc from "@/assets/logo-house.png";
import miedemaSrc from "@/assets/logo-miedema.png";
import propertySrc from "@/assets/logo-property.png";
import managementSrc from "@/assets/logo-management.png";
import mobileHeaderSrc from "@/assets/logo-header-mobile.png";

/**
 * Miedema header lockup. Mobile uses a single tight composite that stays
 * legible against the dark hero; sm+ composes the individual pieces.
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
      className={`flex h-14 w-full items-center justify-center gap-3 px-0 sm:h-20 sm:justify-between sm:gap-2 sm:px-2 ${className}`}
    >
      {/* Mobile: tight single-image lockup, fills bar height */}
      <img
        src={mobileHeaderSrc}
        alt="Miedema Property Management"
        className={`block h-full w-auto max-w-full object-contain sm:hidden ${tint}`}
      />

      {/* sm+ : house pinned left */}
      <img
        src={houseSrc}
        alt=""
        aria-hidden="true"
        className={`hidden h-20 w-auto shrink-0 object-contain sm:block ${tint}`}
      />

      {/* sm+ : Miedema centered between house and Property/Management */}
      <img
        src={miedemaSrc}
        alt="Miedema"
        className={`hidden h-[110%] w-auto max-w-[45%] -my-2 mx-auto object-contain sm:block ${tint}`}
      />

      {/* sm+ : Property / Management pinned right */}
      <div className="hidden shrink-0 flex-col items-end gap-1.5 sm:flex">
        <img
          src={propertySrc}
          alt="Property"
          className={`h-7 w-auto object-contain ${tint}`}
        />
        <img
          src={managementSrc}
          alt="Management"
          className={`h-7 w-auto object-contain ${tint}`}
        />
      </div>

      <span className="sr-only">Miedema Property Management</span>
    </div>
  );
}
