const express =  require('express');
const homepageRouter = express.Router();

const HomepageController = require('../../../controller/admin/HomepageController');

homepageRouter.post('/admin/homepage/add',HomepageController.add);
homepageRouter.put('/admin/homepage/update/:id',HomepageController.update);
homepageRouter.get('/admin/homepage/view/:id',HomepageController.view);

module.exports =  homepageRouter;