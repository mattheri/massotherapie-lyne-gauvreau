import React, { FC } from "react";
import SVG from "react-inlinesvg";
import { Asset } from "../../../types";
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

  return <img src={logo.asset.url} alt={logo.title} className={styles.root} />;
};

export default Logo;
