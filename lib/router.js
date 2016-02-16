var express = require('express');
var RestaurantController = require('./controllers/RestaurantController');
var UserController = require('./controllers/UserController');
var PlacementController = require('./controllers/PlacementController');
var debugController = require('./controllers/debugController');

var restaurantController = RestaurantController.create();
var userController = UserController.create();
var placementController = PlacementController.create();

var router = express.Router();              // get an instance of the express Router

router.get('/restaurants', restaurantController.list);
router.post('/restaurants', restaurantController.post);

router.get('/users/:id', userController.getById);
router.get('/restaurantQueues/:restaurantId', placementController.getRestaurantQueue);
router.get('/userQueues/:userId', placementController.getUserQueue);
router.get('/debug', debugController.debug);

module.exports = router;

