import type { Route, SectionComponent } from "../../../types";

import { SanityImage, Section, If } from "../../common";
import { Cta, SimpleBlockContent } from "../../blocs";

import Container from "react-bootstrap/Container";

import cn from "classnames";

import styles from "./Hero.module.scss";
interface Props {
  ctas?: {
    _key: string;
    title: string;
    route?: Route;
    link?: string;
  }[];
}

const Hero: SectionComponent<Props> = ({
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
            <If.Then>
              <SimpleBlockContent blocks={tagline} />
            </If.Then>
          </If>
        </div>
        <If condition={!!(ctas && ctas.length)}>
          <If.Then>
            <section className={styles.ctas}>
              {ctas?.map((cta) => (
                <Cta {...cta} key={cta._key} />
              ))}
            </section>
          </If.Then>
        </If>
      </Container>
    </Section>
  );
};

export default Hero;
