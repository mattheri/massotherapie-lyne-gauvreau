import { useEffect, useRef, RefObject } from "react";
import { Loader } from "@googlemaps/js-api-loader";

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
  const mounted = useRef(false);

  useEffect(() => {
    const element = ref?.current;

    if (!mounted.current) {
      mounted.current = true;

      if (element && location && process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY) {
        const center = {
          lat: location.lat,
          lng: location.lng,
        };

        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
        });

        loader
          .load()
          .then((google) => {
            const map = new google.maps.Map(element, {
              center,
              ...options,
            });

            new google.maps.Marker({
              position: center,
              map,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }

    return () => {
      mounted.current = false;
    };
  }, [location, ref]);
};

export default useInitMap;
