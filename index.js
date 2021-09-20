const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

//const userRoutes = require("./routes/user");
//const authRoutes = require("./routes/auth");

// Import Routes
const {
  userRoutes,
  authRoutes,
  orderRoutes,
  productRoutes,
  cartRoutes,
  checkoutRoutes,
} = require("./routes");

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

app.use(express.json());
app.use(cors());
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/checkout", checkoutRoutes);

app.listen(process.env.PORT || 5001, () => {
  console.log("Server is running!");
});
