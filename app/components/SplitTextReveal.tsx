"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function SplitTextReveal({ children  } : {children : React.ReactNode}) {
  const ref = useRef(null);

  useEffect(() => {
    let split:any;

    const run = async () => {
      await document.fonts.ready;

      split = SplitText.create(ref.current, {
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
      {children}
    </div>
  );
}