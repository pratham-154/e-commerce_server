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
db.user = require("../entity/User")(dbConnection, mongoose);
db.faqs = require("../entity/Faqs")(dbConnection, mongoose);
db.cms = require("../entity/Cms")(dbConnection, mongoose);
db.productCategory = require("../entity/ProductCategory")(dbConnection, mongoose);
db.product = require("../entity/Product")(dbConnection, mongoose);
db.banner = require("../entity/Banner")(dbConnection, mongoose);
db.homepage = require("../entity/Homepage")(dbConnection, mongoose);
db.feedback = require("../entity/Feedback")(dbConnection, mongoose);
db.contactUs = require("../entity/ContactUs")(dbConnection, mongoose);
db.aboutUs = require("../entity/AboutUs")(dbConnection, mongoose);
db.partner = require("../entity/Partner")(dbConnection, mongoose);
db.address = require("../entity/Address")(dbConnection, mongoose);
db.order = require("../entity/Order")(dbConnection, mongoose);
db.cart = require("../entity/Cart")(dbConnection, mongoose);

module.exports = db;
