const Product = require("../model/product");

// Get admin products
exports.getProducts = (req, res) => {
  Product.find()
    // .select("title imageUrl") // Selects only fields mentioned as params
    // .populate("userId", "username -_id") // Populates the parent collection data from the mentioned in model. Ex user data is populated just with userId
    .then((products) => {
      res.render("admin/products", {
        products: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

// Post products
exports.postAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
    userId: req.user,
  });
  product
    .save()
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

// Add products
exports.getAddProducts = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Products",
    path: "/admin/add-product",
    edit: false,
  });
};

// Get to edit a product
exports.getEditProduct = (req, res, next) => {
  const { edit: editMode } = req.query;
  const productId = req.params.productId;

  if (!editMode) return res.redirect("/");
  Product.findById(productId)
    .then((product) => {
      if (!product) return res.redirect("/");
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        edit: editMode,
        product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postUpdateProduct = (req, res, next) => {
  let { productId, title, imageUrl, price, description } = req.body;

  // Approach 1
  Product.updateOne({ _id: productId }, { title, imageUrl, price, description })
    .then((result) => {
      console.log(result);
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));

  // Approach 2
  // Product.findById(productId)
  //   .then((product) => {
  //     product.title = title;
  //     product.imageUrl = imageUrl;
  //     product.price = price;
  //     product.description = description;

  //     return product.save();
  //   })
  //   .then((result) => {
  //     console.log(result);
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res) => {
  const { productId } = req.body;
  Product.deleteOne({ _id: productId })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
