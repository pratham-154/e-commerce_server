const express =  require('express');
const bannerRouter = express.Router();

const BannerController = require('../../../controller/frontend/BannerController');

bannerRouter.get('/banner/index',BannerController.index);
bannerRouter.get('/banner/view/:id',BannerController.view);

module.exports = bannerRouter;