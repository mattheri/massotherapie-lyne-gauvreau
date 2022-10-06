import { FC } from "react";
import SimpleBlockContent from "../../SimpleBlockContent";
import styles from "./TextSection.module.css";
import Section from "../../common/Section";
import { SectionProps } from "../../../types";
import If from "../../common/react-if/If";
import Then from "../../common/react-if/Then";

const TextSection: FC<SectionProps> = ({ heading, label, text, _type }) => {
  return (
    <Section revealInViewport as="div" className={styles.root} type={_type}>
      <section className={styles.article}>
        <div className={styles.label}>{label}</div>
        <h2 className={styles.heading}>{heading}</h2>
        <If condition={!!text}>
          <Then>
            <SimpleBlockContent blocks={text} />
          </Then>
        </If>
      </section>
    </Section>
  );
};

export default TextSection;
