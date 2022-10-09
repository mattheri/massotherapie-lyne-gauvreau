import type { Component, Pay } from "../../../types";
import type { FormEventHandler } from "react";

import { Button } from "../../common";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

interface Props {
  pay: Pay;
  time: string;
}

const CheckoutSession: Component<Props> = ({ pay, time }) => {
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

    console.log(response);

    const session = await response.json();

    console.log(session);
  };

  return (
    <Container fluid>
      <Form onSubmit={onSubmit}>
        <Container as="section" fluid>
          <Button type="submit">Checkout</Button>
        </Container>
      </Form>
    </Container>
  );
};

export default CheckoutSession;
