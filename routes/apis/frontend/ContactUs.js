const express =  require('express');
const contactUsRouter = express.Router();

const ContactUsController = require('../../../controller/frontend/ContactUsController');

contactUsRouter.post('/contact-us/add',ContactUsController.add);
contactUsRouter.put('/contact-us/update/:id',ContactUsController.update);
contactUsRouter.get('/contact-us/view/:id',ContactUsController.view);

module.exports = contactUsRouter;