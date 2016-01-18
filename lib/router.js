var express = require('express');
var RestaurantController = require('./controllers/restaurantController');
var debugController = require('./controllers/debugController');

var restaurantController = RestaurantController.create();

var router = express.Router();              // get an instance of the express Router

router.get('/restaurants', restaurantController.list);

router.get('/debug', debugController.debug);

module.exports = router;