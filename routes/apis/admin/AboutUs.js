const express =  require('express');
const aboutUsRouter = express.Router();

const AboutUsController = require('../../../controller/admin/AboutUsController');

aboutUsRouter.get('/admin/about-us/index',AboutUsController.index);
aboutUsRouter.post('/admin/about-us/add',AboutUsController.add);
aboutUsRouter.put('/admin/about-us/update/:id',AboutUsController.update);
aboutUsRouter.delete('/admin/about-us/delete/:id',AboutUsController.remove);
aboutUsRouter.get('/admin/about-us/view/:id',AboutUsController.view);

module.exports =  aboutUsRouter;