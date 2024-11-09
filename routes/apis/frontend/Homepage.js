const express =  require('express');
const homepageRouter = express.Router();

const HomepageController = require('../../../controller/frontend/HomepageController');

homepageRouter.get('/homepage/view/:id',HomepageController.view);

module.exports = homepageRouter;