/**
 * Crisp, resolution-independent vintage frame that hugs the header edges
 * regardless of width. Uses non-scaling strokes so the double lines stay
 * the same weight, and fixed-size corner/edge ornaments anchored to each
 * corner and edge midpoint so the flourishes never stretch.
 */
export function VintageBorder({
  color = "#6b3a2a",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  // Corner flourish (top-left orientation). Other corners reuse via rotation/mirror.
  const corner = (
    <g fill="none" stroke={color} strokeWidth={1.25} strokeLinecap="round">
      <path d="M2 22 C 2 10, 10 2, 22 2" />
      <path d="M6 22 C 6 12, 12 6, 22 6" />
      <path d="M10 14 c 0 -3 2 -5 5 -5" />
      <circle cx="10" cy="14" r="1.1" fill={color} stroke="none" />
      <circle cx="15" cy="9" r="1.1" fill={color} stroke="none" />
      <path d="M14 18 c 1.5 0 3 -1.5 3 -3" />
      <path d="M18 14 c 1.5 0 3 -1.5 3 -3" />
    </g>
  );

  // Small fleur ornament for edge midpoints.
  const fleurH = (
    <g fill={color} stroke="none">
      <path d="M-10 0 q 4 -4 8 0 q -4 4 -8 0 z" />
      <path d="M10 0 q -4 -4 -8 0 q 4 4 8 0 z" />
      <circle cx="0" cy="0" r="1.4" />
      <path d="M0 -4 q 2 2 0 4 q -2 -2 0 -4 z" />
    </g>
  );

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Outer + inner double frame lines. Non-scaling strokes keep weight constant. */}
      <rect
        x="4"
        y="4"
        width="calc(100% - 8px)"
        height="calc(100% - 8px)"
        fill="none"
        stroke={color}
        strokeWidth={1.25}
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x="10"
        y="10"
        width="calc(100% - 20px)"
        height="calc(100% - 20px)"
        fill="none"
        stroke={color}
        strokeWidth={0.75}
        vectorEffect="non-scaling-stroke"
      />

      {/* Corner flourishes — fixed pixel size, anchored to each corner. */}
      <g transform="translate(4 4)">{corner}</g>
      <g transform="translate(calc(100% - 4px) 4) scale(-1 1)">{corner}</g>
      <g transform="translate(4 calc(100% - 4px)) scale(1 -1)">{corner}</g>
      <g transform="translate(calc(100% - 4px) calc(100% - 4px)) scale(-1 -1)">
        {corner}
      </g>

      {/* Edge midpoint ornaments. */}
      <g transform="translate(50% 7)">{fleurH}</g>
      <g transform="translate(50% calc(100% - 7px))">{fleurH}</g>
      <g transform="translate(7 50%) rotate(90)">{fleurH}</g>
      <g transform="translate(calc(100% - 7px) 50%) rotate(-90)">{fleurH}</g>
    </svg>
  );
}
