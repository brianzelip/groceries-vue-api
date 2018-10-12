const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { catchErrors } = require('./errorHandlers');
const cors = require('cors');

router.get('/', controller.home);

router.get('/get', cors(), catchErrors(controller.getAllItems));

module.exports = router;