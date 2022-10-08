import type { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";

const errors = {
  unknown: "An unknown error occurred.",
  invalidMethod: "Method not allowed.",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const item = req.body.item;

    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) return res.status(500).json({ error: errors.unknown });

    const stripe = new Stripe(secretKey, {
      apiVersion: "2022-08-01",
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: item.priceId,
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 3,
          },
        },
      ],
      mode: "payment",
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
      automatic_tax: { enabled: true },
    });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end(errors.invalidMethod);
  }
}
