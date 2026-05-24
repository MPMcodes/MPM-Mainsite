/**
 * Paper / Linen texture wash. Sits behind every route.
 * - Flat warm cream base from the design token.
 * - Tiled SVG noise grain for organic paper feel.
 * - Low-opacity warm overlay to unify tone (Kinfolk / editorial vibe).
 */

// Tiled SVG noise — fractal turbulence, low opacity, warm-toned.
const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'>
  <filter id='n'>
    <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/>
    <feColorMatrix values='0 0 0 0 0.42  0 0 0 0 0.30  0 0 0 0 0.18  0 0 0 0.55 0'/>
  </filter>
  <rect width='100%' height='100%' filter='url(#n)' opacity='0.55'/>
</svg>`;

const NOISE_URL = `url("data:image/svg+xml;utf8,${encodeURIComponent(NOISE_SVG)}")`;

export function BackgroundWash() {
  return (
    <>
      {/* Flat cream paper base */}
      <div aria-hidden className="fixed inset-0 -z-30 bg-background" />

      {/* Tiled noise grain — the linen/paper texture */}
      <div
        aria-hidden
        className="fixed inset-0 -z-20 opacity-[0.22] mix-blend-multiply"
        style={{ backgroundImage: NOISE_URL, backgroundRepeat: "repeat", backgroundSize: "220px 220px" }}
      />

      {/* Warm tonal overlay — pulls everything into the same Kinfolk warmth */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.94 0.03 78 / 0.45), transparent 60%), linear-gradient(180deg, oklch(0.88 0.035 70 / 0.18), oklch(0.78 0.04 55 / 0.22))",
        }}
      />
    </>
  );
}
