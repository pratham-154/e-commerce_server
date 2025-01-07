const express = require("express");
const orderRouter = express.Router();

const OrderController = require("../../../controller/admin/OrderController");

orderRouter.get("/admin/order/index", OrderController.index);
orderRouter.post("/admin/order/add", OrderController.add);
orderRouter.put("/admin/order/update/:id", OrderController.update);
orderRouter.delete("/admin/order/delete/:id", OrderController.remove);
orderRouter.get("/admin/order/view/:id", OrderController.view);

module.exports = orderRouter;
