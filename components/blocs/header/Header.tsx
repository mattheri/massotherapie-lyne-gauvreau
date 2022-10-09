import type { FC } from "react";
import type { Asset, NavigationObject } from "../../../types";
import type { ScrollCallback } from "../../../hooks";

import { useEffect, useState } from "react";

import HamburgerIcon from "../../icons/Hamburger";
import Logo from "../logo/Logo";

import Link from "next/link";

import { useWindowScroll, useScrollBodyLock } from "../../../hooks";
import { getPathFromSlug, slugParamToPath } from "../../../helpers/urlHelpers";
import { useRouter } from "next/router";

import styles from "./Header.module.scss";

interface Props {
  title: string;
  navItems: NavigationObject[];
  logo?: Asset;
}

const Header: FC<Props> = ({ title = "Missing title", navItems, logo }) => {
  const [showNav, setShowNav] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const router = useRouter();

  const hideMenu = () => setShowNav(false);
  const handleMenuToggle = () => setShowNav(!showNav);

  const hideUpMenu: ScrollCallback = ({ scrollDirection }) => {
    if (scrollDirection === "up") {
      if (isHidden) setIsHidden(false);
    } else {
      if (!isHidden) setIsHidden(true);
    }
  };

  useWindowScroll(hideUpMenu, { applyThreshold: "down" });

  useEffect(() => {
    router.events.on("routeChangeComplete", hideMenu);

    return () => router.events.off("routeChangeComplete", hideMenu);
  }, [router]);

  useScrollBodyLock(showNav);

  return (
    <header
      className={styles.root}
      data-show-nav={showNav}
      data-hide-nav={isHidden}
    >
      <div className={styles.content}>
        <h1 className={styles.branding}>
          <Link href={"/"}>
            <a title={title}>
              <Logo logo={logo} />
            </a>
          </Link>
        </h1>
        <nav className={styles.nav}>
          <button className={styles.showNavButton} onClick={handleMenuToggle}>
            <HamburgerIcon isOpen={showNav} className={styles.hamburgerIcon} />
          </button>
          <ul className={styles.navItems}>
            {navItems &&
              navItems.map((item) => {
                const { slug, title, _id } = item;
                const isActive =
                  slugParamToPath(router.query.slug) === slug.current;
                return (
                  <li key={_id} className={styles.navItem}>
                    <Link href={getPathFromSlug(slug.current)}>
                      <a
                        data-is-active={isActive ? "true" : "false"}
                        aria-current={isActive}
                      >
                        {title}
                      </a>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
