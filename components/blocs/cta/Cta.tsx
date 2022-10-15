import type { Route } from "../../../types";
import type { FC } from "react";

import { Button } from "../../common";

import styles from "./Cta.module.scss";

interface Props {
  title?: string;
  route?: Route;
  link?: string;
}

const Cta: FC<Props> = ({ title, route, link }) => {
  if (route && route.slug && route.slug.current) {
    return (
      <Button
        link={{
          href: {
            pathname: "/LandingPage",
            query: { slug: route.slug.current },
          },
          as: `/${route.slug.current}`,
        }}
      >
        {title}
      </Button>
    );
  }

  if (link) {
    return (
      <Button as="a" href={link}>
        {title}
      </Button>
    );
  }

  return <Button as="a">{title}</Button>;
};

export default Cta;
