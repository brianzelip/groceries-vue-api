const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { catchErrors } = require('./errorHandlers');

router.get('/', controller.home);

router.get('/get', catchErrors(controller.getAllItems));

router.post('/submit', controller.submit);

router.post('/create', catchErrors(controller.createItem));

router.post('/edit/:_id', catchErrors(controller.updateItem));

module.exports = router;
