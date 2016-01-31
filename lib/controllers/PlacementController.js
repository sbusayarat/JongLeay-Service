var _ = require('underscore');
var Placement = require('../models/Placement');

function createInstance() {

    var model = Placement.create();

    return {
        getQueue: getQueue
    };

    function getQueue(req, res, next) {
        var restaurantId = req.query.restaurantId;
        var userId = req.query.userId;

        if (restaurantId && userId) {
            res.status(409).json({
                message: 'restaurantId and userId query params cannot be specified at the same time'
            });
            next();
            return;
        }

        if (!restaurantId && !userId) {
            res.status(400).json({
                message: 'restaurantId or userId query param is required'
            });
            next();
            return;
        }

        var modelFn = restaurantId ? _.partial(model.getQueueByRestaurantId, restaurantId) :
                                     _.partial(model.getQueueByUserId, userId);

        modelFn()
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