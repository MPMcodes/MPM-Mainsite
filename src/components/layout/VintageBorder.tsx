/**
 * Crisp vintage frame that hugs the header edges at any width. The double
 * lines are real CSS borders (no stretching) and the corner + edge
 * ornaments are fixed-size SVG sprites absolutely positioned to each
 * corner and edge midpoint, so the flourishes never distort.
 */
export function VintageBorder({
  color = "#6b3a2a",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  // Top-left corner flourish, ~26x26. Other corners reuse via CSS transforms.
  const Corner = ({ transform }: { transform: string }) => (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      className="absolute"
      style={{ transform }}
      aria-hidden="true"
    >
      <g fill="none" stroke={color} strokeWidth="1.1" strokeLinecap="round">
        <path d="M2 26 C 2 12, 12 2, 26 2" />
        <path d="M6 26 C 6 14, 14 6, 26 6" />
        <path d="M10 18 q 0 -4 4 -6" />
        <path d="M18 10 q -4 0 -6 4" />
      </g>
      <g fill={color}>
        <circle cx="11" cy="17" r="1.2" />
        <circle cx="17" cy="11" r="1.2" />
        <circle cx="14" cy="14" r="0.9" />
      </g>
    </svg>
  );

  // Horizontal edge ornament (top/bottom midpoints), ~24x10.
  const FleurH = ({ transform }: { transform: string }) => (
    <svg
      width="26"
      height="12"
      viewBox="0 0 26 12"
      className="absolute"
      style={{ transform }}
      aria-hidden="true"
    >
      <g fill={color} stroke="none">
        <path d="M2 6 q 4 -4 8 0 q -4 4 -8 0 z" />
        <path d="M24 6 q -4 -4 -8 0 q 4 4 8 0 z" />
        <path d="M13 1 q 2 2.5 0 5 q -2 -2.5 0 -5 z" />
        <path d="M13 7 q 2 2 0 4 q -2 -2 0 -4 z" />
        <circle cx="13" cy="6" r="1.4" />
      </g>
    </svg>
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden="true"
    >
      {/* Outer + inner double frame lines as real borders — never stretched. */}
      <div
        className="absolute inset-1 rounded-[3px] border"
        style={{ borderColor: color, borderWidth: 1.25 }}
      />
      <div
        className="absolute inset-[7px] rounded-[2px] border"
        style={{ borderColor: color, borderWidth: 0.75, opacity: 0.85 }}
      />

      {/* Corners anchored to each edge. */}
      <div className="absolute left-0 top-0">
        <Corner transform="none" />
      </div>
      <div className="absolute right-0 top-0">
        <Corner transform="scaleX(-1)" />
      </div>
      <div className="absolute bottom-0 left-0">
        <Corner transform="scaleY(-1)" />
      </div>
      <div className="absolute bottom-0 right-0">
        <Corner transform="scale(-1,-1)" />
      </div>

      {/* Edge midpoint flourishes. */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2">
        <FleurH transform="none" />
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <FleurH transform="scaleY(-1)" />
      </div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2">
        <FleurH transform="rotate(-90deg) translateY(-7px)" />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2">
        <FleurH transform="rotate(90deg) translateY(-7px)" />
      </div>
    </div>
  );
}
