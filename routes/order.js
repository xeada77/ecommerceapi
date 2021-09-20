const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const Order = require("../models/Order");

// CREATE ORDER
router.post("/", verifyToken, async (req, res) => {
  req.body.userId = req.user.id;
  const newOrder = new Order(req.body);

  try {
    const newOrderSaved = await newOrder.save();
    res.status(200).json(newOrderSaved);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// UPDATE ORDER
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// DELETE ORDER
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "El pedido ha sido borrado..." });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// GET USER ORDERS (:id => userId)
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// GET ALL ORDERS (admin route)
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const data = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});
module.exports = router;
