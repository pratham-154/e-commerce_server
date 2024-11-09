const express =  require('express');
const partnerRouter = express.Router();

const PartnerController = require('../../../controller/admin/PartnerController');

partnerRouter.get('/admin/partner/index',PartnerController.index);
partnerRouter.post('/admin/partner/add',PartnerController.add);
partnerRouter.put('/admin/partner/update/:id',PartnerController.update);
partnerRouter.delete('/admin/partner/delete/:id',PartnerController.remove);
partnerRouter.get('/admin/partner/view/:id',PartnerController.view);

module.exports =  partnerRouter;