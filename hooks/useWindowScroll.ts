import { useState, useEffect } from "react";

export type ScrollCallback = (scrollData: {
  scrollY: number;
  scrollDirection: "up" | "down";
}) => void;

interface Options {
  threshold?: number;
  applyThreshold?: "both" | "up" | "down";
}

type UseWindowScrollHook = (
  callback: ScrollCallback,
  options?: Options
) => void;

const useWindowScroll: UseWindowScrollHook = (
  callback: ScrollCallback,
  options = { threshold: 50, applyThreshold: "both" }
) => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");

  const handleScroll = () => {
    const { threshold = 10, applyThreshold } = options;
    const newScrollY = window.scrollY;
    const newScrollDirection = newScrollY > scrollY ? "down" : "up";
    const thresholdApplied =
      applyThreshold === "both" || applyThreshold === newScrollDirection;

    setScrollY(newScrollY);
    setScrollDirection(newScrollDirection);

    if (Math.abs(scrollY - newScrollY) > threshold && thresholdApplied) {
      callback({ scrollY: newScrollY, scrollDirection: newScrollDirection });
    } else if (!thresholdApplied) {
      callback({ scrollY: newScrollY, scrollDirection: newScrollDirection });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY, scrollDirection]);
};

export default useWindowScroll;
