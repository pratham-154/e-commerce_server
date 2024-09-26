const express =  require('express');
const faqsRouter = express.Router();

const FaqsController = require('../../../controller/admin/FaqsController');

faqsRouter.get('/admin/faqs',FaqsController.index);
faqsRouter.post('/admin/faq/add',FaqsController.add);
faqsRouter.put('/admin/faq/edit/:id',FaqsController.edit);
faqsRouter.delete('/admin/faq/delete/:id',FaqsController.remove);
faqsRouter.get('/admin/faq/view/:id',FaqsController.view);

module.exports =  faqsRouter;