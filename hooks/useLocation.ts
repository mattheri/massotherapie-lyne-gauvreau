import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";

const COORDS_KEY = "coords";

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

  const { get, set } = useLocalStorage(COORDS_KEY);

  const getCoords = async () => {
    const coords = await get<Coords>();
    if (coords) return coords;

    const position = await requestLocation();

    if (position instanceof Error) {
      throw position;
    }

    if ("coords" in position) {
      const coords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      set(coords);
      return coords;
    }
  };

  useEffect(() => {
    getCoords().then(setCoords);
  }, []);

  return coords;
};

export default useLocation;
