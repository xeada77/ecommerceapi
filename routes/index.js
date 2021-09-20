const routes = {
  authRoutes: require("./auth"),
  userRoutes: require("./user"),
  cartRoutes: require("./cart"),
  productRoutes: require("./product"),
  orderRoutes: require("./order"),
  checkoutRoutes: require("./stripe"),
};

module.exports = routes;
