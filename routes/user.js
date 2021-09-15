const router = require("express").Router();

router.get("/usertest", (req, res) => {
  res.send("Usertest is sucesful");
});

module.exports = router;
