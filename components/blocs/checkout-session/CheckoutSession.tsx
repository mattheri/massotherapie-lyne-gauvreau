import type { Component } from "../../../types";
import type { MouseEventHandler } from "react";

import { useState } from "react";

import Container from "react-bootstrap/Container";

import { Button, Heading } from "../../common";

import cn from "classnames";

import styles from "./CheckoutSession.module.scss";

interface Props {
  time: string;
  total: string;
}

const CheckoutSession: Component<Props> = ({ time, total }) => {
  const [isPending, setIsPending] = useState(false);

  const onSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    setIsPending(true);

    const { loadStripe } = await import("@stripe/stripe-js");

    const publicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

    if (!publicKey) return;

    const stripe = await loadStripe(publicKey);

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
      <small className="text-center mx-auto d-block text-danger">
        N&apos;oubliez pas de réserver votre rendez-vous avant de payer en ligne
      </small>
      <Container as="section" fluid className={cn(styles.root, "px-0")}>
        <Heading as="h5" className="text-center py-2">
          Votre total: {total}$
        </Heading>
        <Button
          onClick={onSubmit}
          className={cn(styles.button, {
            [styles.pending]: isPending,
          })}
        >
          Payer en ligne
        </Button>
      </Container>
    </Container>
  );
};

export default CheckoutSession;
