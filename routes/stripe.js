const e = require("express");

const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", async (req, res) => {
  try {
    const charge = await stripe.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: req.body.currency,
    });
    res.status(200).json(charge);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/create-payment-intent", async (req, res) => {
  const { paymentMethodType, currency } = req.body;

  const params = {
    payment_method_types: [paymentMethodType],
    amount: 1999,
    currency: currency,
  };

  try {
    const paymentIntent = await stripe.paymentIntents.create(params);

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    res.status(400).json({
      error: {
        message: e.message,
      },
    });
  }
});

module.exports = router;
