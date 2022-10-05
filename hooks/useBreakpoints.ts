import { useEffect, useState } from "react";

const properties: Record<string, string> = {
  ["--media-max-small"]: "--media-max-small",
  ["--media-min-small"]: "--media-min-small",
  ["--media-min-medium"]: "--media-min-medium",
  ["--media-min-large"]: "--media-min-large",
  ["--media-min-x-large"]: "--media-min-x-large",
};

interface Breakpoints extends Record<string, boolean> {
  xSmall: boolean;
  small: boolean;
  medium: boolean;
  large: boolean;
  xLarge: boolean;
}

const useBreakpoints = () => {
  const [breakpoints, setBreakpoints] = useState<Breakpoints>({
    xSmall: true,
    small: false,
    medium: false,
    large: false,
    xLarge: false,
  });

  const updateBreakpoints = () => {
    const breakpointKeys = Object.keys(breakpoints);

    const mediaProperties = Object.keys(properties).reduce(
      (acc: Record<string, string>, key) => {
        const value = window
          .getComputedStyle(document.documentElement)
          .getPropertyValue(properties[key]);
        acc[key] = value;
        return acc;
      },
      {}
    );

    const mediaQueries = Object.keys(mediaProperties).reduce(
      (acc: Breakpoints, key, index) => {
        const value = mediaProperties[key];
        acc[breakpointKeys[index]] = window.matchMedia(`(${value})`).matches;
        return acc;
      },
      {} as Breakpoints
    );

    setBreakpoints(mediaQueries);
  };

  useEffect(() => {
    updateBreakpoints();
    window.addEventListener("resize", updateBreakpoints);
    window.addEventListener("orientationchange", updateBreakpoints);
    window.addEventListener("DOMContentLoaded", updateBreakpoints);
    return () => {
      window.removeEventListener("resize", updateBreakpoints);
      window.removeEventListener("orientationchange", updateBreakpoints);
      window.removeEventListener("DOMContentLoaded", updateBreakpoints);
    };
  }, []);

  return breakpoints;
};

export default useBreakpoints;
