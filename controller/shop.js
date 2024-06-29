const Product = require("../model/product");
const User = require("../model/user");
const Order = require("../model/orders");

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        products: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/product-list", {
        products: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProductDetails = (req, res) => {
  let { productId } = req.params;

  Product.findById(productId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((products) => {
      let cartItems = products.cart.items;
      res.render("shop/cart", {
        products: cartItems,
        pageTitle: "Cart",
        path: "/cart",
      });
    })
    .catch((err) => console.log(err));
};

exports.postAddToCart = (req, res, next) => {
  let prodId = req.body.productId;

  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log("Item added to cart");
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.deleteFromCart = (req, res, next) => {
  const productId = req.body.productId;
  req.user
    .deleteCartItems(productId)
    .then((result) => {
      console.log("Deleted successfully");
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.newOrders = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((products) => {
      let orderItems = products.cart.items.map((item) => {
        return { quantity: item.quantity, product: { ...item.productId._doc } };
      });
      const order = new Order({
        user: {
          username: req.user.username,
          userId: req.user,
        },
        products: orderItems,
      });
      return order.save();
    })
    .then((result) => {
      return req.user.clearCart();
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.render("shop/orders", {
        pageTitle: "My Orders",
        path: "/orders",
        orders,
      });
    })
    .catch((err) => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};
