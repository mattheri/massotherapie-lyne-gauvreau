import { FC } from "react";
import styles from "./Hero.module.css";
import SimpleBlockContent from "../../SimpleBlockContent";
import { Cta } from "../../blocs";
import Section from "../../common/Section";
import { builder } from "../../../helpers/imageHelpers";
import cn from "classnames";
import If from "../../common/react-if/If";
import Then from "../../common/react-if/Then";
import { Route, SectionProps } from "../../../types";

const urlFor = (source: any) => builder.image(source);

interface Props extends SectionProps {
  ctas?: {
    _key: string;
    title: string;
    route?: Route;
    link?: string;
  }[];
}

const Hero: FC<Props> = ({
  heading,
  backgroundImage,
  tagline,
  ctas,
  _type,
}) => {
  const style = backgroundImage
    ? {
        backgroundImage: `url("${urlFor(backgroundImage)
          .width(2000)
          .auto("format")
          .url()}")`,
      }
    : {};

  return (
    <Section
      fluid
      className={cn(styles.root, "px-0")}
      type={_type}
      style={style}
    >
      <div className={styles.content}>
        <h1 className={styles.title}>{heading}</h1>
        <div className={styles.tagline}>
          <If condition={!!tagline}>
            <Then>
              <SimpleBlockContent blocks={tagline} />
            </Then>
          </If>
        </div>
        <If condition={!!(ctas && ctas.length)}>
          <Then>
            <div className={styles.ctas}>
              {ctas?.map((cta) => (
                <Cta {...cta} key={cta._key} />
              ))}
            </div>
          </Then>
        </If>
      </div>
    </Section>
  );
};

export default Hero;
