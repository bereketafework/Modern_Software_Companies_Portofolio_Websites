"use client";

import { useState, useEffect } from "react";

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-[60] h-1 w-full bg-transparent"
      role="progressbar"
      aria-valuenow={scrollProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Scroll progress"
    >
      <div
        className="h-1 bg-primary transition-all duration-100 ease-linear"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
