import type { SectionComponent } from "../../../types";

import { useRef, useEffect, useState } from "react";

import { Section } from "../../common";

import Container from "react-bootstrap/Container";
import Link from "next/link";

import useLocation from "../../../hooks/useLocation";
import useInitMap from "../../../hooks/useInitMap";

import styles from "./Map.module.scss";

const Map: SectionComponent = ({ _type, revealInViewport, location }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [href, setHref] = useState("#");

  useInitMap(location, ref);

  const coords = useLocation();

  useEffect(() => {
    if (!coords) return;

    const { lat, lng } = coords;

    setHref(
      `https://www.google.com/maps/dir/${lat},${lng}/${location.lat},${location.lng}`
    );
  }, [coords, location]);

  return (
    <Section
      type={_type}
      revealInViewport={revealInViewport}
      className={styles.root}
      root={{ className: styles.container }}
    >
      <Link href={href}>
        <a className={styles.link} target="_blank" rel="noopener noreferrer">
          <Container className="px-0 h-100" fluid ref={ref}></Container>
        </a>
      </Link>
    </Section>
  );
};

export default Map;
