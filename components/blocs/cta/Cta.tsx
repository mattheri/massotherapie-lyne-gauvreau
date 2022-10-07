import React, { FC } from "react";
import Link from "next/link";
import styles from "./Cta.module.scss";
import { Route } from "../../../types";

interface Props {
  title: string;
  route?: Route;
  link?: string;
}

const Cta: FC<Props> = ({ title, route, link }) => {
  if (route && route.slug && route.slug.current) {
    return (
      <Link
        href={{
          pathname: "/LandingPage",
          query: { slug: route.slug.current },
        }}
        as={`/${route.slug.current}`}
      >
        <a className={styles.button}>{title}</a>
      </Link>
    );
  }

  if (link) {
    return (
      <a className={styles.button} href={link}>
        {title}
      </a>
    );
  }

  return <a className={styles.button}>{title}</a>;
};

export default Cta;
