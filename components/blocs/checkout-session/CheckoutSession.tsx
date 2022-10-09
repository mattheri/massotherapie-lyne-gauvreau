import type { Component } from "../../../types";
import type { FormEventHandler } from "react";

import { Button, Heading } from "../../common";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import cn from "classnames";

import styles from "./CheckoutSession.module.scss";

interface Props {
  time: string;
  total: string;
}

const CheckoutSession: Component<Props> = ({ time, total }) => {
  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    const { loadStripe } = await import("@stripe/stripe-js");

    const publicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

    if (!publicKey) return;

    const stripe = await loadStripe(publicKey);

    event.preventDefault();

    const response = await fetch("/api/checkout_session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item: {
          time: time,
        },
      }),
    });

    const session = await response.json();

    if (session.url) {
      window.location.href = session.url;
    }
  };

  return (
    <Container fluid className="px-0">
      <Form onSubmit={onSubmit}>
        <Container as="section" fluid className={cn(styles.root, "px-0")}>
          <Heading as="h5" className="text-center py-2">
            Votre total: {total}$
          </Heading>
          <Button type="submit" className={styles.button}>
            Payer en ligne
          </Button>
        </Container>
      </Form>
    </Container>
  );
};

export default CheckoutSession;
