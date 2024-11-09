const express =  require('express');
const partnerRouter = express.Router();

const PartnerController = require('../../../controller/frontend/PartnerController');

partnerRouter.get('/partner/index',PartnerController.index);

module.exports =  partnerRouter;