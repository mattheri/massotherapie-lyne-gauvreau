import React, { FC } from "react";
import imageUrlBuilder from "@sanity/image-url";
import styles from "./ImageSection.module.css";
import client from "../../../client";
import SimpleBlockContent from "../../SimpleBlockContent";
import Cta from "../../blocs/cta/Cta";
import Section from "../../common/Section";
import If from "../../common/react-if/If";
import Then from "../../common/react-if/Then";
import Image from "next/image";
import { SectionProps } from "../../../types";
import { useNextSanityImage } from "next-sanity-image";

const builder = imageUrlBuilder(client);

const ImageSection: FC<SectionProps> = ({
  heading,
  label,
  text,
  image,
  cta,
  _type,
}) => {
  if (!image) {
    return null;
  }

  const img = builder.image(image).auto("format").width(2000);

  const imageProps: any = useNextSanityImage(client, image);

  console.log(imageProps);

  return (
    <Section className={styles.root} type={_type}>
      <figure className={styles.content}>
        <Image
          src={img.url()}
          className={styles.image}
          alt={heading}
          width={2000}
          height={1500}
          blurDataURL={img.blur(100).url()}
          {...imageProps}
        />
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
    </Section>
  );
};

export default ImageSection;
