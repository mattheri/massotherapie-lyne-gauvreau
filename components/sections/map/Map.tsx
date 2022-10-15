import type { SectionComponent } from "../../../types";
import { Section } from "../../common";

const Map: SectionComponent = ({ _type }) => {
  return <Section type={_type}></Section>;
};

export default Map;
