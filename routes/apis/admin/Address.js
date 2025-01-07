const express = require("express");
const addressRouter = express.Router();

const AddressController = require("../../../controller/admin/AddressController");

addressRouter.get("/admin/address/index", AddressController.index);
addressRouter.post("/admin/address/add", AddressController.add);
addressRouter.put("/admin/address/update/:id", AddressController.update);
addressRouter.delete("/admin/address/delete/:id", AddressController.remove);
addressRouter.get("/admin/address/view/:id", AddressController.view);

module.exports = addressRouter;
