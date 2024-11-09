const express =  require('express');
const feedbackRouter = express.Router();

const FeedbackController = require('../../../controller/frontend/FeedbackController');

feedbackRouter.get('/feedback/index',FeedbackController.index);
feedbackRouter.get('/feedback/view/:id',FeedbackController.view);

module.exports = feedbackRouter;