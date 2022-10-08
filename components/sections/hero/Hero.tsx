import { FC } from "react";
import styles from "./Hero.module.scss";
import SimpleBlockContent from "../../SimpleBlockContent";
import { Cta } from "../../blocs";
import Section from "../../common/Section";
import cn from "classnames";
import If from "../../common/react-if/If";
import Then from "../../common/react-if/Then";
import { Route, SectionProps } from "../../../types";
import Container from "react-bootstrap/Container";
import SanityImage from "../../common/SanityImage";

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
  return (
    <Section fluid className={cn(styles.root, "px-0")} type={_type}>
      <SanityImage
        layout="fill"
        objectFit="cover"
        image={backgroundImage}
        className={styles.heroImage}
      />
      <Container className={styles.content}>
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
      </Container>
    </Section>
  );
};

export default Hero;
