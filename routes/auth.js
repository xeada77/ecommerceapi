const router = require("express").Router();
const User = require("../models/User");
const Cryptojs = require("crypto-js");

// REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: Cryptojs.AES.encrypt(
      req.body.password,
      process.env.CRYPTO_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    const { password, ...others } = savedUser._doc;
    res.status(201).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      if (
        Cryptojs.AES.decrypt(
          user.password.toString(),
          process.env.CRYPTO_SEC
        ).toString(Cryptojs.enc.Utf8) == req.body.password
      ) {
        const { password, ...others } = user._doc;
        res.status(201).json(others);
      } else {
        res.status(401).json({ error: "Credenciales incorrectas" });
      }
    } else {
      res.status(401).json({ error: "Credenciales incorrectas" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
