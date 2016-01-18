var express = require('express');
var restaurantController = require('./controllers/restaurantController');

var controller = restaurantController.create();

var router = express.Router();              // get an instance of the express Router

router.get('/restaurants', controller.list);

module.exports = router;