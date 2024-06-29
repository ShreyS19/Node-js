const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    requried: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    requried: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);

// const { ObjectId } = require("mongodb");
// const getDB = require("../utils/database").getDB;

// class Product {
//   constructor(title, imageUrl, price, description, userId) {
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.price = price;
//     this.description = description;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDB();
//     return db
//       .collection("products")
//       .insertOne(this)
//       .then((result) => console.log(result))
//       .catch((err) => console.log(err));
//   }

//   update(prodId) {
//     const db = getDB();
//     return db
//       .collection("products")
//       .updateOne({ _id: new ObjectId(prodId) }, { $set: this })
//       .then((result) => {
//         return result;
//       })
//       .catch((err) => console.log(err));
//   }

//   static delete(prodId) {
//     const db = getDB();
//     return db
//       .collection("products")
//       .deleteOne({ _id: new ObjectId(prodId) })
//       .then((result) => {
//         return result;
//       })
//       .catch((err) => console.log(err));
//   }

//   static fetchAll() {
//     const db = getDB();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         return products;
//       })
//       .catch((err) => console.log(err));
//   }

//   static findById(prodId) {
//     const db = getDB();
//     return db
//       .collection("products")
//       .find({ _id: new ObjectId(prodId) })
//       .next()
//       .then((product) => {
//         return product;
//       })
//       .catch((err) => console.log(err));
//   }
// }

// module.exports = Product;
