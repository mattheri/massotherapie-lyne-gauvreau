import type { SectionComponent } from "../../../types";

import { useRef, useEffect } from "react";

import { Section } from "../../common";

import Container from "react-bootstrap/Container";

import useLocation from "../../../hooks/useLocation";
import useInitMap from "../../../hooks/useInitMap";

import styles from "./Map.module.scss";

const Map: SectionComponent = ({ _type, revealInViewport, location }) => {
  const ref = useRef<HTMLDivElement>(null);

  useInitMap(location, ref);

  const { coords, requestLocation } = useLocation();

  useEffect(() => {
    if (!coords) return;

    const { lat, lng } = coords;
    const href = `https://www.google.com/maps/dir/${lat},${lng}/${location.lat},${location.lng}`;

    window.open(href, "_blank", "noopener,noreferrer");
  }, [coords, location]);

  return (
    <Section
      type={_type}
      revealInViewport={revealInViewport}
      className={styles.root}
      root={{ className: styles.container }}
    >
      <article onClick={requestLocation} className={styles.link}>
        <Container className="px-0 h-100" fluid ref={ref}></Container>
      </article>
    </Section>
  );
};

export default Map;
