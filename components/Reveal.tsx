"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = { children: React.ReactNode; delay?: number; className?: string; y?: number };

/** Fades and lifts its children into view the first time they scroll on screen. */
export default function Reveal({ children, delay = 0, className = "", y = 28 }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
