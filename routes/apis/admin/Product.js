const express =  require('express');
const productRouter = express.Router();

const ProductController = require('../../../controller/admin/ProductController');

productRouter.get('/admin/product/index',ProductController.index);
productRouter.post('/admin/product/add',ProductController.add);
productRouter.put('/admin/product/update/:id',ProductController.update);
productRouter.delete('/admin/product/delete/:id',ProductController.remove);
productRouter.get('/admin/product/view/:slug',ProductController.view);

module.exports =  productRouter;