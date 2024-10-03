const express =  require('express');
const faqsRouter = express.Router();

const FaqsController = require('../../../controller/admin/FaqsController');

faqsRouter.get('/admin/faqs/index',FaqsController.index);
faqsRouter.post('/admin/faqs/add',FaqsController.add);
faqsRouter.put('/admin/faqs/update/:id',FaqsController.update);
faqsRouter.delete('/admin/faqs/delete/:id',FaqsController.remove);
faqsRouter.get('/admin/faqs/view/:id',FaqsController.view);

module.exports =  faqsRouter;