const express =  require('express');
const bannerRouter = express.Router();

const BannerController = require('../../../controller/admin/BannerController');

bannerRouter.get('/admin/banner/index',BannerController.index);
bannerRouter.post('/admin/banner/add',BannerController.add);
bannerRouter.put('/admin/banner/update/:id',BannerController.update);
bannerRouter.delete('/admin/banner/delete/:id',BannerController.remove);
bannerRouter.get('/admin/banner/view/:id',BannerController.view);

module.exports =  bannerRouter;