const { Router } = require('express');
const validateIndex = require('../middlewares/validateIndex.mw');
const rateLimiter = require('../middlewares/api.mw');
const ApiController = require('../controllers/api.controller');
const apiRouter = Router();

apiRouter.post('/',validateIndex, rateLimiter, ApiController);

module.exports = apiRouter;
