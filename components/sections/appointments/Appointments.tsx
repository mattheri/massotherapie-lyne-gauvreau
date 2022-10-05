import { FC, useEffect, useRef, useState } from "react";
import Section from "../../common/Section";
import Script from "next/script";
import { SectionProps } from "../../../types";
import Heading from "../../Heading";

interface Props extends SectionProps {
  title: string;
}

const Appointments: FC<Props> = ({ _type, title }) => {
  const [addScript, setAddScript] = useState(false);

  useEffect(() => {
    const zCalScript = document.getElementById("zCalScript");
    const container = document.getElementById("appointments-container");

    if (!container?.contains(zCalScript)) {
      setAddScript(true);
    }

    return () => {
      if (container?.contains(zCalScript)) {
        setAddScript(false);
        zCalScript?.remove();
      }
    };
  });

  return (
    <Section type={_type} id="appointments-container">
      <Heading className="text-center">{title}</Heading>
      {addScript && (
        <script
          id="zCalScript"
          src="https://static.zcal.co/embed/v1/embed.js"
        />
      )}
      <div className="zcal-inline-widget">
        <a href="https://zcal.co/i/h6RdOGG5">Massage - Schedule a meeting</a>
      </div>
    </Section>
  );
};

export default Appointments;
