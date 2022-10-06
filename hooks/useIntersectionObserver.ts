import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

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

type Disconnect = () => void;

const useIntersectionObserver = (
  options?: IntersectionObserverInit
): [
  MutableRefObject<any>,
  FakeIntersectionObserverEntry | IntersectionObserverEntry,
  Disconnect
] => {
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

  let observer = useRef<IntersectionObserver>(null);

  const createNewObserver = () => {
    return new IntersectionObserver(
      (entries) => {
        entries.forEach(updateEntry);
      },
      {
        root: root,
        rootMargin,
        threshold,
      }
    );
  };

  const disconnect = useCallback(() => {
    if (observer.current) observer.current.disconnect();
  }, [observer.current, node]);

  useEffect(() => {
    if (!observer.current) {
      observer = {
        current: createNewObserver(),
      };
    } else {
      observer.current.disconnect();

      observer = {
        current: createNewObserver(),
      };
    }

    if (node && observer.current) observer.current.observe(node);

    return () => {
      observer.current && observer.current.disconnect();
    };
  }, [node]);

  useEffect(() => {
    if (ref.current) setNode(ref.current);
  }, [ref]);

  return [ref, entry, disconnect];
};

export default useIntersectionObserver;
