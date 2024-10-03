const express =  require('express');
const productCategoryRouter = express.Router();

const ProductCategoryController = require('../../../controller/admin/ProductCategoryController');

productCategoryRouter.get('/admin/product-category/index',ProductCategoryController.index);
productCategoryRouter.post('/admin/product-category/add',ProductCategoryController.add);
productCategoryRouter.put('/admin/product-category/update/:id',ProductCategoryController.update);
productCategoryRouter.delete('/admin/product-category/delete/:id',ProductCategoryController.remove);
productCategoryRouter.get('/admin/product-category/view/:id',ProductCategoryController.view);

module.exports =  productCategoryRouter;