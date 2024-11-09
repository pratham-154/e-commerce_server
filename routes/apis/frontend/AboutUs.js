const express =  require('express');
const aboutUsRouter = express.Router();

const AboutUsController = require('../../../controller/frontend/AboutUsController');

aboutUsRouter.get('/about-us/view/:id',AboutUsController.view);

module.exports =  aboutUsRouter;