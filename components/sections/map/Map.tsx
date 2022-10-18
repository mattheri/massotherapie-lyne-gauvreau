import type { SectionComponent } from "../../../types";

import { useRef, useEffect, useCallback, useState } from "react";

import { Section } from "../../common";

import Container from "react-bootstrap/Container";
import Script from "next/script";
import Link from "next/link";

import styles from "./Map.module.scss";

declare global {
  interface Window {
    initMap?: () => void;
    google: any;
  }
}

const Map: SectionComponent = ({ _type, revealInViewport, location }) => {
  const ref = useRef(null);
  const [href, setHref] = useState("#");

  const initMap = useCallback(
    (element: HTMLElement) => {
      const center = {
        lat: location.lat,
        lng: location.lng,
      };

      const zoom = 17;
      const disableDefaultUI = true;
      const zoomControl = false;
      const mapTypeControl = false;
      const scaleControl = false;
      const streetViewControl = false;
      const rotateControl = false;
      const fullscreenControl = false;

      return () => {
        const map = new window.google.maps.Map(element, {
          center,
          zoom,
          disableDefaultUI,
          zoomControl,
          mapTypeControl,
          scaleControl,
          streetViewControl,
          rotateControl,
          fullscreenControl,
        });

        new window.google.maps.Marker({
          position: center,
          map,
        });
      };
    },
    [location]
  );

  const requestLocation: () => Promise<
    GeolocationPosition | PositionErrorCallback
  > = useCallback(() => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }, []);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    window.initMap = initMap(element);
  }, [ref, initMap]);

  useEffect(() => {
    requestLocation().then((position) => {
      if (!("coords" in position)) return;

      const { latitude: lat, longitude: lng } = position.coords;

      setHref(
        `https://www.google.com/maps/dir/${lat},${lng}/${location.lat},${location.lng}`
      );
    });
  }, [location]);

  return (
    <Section
      type={_type}
      revealInViewport={revealInViewport}
      className={styles.root}
      root={{ className: styles.container }}
    >
      <Link href={href}>
        <a className={styles.link} target="_blank" rel="noopener noreferrer">
          <Container className="px-0 h-100" fluid ref={ref}>
            <Script
              src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&callback=initMap`}
            />
          </Container>
        </a>
      </Link>
    </Section>
  );
};

export default Map;
