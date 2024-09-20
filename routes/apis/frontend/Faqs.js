const express =  require('express');
const faqsRouter = express.Router();

const FaqsController = require('../../../controller/frontend/FaqsController');

faqsRouter.get('/faqs',FaqsController.index);

module.exports =  faqsRouter;