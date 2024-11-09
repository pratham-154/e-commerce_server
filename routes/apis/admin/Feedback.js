const express =  require('express');
const feedbackRouter = express.Router();

const FeedbackController = require('../../../controller/admin/FeedbackController');

feedbackRouter.get('/admin/feedback/index',FeedbackController.index);
feedbackRouter.post('/admin/feedback/add',FeedbackController.add);
feedbackRouter.put('/admin/feedback/update/:id',FeedbackController.update);
feedbackRouter.delete('/admin/feedback/delete/:id',FeedbackController.remove);
feedbackRouter.get('/admin/feedback/view/:id',FeedbackController.view);

module.exports =  feedbackRouter;