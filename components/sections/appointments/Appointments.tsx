import type { Pay, SectionComponent } from "../../../types";
import { ChangeEventHandler, useCallback } from "react";

import { useState, useEffect, Suspense } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

import { Section, Heading, If } from "../../common";

import { useBreakpoints, useDebounce } from "../../../hooks";
import cn from "classnames";
import dynamic from "next/dynamic";

import styles from "./Appointments.module.scss";

interface Props {
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
    label:
      "J'aimerais payer en personne (argent comptant ou virement Interac seulement)",
    id: "cash",
  },
];

const CheckoutSession = dynamic(
  () => import("../../blocs/checkout-session/CheckoutSession"),
  { ssr: true, suspense: true }
);

interface FormData {
  pay: Pay;
  time: string;
}

const Appointments: SectionComponent<Props> = ({
  _type,
  title,
  appointmentIdFirst,
  appointmentIdSecond,
}) => {
  const appointments: Record<string, string> = {
    "1": appointmentIdFirst,
    "1.5": appointmentIdSecond,
  };

  const total: Record<string, string> = {
    "1": "60.00",
    "1.5": "90.00",
  };

  const [formData, setFormData] = useState<FormData>({
    pay: "stripe",
    time: "1",
  });
  const [embedUrl, setEmbedUrl] = useState(
    createEmbedUrl(appointments[formData.time])
  );
  const [height, setHeight] = useState(850);

  const updateEmbedUrl = () =>
    setEmbedUrl(createEmbedUrl(appointments[formData.time]));

  const updateEmbedUrlHandler = useDebounce(updateEmbedUrl, 1000, [
    formData.time,
  ]);

  const updateFormData: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const radioUpdateFormData: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { id, name } = event.target;
    setFormData((prev) => ({ ...prev, [name]: id }));
  };

  useEffect(() => {
    updateEmbedUrlHandler();
  }, [formData, updateEmbedUrlHandler]);

  const { xSmall, small, medium, large, xLarge } = useBreakpoints();

  const getHeight = useCallback(() => {
    if (large) return 625;
    if (medium) return 900;

    return 850;
  }, [large, medium]);

  useEffect(() => {
    setHeight(getHeight());
  }, [xSmall, small, medium, large, xLarge, getHeight]);

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
              checked={formData.pay === props.id}
              {...props}
            />
          ))}
        </Col>
        <Col className="pb-3">
          <Form.Label>
            Combien d&apos;heures de consultation voulez-vous?
          </Form.Label>
          <Form.Select
            name="time"
            id="time"
            value={formData.time}
            onChange={updateFormData}
          >
            <option value="1">1 heure</option>
            <option value="1.5">1 heure 30 minutes</option>
          </Form.Select>
        </Col>
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
              height: `${height}px`,
            }}
            id="zcal-invite"
          ></iframe>
        </If.Then>
      </If>

      <If condition={formData.pay === "stripe"}>
        <If.Then>
          <Container fluid className={cn(styles.form, "px-0")}>
            <Suspense fallback={<Spinner animation="border" />}>
              <CheckoutSession
                time={formData.time}
                total={total[formData.time]}
              />
            </Suspense>
          </Container>
        </If.Then>
      </If>
    </Section>
  );
};

export default Appointments;
