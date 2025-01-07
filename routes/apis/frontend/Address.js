const express = require("express");
const addressRouter = express.Router();

const AddressController = require("../../../controller/frontend/AddressController");
const User = require("../../../middleware/User");

addressRouter.get("/address/index", AddressController.index);
addressRouter.post("/address/add", User, AddressController.add);
addressRouter.put("/address/update/:id", User, AddressController.update);
addressRouter.delete("/address/delete/:id", User, AddressController.remove);
addressRouter.get("/address/view", User, AddressController.view);

module.exports = addressRouter;
