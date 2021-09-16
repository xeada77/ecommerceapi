const router = require("express").Router();

router.get("/usertest", (req, res) => {
  res.send("Usertest is sucesfull");
});

module.exports = router;
