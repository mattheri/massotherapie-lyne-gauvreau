import type { FC } from "react";
import type { Asset } from "../../../types";

import { SanityImage } from "../../common";
import styles from "./Figure.module.scss";

interface Props {
  node: {
    caption?: string;
    asset?: Asset["asset"];
  };
}

const Figure: FC<Props> = ({ node }) => {
  const { caption, asset } = node;

  return asset ? (
    <figure className={styles.content}>
      <SanityImage image={asset} className={styles.image} />
      {caption && (
        <figcaption>
          <div className={styles.caption}>
            <div className={styles.captionBox}>
              <p>{caption}</p>
            </div>
          </div>
        </figcaption>
      )}
    </figure>
  ) : null;
};

export default Figure;
