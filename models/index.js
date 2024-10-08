const mongoose = require("mongoose");
require("dotenv").config();

const connectionString = "mongodb://localhost:27017/e-commerce";
//const connectionString = 'mongodb+srv://globiz:globiz_new@cluster0.lbgxc4q.mongodb.net/rapid';

try {
  var dbConnection = mongoose.createConnection(connectionString);
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};
db.mongoose = mongoose;
db.dbConnection = dbConnection;

// Entity
db.faqs = require("../entity/Faqs")(dbConnection, mongoose);
db.cms = require("../entity/Cms")(dbConnection, mongoose);
db.productCategory = require("../entity/ProductCategory")(dbConnection, mongoose);
db.product = require("../entity/Product")(dbConnection, mongoose);

module.exports = db;
