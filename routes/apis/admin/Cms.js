const express = require('express');
const cmsRouter = express.Router();

const CmsController = require('../../../controller/admin/CmsController');

cmsRouter.get('/admin/cms/index',CmsController.index);
cmsRouter.post('/admin/cms/add',CmsController.add);
cmsRouter.put('/admin/cms/update/:id',CmsController.update);
cmsRouter.delete('/admin/cms/delete/:id',CmsController.remove);
cmsRouter.get('/admin/cms/view/:id',CmsController.view);

module.exports = cmsRouter;