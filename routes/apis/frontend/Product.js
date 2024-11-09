const express =  require('express');
const productRouter = express.Router();

const ProductController = require('../../../controller/frontend/ProductController');

productRouter.get('/product/index',ProductController.index);
productRouter.get('/product/view/:slug',ProductController.view);


module.exports = productRouter;