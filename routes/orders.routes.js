const express = require("express");

// Controllers
const {
  addProductToCart,
  getUserCart,
  updateProductCart,
  purchaseOrder,
  getUsersOrders,
} = require("../controllers/orders.controller");

// Middlewares
const {
  updateProductCartValidations,
  validateResult,
} = require("../middlewares/validators.middleware");
const { protectSession } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(protectSession);

// Get user's cart
router.get("/get-cart", getUserCart);

// Add product to cart
router.post("/add-product-to-cart", addProductToCart);

// Update cart product quantity
router.patch(
  "/update-cart-product",
  updateProductCartValidations,
  validateResult,
  updateProductCart
);

// Remove product from cart

// Create order
router.patch("/purchase-order", purchaseOrder);

// Get user's orders
router.get("/get-user-orders", getUsersOrders);

module.exports = { ordersRouter: router };
