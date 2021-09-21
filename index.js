const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import Routes
const {
  userRoutes,
  authRoutes,
  orderRoutes,
  productRoutes,
  cartRoutes,
  checkoutRoutes,
  configRoutes,
} = require("./routes");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected!");
  })
  .catch((e) => {
    console.log(e);
  });

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/checkout", checkoutRoutes);
app.use("/api/v1/config", configRoutes);

app.listen(process.env.PORT || 5001, () => {
  console.log("Server is running!");
});
