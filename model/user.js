const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          requried: true,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  let prodIndex = this.cart?.items?.findIndex(
    (pd) => pd.productId.toString() === product._id.toString()
  );

  let updatedCartItems = this.cart?.items ? [...this.cart.items] : [];
  if (prodIndex >= 0) {
    updatedCartItems[prodIndex].quantity =
      updatedCartItems[prodIndex].quantity + 1;
  } else {
    updatedCartItems?.push({ productId: product._id, quantity: 1 });
  }

  let updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  this.save();
};

userSchema.methods.deleteCartItems = function (productId) {
  let modifiedCartItems = this.cart?.items?.filter(
    (item) => item.productId.toString() !== productId
  );

  this.cart.items = modifiedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model("User", userSchema);

// const database = require("../utils/database");
// const { ObjectId } = require("mongodb");

// class User {
//   constructor(username, email, cart, userId) {
//     this.user = username;
//     this.email = email;
//     this.cart = cart;
//     this.userId = userId;
//   }

//   save() {
//     const db = database.getDB();
//     return db.collection("users").insertOne(this);
//   }

//   addToCart(product) {
//     const db = database.getDB();
//     let prodIndex = this.cart?.items?.findIndex(
//       (pd) => pd.productid.toString() == product._id.toString()
//     );

//     let updatedCartItems = this.cart?.items ? [...this.cart.items] : [];
//     if (prodIndex >= 0) {
//       updatedCartItems[prodIndex].quantity =
//         updatedCartItems[prodIndex].quantity + 1;
//     } else {
//       updatedCartItems?.push({ productid: product._id, quantity: 1 });
//     }

//     let updatedCart = {
//       items: updatedCartItems,
//     };
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new ObjectId(this.userId) },
//         { $set: { cart: updatedCart } }
//       );
//   }

//   static getCartItems(cart) {
//     const db = database.getDB();
//     let itemIndex = cart?.items?.map((i) => i.productid);
//     if (itemIndex?.length > 0) {
//       return db
//         .collection("products")
//         .find({ _id: { $in: itemIndex } })
//         .toArray()
//         .then((products) => {
//           return products.map((p) => {
//             return {
//               ...p,
//               quantity: cart.items.find((quan) => {
//                 return quan.productid.toString() === p._id.toString();
//               }).quantity,
//             };
//           });
//         });
//     } else {
//       return Promise.resolve([]);
//     }
//   }

//   static deleteCartItems(cart, productId, userId) {
//     let modifiedCartItems = cart?.items?.filter(
//       (item) => item.productid.toString() !== productId
//     );

//     const db = database.getDB();
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new ObjectId(userId) },
//         { $set: { cart: { items: modifiedCartItems } } }
//       );
//   }

//   static findById(userId) {
//     const db = database.getDB();

//     return db.collection("users").findOne({ _id: new ObjectId(userId) });
//   }

//   static newOrder(user) {
//     let { cart, _id, name } = user;
//     const db = database.getDB();

//     return this.getCartItems(cart)
//       .then((products) => {
//         const order = {
//           items: products,
//           user: {
//             _id,
//             name,
//           },
//         };
//         return db.collection("orders").insertOne(order);
//       })
//       .then((result) => {
//         return db
//           .collection("users")
//           .updateOne({ _id: _id }, { $set: { cart: { items: [] } } });
//       })
//       .catch((err) => console.log(err));
//   }

//   static getOrders(userId) {
//     const db = database.getDB();
//     return db
//       .collection("orders")
//       .find({ "user._id": new ObjectId(userId) })
//       .toArray();
//   }
// }

// module.exports = User;
