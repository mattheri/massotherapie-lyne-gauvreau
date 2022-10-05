import { useEffect, useRef } from "react";

const useScrollBodyLock = (isLocked: boolean) => {
  let originalStyle = useRef<string>(null);

  useEffect(() => {
    if (isLocked) {
      document.body.setAttribute("style", "overflow: hidden");
    } else {
      if (originalStyle.current) {
        document.body.setAttribute("style", originalStyle.current);
      } else {
        document.body.removeAttribute("style");
      }
    }
  }, [isLocked]);

  useEffect(() => {
    originalStyle.current ??
      (originalStyle = {
        current: window.getComputedStyle(document.body).overflow,
      });
  }, []);
};

export default useScrollBodyLock;
