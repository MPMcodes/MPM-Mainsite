import houseSrc from "@/assets/logo-house.png";
import miedemaSrc from "@/assets/logo-miedema.png";
import propertySrc from "@/assets/logo-property.png";
import managementSrc from "@/assets/logo-management.png";
import borderSrc from "@/assets/logo-border.jpg";

/**
 * Miedema header lockup composed from the original logo artwork pieces so
 * the typography matches the source: house icon far-left, "Miedema" script
 * centered, and stacked "Property / Management" pushed to the far right.
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
      className={`flex h-16 w-full items-center justify-between gap-3 rounded-md bg-cover bg-center bg-no-repeat px-6 sm:h-20 sm:px-10 ${className}`}
      style={{ backgroundImage: `url(${borderSrc})` }}
    >
      <img
        src={houseSrc}
        alt=""
        aria-hidden="true"
        className={`h-10 w-auto shrink-0 object-contain sm:h-14 ${tint}`}
      />
      <img
        src={miedemaSrc}
        alt="Miedema"
        className={`h-full max-h-full w-auto max-w-[55%] py-1 object-contain ${tint}`}
      />

      <div className="flex shrink-0 flex-col items-end gap-1">
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
