const express = require("express");
const uploadsRouter = express.Router();

const UploadsController = require("../../../controller/frontend/UploadsController");

uploadsRouter.post("/uploads/uploadImage", UploadsController.upload);
uploadsRouter.delete("/uploads/deleteImage", UploadsController.deleteImage);

module.exports = uploadsRouter;
