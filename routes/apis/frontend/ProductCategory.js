const express =  require('express');
const productCategoryRouter = express.Router();

const ProductCategoryController = require('../../../controller/frontend/ProductCategoryController');

productCategoryRouter.get('/product-category/index',ProductCategoryController.index);
productCategoryRouter.get('/product-category/view/:id',ProductCategoryController.view);


module.exports = productCategoryRouter;