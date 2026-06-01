import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Pointer-reactive warm gradient mesh — a second interactive backdrop, sibling
 * to HeroAmbient. Two soft radial blobs ease toward the cursor at opposing
 * depths, giving a section gentle parallax life without a photo.
 *
 * GPU-only (transform), decorative (pointer-events-none, aria-hidden). Disabled
 * on touch and prefers-reduced-motion (returns null) so the section's own base
 * background shows through unchanged — same gate as HeroAmbient.
 */

const TRAVEL = 50; // px of blob drift across the viewport — intentionally gentle.

export function AmbientMesh() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const enabled = !reduced && !isMobile;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 50, damping: 22, mass: 0.7 });
  const sy = useSpring(py, { stiffness: 50, damping: 22, mass: 0.7 });

  // Two blobs drift in opposite directions for a sense of depth.
  const x1 = useTransform(sx, [0, 1], [-TRAVEL, TRAVEL]);
  const y1 = useTransform(sy, [0, 1], [-TRAVEL * 0.7, TRAVEL * 0.7]);
  const x2 = useTransform(sx, [0, 1], [TRAVEL, -TRAVEL]);
  const y2 = useTransform(sy, [0, 1], [TRAVEL * 0.6, -TRAVEL * 0.6]);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth);
      py.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, px, py]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -left-1/4 top-[-30%] h-[80%] w-[70%] rounded-full blur-3xl"
        style={{
          x: x1,
          y: y1,
          background:
            "radial-gradient(circle at 50% 50%, oklch(0.575 0.115 55 / 0.22), transparent 65%)",
          willChange: "transform",
        }}
      />
      <motion.div
        className="absolute -right-1/4 bottom-[-30%] h-[80%] w-[70%] rounded-full blur-3xl"
        style={{
          x: x2,
          y: y2,
          background:
            "radial-gradient(circle at 50% 50%, oklch(0.665 0.115 60 / 0.20), transparent 65%)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
