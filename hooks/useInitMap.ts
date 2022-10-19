import { useEffect, useCallback, RefObject } from "react";

declare global {
  interface Window {
    initMap?: () => void;
    google: any;
  }
}

const zoom = 17;
const disableDefaultUI = true;
const zoomControl = false;
const mapTypeControl = false;
const scaleControl = false;
const streetViewControl = false;
const rotateControl = false;
const fullscreenControl = false;

const options = {
  zoom,
  disableDefaultUI,
  zoomControl,
  mapTypeControl,
  scaleControl,
  streetViewControl,
  rotateControl,
  fullscreenControl,
};

const useInitMap = (
  location?: { lat: number; lng: number },
  ref?: RefObject<HTMLElement>
) => {
  const initMap = useCallback(
    (element: HTMLElement) => {
      if (!location) return;

      const center = {
        lat: location.lat,
        lng: location.lng,
      };

      return () => {
        const map = new window.google.maps.Map(element, {
          center,
          ...options,
        });

        new window.google.maps.Marker({
          position: center,
          map,
        });
      };
    },
    [location]
  );

  useEffect(() => {
    if (!ref || !ref.current) return;

    window.initMap = initMap(ref.current);

    return () => {
      delete window.initMap;
    };
  }, [location, ref]);
};

export default useInitMap;
