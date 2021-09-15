const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoutes = require("./routes/user");

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected!");
  })
  .catch((e) => {
    console.log(e);
  });

app.use("/api/v1/user", userRoutes);

app.listen(process.env.PORT || 5001, () => {
  console.log("Server is running!");
});
