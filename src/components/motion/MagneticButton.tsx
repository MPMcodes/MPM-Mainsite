import { useRef, type ReactNode, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Wraps a button/CTA (passed as children) with a small, capped "magnetic"
 * pull toward the pointer — a tactile delight, not a gimmick. Travel is
 * clamped to MAX_PULL px and spring-eased.
 *
 * Disabled on touch and on prefers-reduced-motion: renders children in a
 * plain inline-block span so layout and behavior are unchanged.
 */

const MAX_PULL = 6; // px — keep it subtle; the CTA must stay easy to click.
const STRENGTH = 0.35; // fraction of cursor offset applied before clamping.

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
}

const clamp = (v: number, max: number) => Math.max(-max, Math.min(max, v));

export function MagneticButton({ children, className }: MagneticButtonProps) {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const ref = useRef<HTMLSpanElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 24 });
  const sy = useSpring(y, { stiffness: 300, damping: 24 });

  const enabled = !reduced && !isMobile;

  if (!enabled) {
    return <span className={cn("inline-block", className)}>{children}</span>;
  }

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set(clamp((e.clientX - cx) * STRENGTH, MAX_PULL));
    y.set(clamp((e.clientY - cy) * STRENGTH, MAX_PULL));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}
