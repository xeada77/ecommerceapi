const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const Cart = require("../models/Cart");

// CREATE CART
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Product(req.body);

  try {
    const newCartSaved = await newCart.save();
    res.status(200).json(newCartSaved);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// UPDATE CART
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// DELETE CART
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "El carrito ha sido borrado..." });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// GET USER CART (:id => userId)
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(200).json({ message: "No existe carrito para este usuario." });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

// GET ALL CARTS (admin route)
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ error });
  }
});
module.exports = router;
