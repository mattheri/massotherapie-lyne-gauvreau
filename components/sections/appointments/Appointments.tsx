import { FC, useEffect } from "react";
import Section from "../../common/Section";
import Script from "next/script";
import { SectionProps } from "../../../types";
import Heading from "../../Heading";

interface Props extends SectionProps {
  title: string;
}

const Appointments: FC<Props> = ({ _type, title }) => {
  useEffect(() => {
    return () => {
      document.getElementById("appointments")?.remove();
    };
  });

  return (
    <Section type={_type}>
      <Script
        id="appointments"
        src="https://static.zcal.co/embed/v1/embed.js"
      />
      <Heading className="text-center">{title}</Heading>
      <div className="zcal-inline-widget">
        <a href="https://zcal.co/i/h6RdOGG5">Massage - Schedule a meeting</a>
      </div>
    </Section>
  );
};

export default Appointments;
