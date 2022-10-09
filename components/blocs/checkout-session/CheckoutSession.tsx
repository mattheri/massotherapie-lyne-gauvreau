import type { Component, Pay } from "../../../types";
import type { FormEventHandler } from "react";

import { Button } from "../../common";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import { loadStripe } from "@stripe/stripe-js";

interface Props {
  pay: Pay;
  time: string;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
);

const CheckoutSession: Component<Props> = ({ pay, time }) => {
  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    await fetch("/api/checkout-session", {
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
