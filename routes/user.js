const router = require("express").Router();

router.get("/usertest", (req, res) => {
  res.send("Usertest is sucesfull");
});

router.post("/postuser", (req, res) => {
  const username = req.body.username;

  res.send("Your username is: " + username);
});

module.exports = router;
