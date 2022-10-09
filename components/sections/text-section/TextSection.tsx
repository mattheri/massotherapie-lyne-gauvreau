import type { FC } from "react";
import type { SectionProps } from "../../../types";

import { Section, If } from "../../common";
import { SimpleBlockContent } from "../../blocs";

import styles from "./TextSection.module.css";

const TextSection: FC<SectionProps> = ({ heading, label, text, _type }) => {
  return (
    <Section revealInViewport as="div" className={styles.root} type={_type}>
      <section className={styles.article}>
        <div className={styles.label}>{label}</div>
        <h2 className={styles.heading}>{heading}</h2>
        <If condition={!!text}>
          <If.Then>
            <SimpleBlockContent blocks={text} />
          </If.Then>
        </If>
      </section>
    </Section>
  );
};

export default TextSection;
