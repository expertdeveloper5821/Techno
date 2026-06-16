"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function SplitTextReveal({ children  } : {children : React.ReactNode}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip animation entirely if user prefers reduced motion
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    let split: any;

    const run = async () => {
      // Only split the aria-hidden visual copy, not the sr-only accessible text
      const visualEl = ref.current?.querySelector('[data-split-visual]');
      if (!visualEl) return;

      await document.fonts.ready;

      split = SplitText.create(visualEl, {
        type: "lines",
        linesClass: "line",
        mask: "lines",
      });

      gsap.from(split.lines, {
        yPercent: 100,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
      });
    };

    run();

    return () => {
      split?.revert(); // VERY IMPORTANT
    };
  }, []);

  return (
    <div ref={ref} className="split">
      {/* Screen reader reads this full unbroken text */}
      <span className="sr-only">{children}</span>
      {/* GSAP splits this visual copy into masked lines - hidden from screen readers */}
      <span aria-hidden="true" data-split-visual="">{children}</span>
    </div>
  );
}