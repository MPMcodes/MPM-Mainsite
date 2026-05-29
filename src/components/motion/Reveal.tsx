import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { REVEAL_VIEWPORT, VARIANTS, type RevealVariant } from "@/lib/motion";

type RevealTag = "div" | "section" | "article" | "li" | "header";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Which shared variant to use. Defaults to fadeUp. */
  variant?: RevealVariant;
  /** Optional stagger-friendly delay in seconds. */
  delay?: number;
  /** Element to render. Defaults to a div. */
  as?: RevealTag;
}

/**
 * Reveals its children once as they scroll into view, using the shared
 * motion vocabulary. Honors prefers-reduced-motion by rendering the static
 * final state with no animation (same gate as PageTransition / StaggerGrid).
 */
export function Reveal({
  children,
  className,
  variant = "fadeUp",
  delay,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={VARIANTS[variant]}
      initial="hidden"
      whileInView="show"
      viewport={REVEAL_VIEWPORT}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}
