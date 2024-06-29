const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (callback) => {
  mongoClient
    .connect(
      "mongodb+srv://Shreyash:7QrTJUYFRoDu5YfM@cluster0.rziuebu.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then((client) => {
      _db = client.db();
      callback()
      console.log("Connected")
    })
    .catch((err) => console.log(err));
};

const getDB = () => {
  if (_db) return _db;
  throw "No database available";
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
