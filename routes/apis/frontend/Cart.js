const express =  require('express');
const cartRouter = express.Router();

const CartController = require('../../../controller/frontend/CartController');

cartRouter.get('/cart/index',CartController.index);
cartRouter.get('/cart/view/:id',CartController.view);

module.exports = cartRouter;