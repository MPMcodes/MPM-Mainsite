/**
 * Paper / Linen texture wash. Sits behind every route.
 * - Flat warm cream base from the design token.
 * - Tiled SVG noise grain for organic paper feel.
 * - Soft warm tonal overlay to unify everything (Kinfolk / editorial vibe).
 */

// Fine paper grain — small speckles, low alpha.
const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>
  <filter id='n'>
    <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch' seed='4'/>
    <feColorMatrix values='0 0 0 0 0.30  0 0 0 0 0.20  0 0 0 0 0.10  0 0 0 0.35 0'/>
  </filter>
  <rect width='100%' height='100%' filter='url(#n)'/>
</svg>`;

// Long horizontal fiber strands — linen weave.
const FIBER_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>
  <filter id='f'>
    <feTurbulence type='turbulence' baseFrequency='0.008 0.7' numOctaves='2' stitchTiles='stitch' seed='2'/>
    <feColorMatrix values='0 0 0 0 0.34  0 0 0 0 0.22  0 0 0 0 0.12  0 0 0 0.18 0'/>
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

      {/* Linen fiber streaks — very subtle */}
      <div
        aria-hidden
        className="fixed inset-0 -z-20 opacity-50"
        style={{ backgroundImage: FIBER_URL, backgroundRepeat: "repeat", backgroundSize: "400px 400px" }}
      />

      {/* Paper grain speckle */}
      <div
        aria-hidden
        className="fixed inset-0 -z-20 opacity-60"
        style={{ backgroundImage: NOISE_URL, backgroundRepeat: "repeat", backgroundSize: "240px 240px" }}
      />

      {/* Warm tonal vignette — pulls everything into the same Kinfolk warmth */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, oklch(0.94 0.025 78 / 0.55), oklch(0.88 0.03 75 / 0.35) 70%, oklch(0.82 0.035 65 / 0.25))",
        }}
      />
    </>
  );
}
