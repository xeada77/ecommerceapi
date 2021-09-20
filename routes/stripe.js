const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", async (req, res) => {
  /* stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "eur",
    },
    (stripeError, stripeRes) => {
      if (stripeError) {
        console.log(stripeError);
        res.status(500).json({ error: { stripeError } });
      } else {
        res.status(200).json(stripeRes);
      }
    }
  ); */
  try {
    console.log("KEY");
    console.log(process.env.STRIPE_KEY);
    const charge = await stripe.charges.create(
      {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "eur",
      },
      {
        apiKey: process.env.STRIPE_KEY,
      }
    );
    res.status(200).json(charge);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
