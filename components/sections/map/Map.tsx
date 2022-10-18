import type { SectionComponent } from "../../../types";

import { useRef, useEffect } from "react";

import { Section } from "../../common";

import Container from "react-bootstrap/Container";

import styles from "./Map.module.scss";
import Script from "next/script";

declare global {
  interface Window {
    initMap?: () => void;
    google: any;
  }
}

const Map: SectionComponent = ({
  _type,
  revealInViewport,
  location,
  ...rest
}) => {
  const ref = useRef(null);

  const initMap = (element: HTMLElement) => {
    const center = {
      lat: location.lat,
      lng: location.lng,
    };

    const zoom = 17;

    return () => {
      const map = new window.google.maps.Map(element, {
        center,
        zoom,
        disableDefaultUI: true,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
      });

      new window.google.maps.Marker({
        position: center,
        map,
      });
    };
  };

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    window.initMap = initMap(element);
  }, [ref]);

  return (
    <Section
      type={_type}
      revealInViewport={revealInViewport}
      className={styles.root}
      root={{ className: styles.container }}
    >
      <Container className="px-0 h-100" fluid ref={ref}>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&callback=initMap`}
        />
      </Container>
    </Section>
  );
};

export default Map;
