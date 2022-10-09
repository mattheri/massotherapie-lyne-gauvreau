import type {
  ImportModuleObject,
  SectionComponent,
  SectionProps,
} from "../../types";

import { FC, Fragment } from "react";

import * as SectionComponents from "../sections";

import { capitalize } from "../../helpers/stringHelpers";

const resolveSections = (section: SectionProps) => {
  const Section = (SectionComponents as ImportModuleObject)[
    capitalize(section._type)
  ] as SectionComponent;

  if (!Section) {
    console.error("Cant find section", section);
    return null;
  }

  return Section;
};

interface Props {
  sections: SectionProps[];
}

const RenderSections: FC<Props> = ({ sections }) => {
  if (!sections) {
    console.error("Missing section");
  }

  return (
    <Fragment>
      {sections.map((section) => {
        const SectionComponent = resolveSections(section);

        return SectionComponent ? (
          <SectionComponent {...section} key={section._key} />
        ) : null;
      })}
    </Fragment>
  );
};

export default RenderSections;
