var express = require('express');
var restaurantController = require('./controllers/restaurantController');

var router = express.Router();              // get an instance of the express Router

router.get('/restaurants', restaurantController.list);

module.exports = router;