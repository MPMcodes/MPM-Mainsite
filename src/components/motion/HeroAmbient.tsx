import { useEffect, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Playful-but-calm interactive backdrop for the hero.
 *
 * Two warm, GPU-only layers:
 *  1. A soft radial "light" that eases toward the pointer — like sun moving
 *     across a well-kept room. Spring-eased so it drifts rather than snaps.
 *  2. A few slow-floating motes for organic life (same idea as HeaderLeaves,
 *     far subtler). Continuous CSS transform animation (see index.css).
 *
 * Decorative only: pointer-events-none, aria-hidden. Disabled on touch and
 * on prefers-reduced-motion (returns null, mirroring HeaderLeaves).
 */

const MOTE_COUNT = 7;
/** px of light travel across the full viewport — intentionally gentle. */
const LIGHT_TRAVEL = 160;

export function HeroAmbient() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const enableCursor = !reduced && !isMobile;

  // Pointer position as a fraction of the viewport (0..1), spring-smoothed,
  // then mapped to a small px offset for the light layer.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.35);
  const sx = useSpring(px, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 60, damping: 20, mass: 0.6 });
  const lightX = useTransform(sx, [0, 1], [-LIGHT_TRAVEL, LIGHT_TRAVEL]);
  const lightY = useTransform(sy, [0, 1], [-LIGHT_TRAVEL, LIGHT_TRAVEL]);

  useEffect(() => {
    if (!enableCursor) return;
    const onMove = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth);
      py.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enableCursor, px, py]);

  const motes = useMemo(
    () =>
      Array.from({ length: MOTE_COUNT }, (_, i) => ({
        id: i,
        left: (i * 13 + 7) % 100,
        top: (i * 29 + 11) % 100,
        size: 6 + ((i * 5) % 10),
        duration: 9 + ((i * 7) % 8),
        delay: (i * 3) % 9,
        opacity: 0.12 + ((i * 4) % 5) / 40,
      })),
    [],
  );

  if (reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Cursor-reactive warm light */}
      {enableCursor && (
        <motion.div
          className="absolute -inset-1/4"
          style={{
            x: lightX,
            y: lightY,
            background:
              "radial-gradient(40% 40% at 50% 50%, oklch(0.575 0.115 55 / 0.30) 0%, oklch(0.665 0.115 60 / 0.14) 35%, transparent 70%)",
            willChange: "transform",
          }}
        />
      )}

      {/* Floating motes */}
      {motes.map((m) => (
        <span
          key={m.id}
          className="absolute rounded-full animate-hero-mote"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: m.size,
            height: m.size,
            opacity: m.opacity,
            background: "radial-gradient(circle, oklch(0.665 0.115 60 / 0.9) 0%, transparent 70%)",
            animationDuration: `${m.duration}s`,
            animationDelay: `${m.delay}s`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
