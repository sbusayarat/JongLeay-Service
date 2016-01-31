var _ = require('underscore');
var Placement = require('../models/Placement');

function createInstance() {

    var model = Placement.create();

    return {
        getRestaurantQueue: getRestaurantQueue,
        getUserQueue: getUserQueue
    };

    function getUserQueue(req, res, next) {
        var userId = req.params.userId;

        model.getQueueByUserId(userId)
            .then(function (data) {
                if (!data) {
                    res.status(404).json({
                        message: 'User is not found'
                    });
                    next();
                    return;
                }

                res.json(data);
                next();
            })
            .catch(function (err) {
                next(err);
            });
    }

    function getRestaurantQueue(req, res, next) {
        var restaurantId = req.params.restaurantId;

        model.getQueueByRestaurantId(restaurantId)
            .then(function (data) {
                res.json(data);
                next();
            })
            .catch(function (err) {
                next(err);
            });
    }
}

module.exports = {
    create: createInstance
};