"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/** Generic fade+rise-in wrapper for non-heading, non-image content (fed by whileInView). */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  curtain = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
  /** Wipe in from the bottom (clip-path) instead of fade+rise; for photo tiles. */
  curtain?: boolean;
}) {
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      className={className}
      initial={curtain ? { clipPath: "inset(18% 0 0 0)", y: 40 } : { opacity: 0, y: 24 }}
      whileInView={curtain ? { clipPath: "inset(0% 0 0 0)", y: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: curtain ? 1.1 : 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
