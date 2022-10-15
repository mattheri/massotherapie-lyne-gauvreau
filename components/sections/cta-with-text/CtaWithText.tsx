import type { Route, SectionComponent } from "../../../types";

import { Heading, If, Section } from "../../common";
import { SimpleBlockContent, Cta as CtaBlock } from "../../blocs";

import Container from "react-bootstrap/Container";

interface Props {
  title?: string;
  ctas?: {
    _key: string;
    title: string;
    route?: Route;
    link?: string;
  }[];
}

const CtaWithText: SectionComponent<Props> = ({ _type, title, text, ctas }) => {
  return (
    <Section type={_type}>
      <Container fluid className="px-0">
        <If condition={!!title}>
          <If.Then>
            <Heading>{title}</Heading>
          </If.Then>
        </If>
        <If condition={!!text}>
          <If.Then>
            <SimpleBlockContent blocks={text} />
          </If.Then>
        </If>
        <If condition={!!ctas}>
          <If.Then>
            {ctas?.map((cta, index) => (
              <CtaBlock key={index} {...cta} />
            ))}
          </If.Then>
        </If>
      </Container>
    </Section>
  );
};

export default CtaWithText;
