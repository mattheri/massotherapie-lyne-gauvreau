import { useState } from "react";

type Coords = { lat: number; lng: number };

const useLocation = () => {
  const [coords, setCoords] = useState<Coords | undefined>(undefined);

  const dispatchLocationEvent = (geo: GeolocationPosition) => {
    const { latitude, longitude } = geo.coords;
    const coords = { lat: latitude, lng: longitude };
    setCoords(coords);
  };

  const dispatchLocationErrorEvent = (error: GeolocationPositionError) => {
    throw new Error(error.message);
  };

  const requestLocation = async () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          dispatchLocationEvent,
          dispatchLocationErrorEvent
        );
      } else {
        throw new Error("Geolocation is not supported by this browser.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    coords,
    requestLocation,
  };
};

export default useLocation;
