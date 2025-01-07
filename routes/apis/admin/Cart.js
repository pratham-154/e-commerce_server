const express =  require('express');
const cartRouter = express.Router();

const CartController = require('../../../controller/admin/CartController');

cartRouter.get('/admin/cart/index',CartController.index);
cartRouter.post('/admin/cart/add',CartController.add);
cartRouter.put('/admin/cart/update/:id',CartController.update);
cartRouter.delete('/admin/cart/delete/:id',CartController.remove);
cartRouter.get('/admin/cart/view/:id',CartController.view);

module.exports =  cartRouter;