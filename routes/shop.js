const express = require("express");

const router = express.Router();

const shopController = require("../controller/shop");

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/product/:productId", shopController.getProductDetails);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postAddToCart);

router.post("/delete-cart-items", shopController.deleteFromCart);

router.post("/new-order", shopController.newOrders);

router.get("/orders", shopController.getOrders);

// router.get("/checkout", shopController.getCheckout);

module.exports = router;
