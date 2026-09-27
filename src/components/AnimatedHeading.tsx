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
}: {
  lines: string[];
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
