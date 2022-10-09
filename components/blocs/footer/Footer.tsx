import type { FC } from "react";
import type { NavigationObject, SectionProps } from "../../../types";

import { Section } from "../../common";
import { SimpleBlockContent } from "..";

import Link from "next/link";

import { getPathFromSlug, slugParamToPath } from "../../../helpers/urlHelpers";
import { useRouter } from "next/router";

import styles from "./Footer.module.scss";

interface Props {
  navItems: NavigationObject[];
  text: SectionProps[];
}

const Footer: FC<Props> = ({ navItems, text }) => {
  const router = useRouter();

  return (
    <Section className={styles.root} as="footer" type="footer">
      <nav>
        <ul className={styles.items}>
          {navItems &&
            navItems.map((item) => {
              const isActive =
                slugParamToPath(router.query.slug) === item.slug.current;
              return (
                <li key={item._id} className={styles.item}>
                  <Link href={getPathFromSlug(item.slug.current)}>
                    <a
                      data-is-active={isActive ? "true" : "false"}
                      aria-current={isActive}
                    >
                      {item.title}
                    </a>
                  </Link>
                </li>
              );
            })}
        </ul>
      </nav>
      <div className={styles.text}>
        <SimpleBlockContent blocks={text} />
      </div>
    </Section>
  );
};

export default Footer;
