"use client";

import { motion } from "framer-motion";
import { ElementType } from "react";

/**
 * Heading whose lines reveal upward (overflow-hidden mask + translateY 135% -> 0),
 * staggered per line. Pass each line as a separate string in `lines`.
 */
export default function AnimatedHeading({
  lines,
  as: Tag = "h2",
  className = "",
  delay = 0,
  accent,
}: {
  lines: string[];
  /** Italic serif word(s) appended to the last line. */
  accent?: string;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        // In-view trigger on the MASK: the moving text starts clipped by overflow-hidden, so observing it never fires.
        <motion.span
          key={line}
          // Padding gives descenders (g, j, p) and tall italic accents room inside the clipping mask;
          // the equal negative margin keeps the heading's layout/line spacing unchanged.
          className="-mb-[0.22em] -mt-[0.1em] block overflow-hidden pb-[0.22em] pt-[0.1em]"
          initial="hidden"
          // h1 sits above the fold: play on mount instead of waiting for an in-view event.
          {...(Tag === "h1"
            ? { animate: "shown" }
            : { whileInView: "shown", viewport: { once: true, margin: "-10%" } })}
        >
          <motion.span
            className="block"
            variants={{ hidden: { y: "135%" }, shown: { y: "0%" } }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
            {accent && i === lines.length - 1 && <span className="accent"> {accent}</span>}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}
