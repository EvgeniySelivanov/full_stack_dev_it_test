const { Router } = require('express');
const ApiController = require('../controllers/api.controller');
const rateLimiter = require('../middlewares/api.mw');
const apiRouter = Router();

apiRouter.post('/', rateLimiter, ApiController);

module.exports = apiRouter;
