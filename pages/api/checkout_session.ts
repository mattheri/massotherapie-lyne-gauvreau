import type { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";

const errors = {
  unknown: "An unknown error occurred.",
  invalidMethod: "Method not allowed.",
};

const items: Record<string, string | undefined> = {
  "1": process.env.ONE_HOUR_PRICE_ID,
  "1.5": process.env.ONE_HOUR_PRICE_ID,
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
          price: items[item.time],
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
      automatic_tax: { enabled: true },
    });

    console.log(checkoutSession);

    if (!checkoutSession || !checkoutSession.url)
      return res.status(500).json({ error: errors.unknown });

    res.redirect(303, checkoutSession.url);
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end(errors.invalidMethod);
  }
}
