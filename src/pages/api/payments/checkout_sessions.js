const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const { productIds } = req.body; // expecting array of product ids

        // create line items using the provided price ids
        const line_items = productIds.map((priceId) => ({
          price: priceId,
          quantity: 1,
        }));

        const session = await stripe.checkout.sessions.create({
          ui_mode: "embedded",
          line_items,
          mode: "payment",
          return_url: `${req.headers.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`, // return url when payment proccessed(even if error)
        });

        res.status(200).json({ clientSecret: session.client_secret });
      } catch (err) {
        console.error("Error creating checkout session:", err);
        res.status(err.statusCode || 500).json({ error: err.message });
      }
      break;
    case "GET":
      try {
        const session = await stripe.checkout.sessions.retrieve(
          req.query.session_id
        );

        res.status(200).json({
          status: session.status,
          customer_email: session.customer_details
            ? session.customer_details.email
            : "",
        });
      } catch (err) {
        console.error("Error retrieving checkout session:", err);
        res.status(err.statusCode || 500).json({ error: err.message });
      }
      break;
    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end("Method Not Allowed");
  }
}
