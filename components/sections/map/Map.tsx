import type { SectionComponent } from "../../../types";
import { Section } from "../../common";

const Map: SectionComponent = ({ _type, revealInViewport }) => {
  return <Section type={_type} revealInViewport={revealInViewport}></Section>;
};

export default Map;
