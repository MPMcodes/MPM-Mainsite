import { useEffect, useMemo, useState } from "react";

/**
 * Falling autumn leaves for the sticky header.
 * Ported from portal.miedemapropertymanagement.com sign-in screen,
 * scaled down for a short, header-sized container.
 *
 * Renders absolutely-positioned, pointer-events-none leaves clipped
 * to its parent (the parent must be position: relative + overflow-hidden).
 * Respects prefers-reduced-motion.
 */

type Depth = "back" | "mid" | "front";

const DEPTH_PRESETS: Record<
  Depth,
  { sizeMul: number; speedMul: number; opacityMul: number; blur: number; z: number }
> = {
  back: { sizeMul: 0.7, speedMul: 1.4, opacityMul: 0.55, blur: 1.2, z: 0 },
  mid: { sizeMul: 1.0, speedMul: 1.0, opacityMul: 0.85, blur: 0, z: 1 },
  front: { sizeMul: 1.25, speedMul: 0.8, opacityMul: 1.0, blur: 0, z: 2 },
};

const COLORS = ["hsl(25, 60%, 45%)", "hsl(35, 70%, 50%)", "hsl(15, 55%, 40%)"];

function pickDepth(): Depth {
  const r = Math.random();
  if (r < 0.35) return "back";
  if (r < 0.8) return "mid";
  return "front";
}

function LeafSvg({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20c4 0 8.68-3.93 12-8a15 15 0 0 0-3-4z"
        fill={color}
      />
    </svg>
  );
}

export function HeaderLeaves({ count = 12 }: { count?: number }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const leaves = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const depth = pickDepth();
      const preset = DEPTH_PRESETS[depth];
      const baseSize = 10 + Math.random() * 10; // 10–20px base
      const baseDuration = 7 + Math.random() * 6; // 7–13s base
      const baseOpacity = 0.5 + Math.random() * 0.4;
      return {
        id: i,
        left: Math.random() * 100,
        size: baseSize * preset.sizeMul,
        delay: Math.random() * baseDuration,
        duration: baseDuration * preset.speedMul,
        swayDuration: 2.5 + Math.random() * 2.5,
        swayDelay: Math.random() * 3,
        rotation: Math.random() * 360,
        opacity: baseOpacity * preset.opacityMul,
        variant: Math.floor(Math.random() * COLORS.length),
        depth,
        blur: preset.blur,
        z: preset.z,
      };
    });
  }, [count]);

  if (reduced) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {leaves.map((l) => (
        <div
          key={l.id}
          className="absolute animate-header-leaf-fall"
          style={{
            left: `${l.left}%`,
            top: "-24px",
            width: l.size,
            height: l.size,
            animationDelay: `${l.delay}s`,
            animationDuration: `${l.duration}s`,
            opacity: l.opacity,
            filter: l.blur > 0 ? `blur(${l.blur}px)` : undefined,
            zIndex: l.z,
            willChange: "transform, opacity",
          }}
        >
          <div
            className="animate-header-leaf-sway"
            style={{
              animationDuration: `${l.swayDuration}s`,
              animationDelay: `${l.swayDelay}s`,
              willChange: "transform",
            }}
          >
            <div style={{ transform: `rotate(${l.rotation}deg)` }}>
              <LeafSvg size={l.size} color={COLORS[l.variant]} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
