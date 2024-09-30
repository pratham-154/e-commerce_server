const express =  require('express');
const faqsRouter = express.Router();

const FaqsController = require('../../../controller/frontend/FaqsController');

faqsRouter.get('/faqs/index',FaqsController.index);
faqsRouter.get('/faqs/view/:id',FaqsController.view);


module.exports =  faqsRouter;