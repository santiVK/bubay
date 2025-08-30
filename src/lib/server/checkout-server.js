const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const { amount } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price_data: { currency: "eur", product_data: { name: "Servicio Bubay" }, unit_amount: amount }, quantity: 1 }],
      mode: "payment",
      success_url: "https://tuapp.com/success",
      cancel_url: "https://tuapp.com/cancel",
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4242, () => console.log("Servidor Stripe escuchando en puerto 4242"));
