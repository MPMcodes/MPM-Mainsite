import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { REVEAL_VIEWPORT, staggerContainer, staggerItem } from "@/lib/motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function StaggerGrid({ children, className }: Props) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduced ? undefined : staggerContainer}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "show"}
      viewport={REVEAL_VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: Props) {
  const reduced = useReducedMotion();
  return (
    <motion.div className={className} variants={reduced ? undefined : staggerItem}>
      {children}
    </motion.div>
  );
}
