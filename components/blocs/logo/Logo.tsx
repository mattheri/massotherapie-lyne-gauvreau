import type { Asset } from "../../../types";
import type { FC } from "react";

import { SanityImage } from "../../common";

import SVG from "react-inlinesvg";

import styles from "./Logo.module.scss";

interface Props {
  logo?: Asset;
}

const Logo: FC<Props> = ({ logo }) => {
  if (!logo || !logo.asset) {
    return null;
  }

  if (logo.asset.extension === "svg") {
    return <SVG src={logo.asset.url} className={styles.root} />;
  }

  return <SanityImage image={logo.asset} />;
};

export default Logo;
