const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { catchErrors } = require('./errorHandlers');

router.get('/', controller.home);

router.get('/get', catchErrors(controller.getAllItems));

module.exports = router;
