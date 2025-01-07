const express = require("express");
const productRouter = express.Router();

const ProductController = require("../../../controller/frontend/ProductController");
const User = require("../../../middleware/User");

productRouter.get("/product/index", ProductController.index);
productRouter.post("/product/update/:slug", User, ProductController.update);
productRouter.get("/product/view/:slug", User, ProductController.view);

module.exports = productRouter;
