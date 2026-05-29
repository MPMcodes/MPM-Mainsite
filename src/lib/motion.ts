import type { Variants, Transition, Viewport } from "framer-motion";

/**
 * Shared motion vocabulary for the MPM editorial animation pass.
 *
 * Single source of truth for variants, easing, and viewport config so every
 * component animates with the same calm, warm feel. Keep offsets small
 * (8–24px), durations short (0.3–0.6s), and easing soft — never bouncy.
 *
 * Every consumer must still gate on useReducedMotion() and degrade to the
 * static final state (see PageTransition / StaggerGrid for the pattern).
 */

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Spring used for hover lifts and pointer-follow — matches existing cards. */
export const HOVER_SPRING: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 24,
};

/** Reveal once, slightly before the element is fully on screen. */
export const REVEAL_VIEWPORT: Viewport = { once: true, margin: "-15% 0px" };

/** Fade + rise. The workhorse reveal. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

/** Plain fade — for elements where vertical motion would feel off. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};

/** Unmask an image upward (used on the pillar photos). */
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  show: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

/** Stagger parent — children animate one after another. */
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

/** Stagger child — pairs with staggerContainer. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
};

export type RevealVariant = "fadeUp" | "fadeIn" | "clipReveal";

export const VARIANTS: Record<RevealVariant, Variants> = {
  fadeUp,
  fadeIn,
  clipReveal,
};
