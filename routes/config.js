const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ publicKey: process.env.STRIPE_PUBLIC_KEY });
});

module.exports = router;
