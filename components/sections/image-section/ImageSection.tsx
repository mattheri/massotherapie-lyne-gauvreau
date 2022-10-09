import type { FC } from "react";
import type { SectionProps } from "../../../types";

import { Section, If, SanityImage } from "../../common";
import { SimpleBlockContent, Cta } from "../../blocs";

import styles from "./ImageSection.module.scss";

const ImageSection: FC<SectionProps> = ({
  heading,
  label,
  text,
  image,
  cta,
  _type,
}) => {
  return (
    <Section className={styles.root} type={_type} revealInViewport>
      <If condition={!!image}>
        <If.Then>
          <figure className={styles.content}>
            <SanityImage image={image} className={styles.image} />
            <figcaption>
              <div className={styles.caption}>
                <div className={styles.captionBox}>
                  <div className={styles.label}>{label}</div>
                  <h2 className={styles.title}>{heading}</h2>
                  <If condition={!!text}>
                    <If.Then>
                      <SimpleBlockContent blocks={text} />
                    </If.Then>
                  </If>
                  <If condition={!!(cta && cta.route)}>
                    <If.Then>
                      <Cta {...cta} />
                    </If.Then>
                  </If>
                </div>
              </div>
            </figcaption>
          </figure>
        </If.Then>
      </If>
    </Section>
  );
};

export default ImageSection;
