import { FC, useEffect, useRef, useState } from "react";
import Section from "../../common/Section";
import Script from "next/script";
import { SectionProps } from "../../../types";
import Heading from "../../Heading";

interface Props extends SectionProps {
  title: string;
}

const Appointments: FC<Props> = ({ _type, title }) => {
  return (
    <Section type={_type}>
      <Heading className="text-center">{title}</Heading>
      <iframe
        src="https://zcal.co/i/h6RdOGG5?embed=1&embedType=iframe"
        loading="lazy"
        style={{
          border: "none",
          minWidth: "320px",
          width: "100%",
          minHeight: "544px",
          height: "966px",
        }}
        id="zcal-invite"
      ></iframe>
    </Section>
  );
};

export default Appointments;
