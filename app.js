const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
// const mongoConnect = require("./utils/database").mongoConnect;
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRouter = require("./routes/shop");
const User = require("./model/user");

const { error404 } = require("./controller/error");
const { default: mongoose } = require("mongoose");

app.use(bodyParser.urlencoded({ extended: false }));

// Below line will help in serving a file statically
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("6674f465d49db863bc1c83fa")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminData);
app.use(shopRouter);

mongoose
  .connect(
    "mongodb+srv://Shreyash:7QrTJUYFRoDu5YfM@cluster0.rziuebu.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((client) => {
    User.findOne().then((user) => {
      if (!user) {
        User.create({
          username: "Shreyash",
          email: "sshreyash192@gmail.com",
          cart: {
            items: [],
          },
        });
      }
    });
    console.log("Connected");
    app.listen(3000);
  })
  .catch((err) => console.log(err));

app.use(error404);
