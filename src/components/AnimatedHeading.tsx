"use client";

import { motion } from "framer-motion";
import { ElementType } from "react";

/**
 * Heading whose lines reveal upward (overflow-hidden mask + translateY 110% -> 0),
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
          className="block overflow-hidden"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "-10%" }}
        >
          <motion.span
            className="block"
            variants={{ hidden: { y: "110%" }, shown: { y: "0%" } }}
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
