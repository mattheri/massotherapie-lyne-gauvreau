import { useEffect, useRef, useState } from "react";

const rectDefaults = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: 0,
  height: 0,
  x: 0,
  y: 0,
};

interface FakeIntersectionObserverEntry
  extends Pick<
    IntersectionObserverEntry,
    "intersectionRatio" | "isIntersecting"
  > {
  target: null | Element;
  rootBounds: typeof rectDefaults;
  intersectionRect: typeof rectDefaults;
  boundingClientRect: typeof rectDefaults;
}

const useIntersectionObserver = (options: IntersectionObserverInit) => {
  const { root = null, rootMargin = "0px", threshold = 0 } = options || {};
  const ref = useRef();
  const [entry, updateEntry] = useState<
    FakeIntersectionObserverEntry | IntersectionObserverEntry
  >({
    isIntersecting: false,
    intersectionRatio: 0,
    target: null,
    rootBounds: rectDefaults,
    intersectionRect: rectDefaults,
    boundingClientRect: rectDefaults,
  });
  const [node, setNode] = useState(null);
  const [target, setTarget] = useState(null);

  let observer = useRef<IntersectionObserver>(null);

  useEffect(() => {
    let currentObserver = observer.current;

    if (!currentObserver) {
      observer = {
        current: new IntersectionObserver(
          (entries) => {
            entries.forEach(updateEntry);
          },
          {
            root: target || document.body,
            rootMargin,
            threshold,
          }
        ),
      };
    } else {
      currentObserver.disconnect();
    }

    if (node && currentObserver) currentObserver.observe(node);

    return () => {
      currentObserver && currentObserver.disconnect();
    };
  }, [node, target]);

  useEffect(() => {
    if (ref.current) setNode(ref.current);
  }, [ref]);

  return [ref, entry, setTarget];
};

export default useIntersectionObserver;
