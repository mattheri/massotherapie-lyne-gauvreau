import React, { FC } from "react";
import styles from "./ImageSection.module.css";
import SimpleBlockContent from "../../SimpleBlockContent";
import Cta from "../../blocs/cta/Cta";
import Section from "../../common/Section";
import If from "../../common/react-if/If";
import Then from "../../common/react-if/Then";
import Image from "next/image";
import { SectionProps } from "../../../types";
import SanityImage from "../../common/SanityImage";

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
        <Then>
          <figure className={styles.content}>
            <SanityImage image={image} />
            <figcaption>
              <div className={styles.caption}>
                <div className={styles.captionBox}>
                  <div className={styles.label}>{label}</div>
                  <h2 className={styles.title}>{heading}</h2>
                  <If condition={!!text}>
                    <Then>
                      <SimpleBlockContent blocks={text} />
                    </Then>
                  </If>
                  <If condition={!!(cta && cta.route)}>
                    <Then>
                      <Cta {...cta} />
                    </Then>
                  </If>
                </div>
              </div>
            </figcaption>
          </figure>
        </Then>
      </If>
    </Section>
  );
};

export default ImageSection;
