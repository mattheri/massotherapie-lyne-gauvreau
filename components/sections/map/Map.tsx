import type { SectionComponent } from "../../../types";

import { useRef, useEffect, useState } from "react";

import { Section } from "../../common";

import Container from "react-bootstrap/Container";

import useInitMap from "../../../hooks/useInitMap";

import styles from "./Map.module.scss";

const Map: SectionComponent = ({ _type, revealInViewport, location }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [href, setHref] = useState(`geo:${location.lat},${location.lng}`);

  useInitMap(location, ref);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isAndroid = ua.indexOf("android") > -1;
    const isIos = ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1;

    if (!isAndroid && !isIos) {
      setHref(
        `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`
      );
    }
  }, [location]);

  return (
    <Section
      type={_type}
      revealInViewport={revealInViewport}
      className={styles.root}
      root={{ className: styles.container }}
    >
      <a href={href} target="_blank" className={styles.link} rel="noreferrer">
        <Container className="px-0 h-100" fluid ref={ref}></Container>
      </a>
    </Section>
  );
};

export default Map;
