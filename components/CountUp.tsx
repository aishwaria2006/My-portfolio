"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Counts from 0 to `value` the first time it scrolls into view. Accepts "1,600" and "8.9". */
export default function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const target = Number(value.replace(/,/g, ""));
  const decimals = (value.split(".")[1] ?? "").length;
  const [shown, setShown] = useState(reduce ? value : "0");

  useEffect(() => {
    if (!inView || reduce || Number.isNaN(target)) {
      setShown(value);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })),
    });
    return () => controls.stop();
  }, [inView, reduce, target, decimals, value]);

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  );
}
