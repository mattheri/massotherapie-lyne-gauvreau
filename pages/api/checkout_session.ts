import type { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";

const errors = {
  unknown: "An unknown error occurred.",
  invalidMethod: "Method not allowed.",
};

const items: Record<string, string | undefined> = {
  "1":
    process.env.NODE_ENV === "development"
      ? process.env.ONE_HOUR_PRICE_ID_TEST
      : process.env.ONE_HOUR_PRICE_ID_LIVE,
  "1.5":
    process.env.NODE_ENV === "development"
      ? process.env.ONE_HOUR_PRICE_ID_TEST
      : process.env.ONE_HOUR_PRICE_ID_LIVE,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const item = req.body.item;

      const secretKey = process.env.STRIPE_PRIVATE_KEY;

      if (!secretKey) return res.status(500).json({ error: errors.unknown });

      const stripe = new Stripe(secretKey, {
        apiVersion: "2022-08-01",
      });

      const checkoutSession = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: items[item.time],
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}`,
        automatic_tax: { enabled: true },
      });

      if (!checkoutSession || !checkoutSession.url)
        throw new Error(errors.unknown);

      res.status(200).json({ url: checkoutSession.url });
    } catch (e) {
      const error = e as Error;

      res.status(500).json({ error });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end(errors.invalidMethod);
  }
}
