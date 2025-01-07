const express = require("express");
const orderRouter = express.Router();

const OrderController = require("../../../controller/frontend/OrderController");
const User = require("../../../middleware/User");

orderRouter.get("/order/index", User, OrderController.index);
orderRouter.post("/order/add/:slug", User, OrderController.add);
orderRouter.put("/order/update/:id", OrderController.update);
orderRouter.delete("/order/delete/:id", OrderController.remove);
orderRouter.get("/order/view/:slug", User, OrderController.view);

module.exports = orderRouter;
