/**
 * Paper / Linen texture wash. Sits behind every route.
 * - Flat warm cream base from the design token.
 * - Tiled SVG noise grain for organic paper feel.
 * - Low-opacity warm overlay to unify tone (Kinfolk / editorial vibe).
 */

// Coarser grain — lower frequency = bigger speckles, more visible.
const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'>
  <filter id='n'>
    <feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch' seed='4'/>
    <feColorMatrix values='0 0 0 0 0.32  0 0 0 0 0.22  0 0 0 0 0.12  0 0 0 0.9 0'/>
  </filter>
  <rect width='100%' height='100%' filter='url(#n)'/>
</svg>`;

// Soft fiber streaks for linen weave feel.
const FIBER_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>
  <filter id='f'>
    <feTurbulence type='turbulence' baseFrequency='0.012 0.9' numOctaves='2' stitchTiles='stitch' seed='2'/>
    <feColorMatrix values='0 0 0 0 0.35  0 0 0 0 0.24  0 0 0 0 0.14  0 0 0 0.5 0'/>
  </filter>
  <rect width='100%' height='100%' filter='url(#f)'/>
</svg>`;

const NOISE_URL = `url("data:image/svg+xml;utf8,${encodeURIComponent(NOISE_SVG)}")`;
const FIBER_URL = `url("data:image/svg+xml;utf8,${encodeURIComponent(FIBER_SVG)}")`;

export function BackgroundWash() {
  return (
    <>
      {/* Flat cream paper base */}
      <div aria-hidden className="fixed inset-0 -z-30 bg-background" />

      {/* Linen fiber streaks */}
      <div
        aria-hidden
        className="fixed inset-0 -z-20 opacity-[0.18]"
        style={{ backgroundImage: FIBER_URL, backgroundRepeat: "repeat", backgroundSize: "400px 400px" }}
      />

      {/* Paper grain speckle */}
      <div
        aria-hidden
        className="fixed inset-0 -z-20 opacity-[0.30]"
        style={{ backgroundImage: NOISE_URL, backgroundRepeat: "repeat", backgroundSize: "240px 240px" }}
      />

      {/* Warm tonal vignette — pulls everything into the same Kinfolk warmth */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.94 0.03 78 / 0.35), transparent 55%), radial-gradient(ellipse at 50% 100%, oklch(0.72 0.045 50 / 0.28), transparent 60%)",
        }}
      />
    </>
  );
}
