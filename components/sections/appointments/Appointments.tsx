import type { SectionProps } from "../../../types";
import type { FC, ChangeEventHandler } from "react";
import { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

import { Section, Heading, If } from "../../common";

import debounce from "lodash.debounce";

import styles from "./Appointments.module.scss";
interface Props extends SectionProps {
  title: string;
  appointmentIdFirst: string;
  appointmentIdSecond: string;
  appointmentIdThird: string;
}

const createEmbedUrl = (id: string) =>
  `https://zcal.co/i/${id}?embed=1&embedType=iframe`;

const formInputs = [
  { label: "J'aimerais payer en avance", id: "stripe" },
  {
    label: "J'aimerais payer en personne (argent comptant seulement)",
    id: "cash",
  },
];

const Appointments: FC<Props> = ({
  _type,
  title,
  appointmentIdFirst,
  appointmentIdSecond,
  appointmentIdThird,
}) => {
  const appointments = [
    appointmentIdFirst,
    appointmentIdSecond,
    appointmentIdThird,
  ];

  const [formData, setFormData] = useState({
    pay: "stripe",
    hours: 1,
  });
  const [embedUrl, setEmbedUrl] = useState(
    createEmbedUrl(appointments[formData.hours])
  );

  const updateEmbedUrlHandler = debounce(() => {
    setEmbedUrl(createEmbedUrl(appointments[formData.hours - 1]));
  }, 1000);

  const updateFormData: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const radioUpdateFormData: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { id, name } = event.target;
    setFormData((prev) => ({ ...prev, [name]: id }));
  };

  useEffect(() => {
    updateEmbedUrlHandler();
  }, [formData]);

  return (
    <Section type={_type}>
      <Heading className="text-center pb-5">{title}</Heading>
      <Form className={styles.form}>
        <Col className="pb-3">
          {formInputs.map((props, index) => (
            <Form.Check
              key={index}
              onChange={radioUpdateFormData}
              type="radio"
              name="pay"
              {...props}
            />
          ))}
        </Col>
        <Form.Label>
          {formData.hours} {`heure${formData.hours > 1 ? "s" : ""}`}
        </Form.Label>
        <Form.Range
          onChange={updateFormData}
          step="1"
          min="1"
          max="3"
          name="hours"
          defaultValue={1}
        />
      </Form>
      <If condition={!embedUrl.includes("undefined")}>
        <If.Then>
          <iframe
            src={embedUrl}
            loading="lazy"
            style={{
              border: "none",
              minWidth: "320px",
              width: "100%",
              minHeight: "544px",
              height: "700px",
            }}
            id="zcal-invite"
          ></iframe>
        </If.Then>
      </If>
    </Section>
  );
};

export default Appointments;
