import { useEffect, useState } from "react";

type Coords = { lat: number; lng: number };

const useLocation = () => {
  const [coords, setCoords] = useState<Coords | undefined>(undefined);

  const requestLocation: () => Promise<
    GeolocationPosition | PositionErrorCallback
  > = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const getCoords = async () => {
    const position = await requestLocation();

    if (position instanceof Error) {
      throw position;
    }

    if ("coords" in position) {
      const coords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      return coords;
    }
  };

  useEffect(() => {
    getCoords().then(setCoords);
  }, []);

  return coords;
};

export default useLocation;
