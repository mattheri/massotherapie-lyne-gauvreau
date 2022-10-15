import type { FC } from "react";
import type { SectionProps } from "../../../types";

import { Section, If, SanityImage } from "../../common";
import { SimpleBlockContent, Cta } from "../../blocs";

import cn from "classnames";

import styles from "./ImageSection.module.scss";

const ImageSection: FC<SectionProps> = ({
  heading,
  label,
  text,
  image,
  cta,
  imagePosition,
  textAlignment,
  textPosition,
  _type,
}) => {
  return (
    <Section className={styles.root} type={_type} revealInViewport>
      <If condition={!!image}>
        <If.Then>
          <figure className={styles.content}>
            <SanityImage
              image={image}
              className={cn(styles.image, {
                [styles.imageRight]: imagePosition === "right",
              })}
            />
            <figcaption>
              <div
                className={cn(styles.caption, {
                  [styles.contentRight]: textAlignment === "right",
                  [styles.contentLeft]: textAlignment === "left",
                  [styles.contentCenter]: textAlignment === "center",
                  [styles.positionTop]: textPosition === "top",
                  [styles.positionCenter]: textPosition === "center",
                  [styles.positionBottom]: textPosition === "bottom",
                })}
              >
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
