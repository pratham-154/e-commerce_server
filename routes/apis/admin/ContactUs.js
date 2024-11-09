const express =  require('express');
const contactUsRouter = express.Router();

const ContactUsController = require('../../../controller/admin/ContactUsController');

contactUsRouter.get('/admin/contact-us/index',ContactUsController.index);
contactUsRouter.post('/admin/contact-us/add',ContactUsController.add);
contactUsRouter.put('/admin/contact-us/update/:id',ContactUsController.update);
contactUsRouter.delete('/admin/contact-us/delete/:id',ContactUsController.remove);
contactUsRouter.get('/admin/contact-us/view/:id',ContactUsController.view);

module.exports =  contactUsRouter;