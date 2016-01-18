var restaurant = require('../models/restaurant');

function createInstance() {

    var model = restaurant.create();

    return {
        list: list
    };

    function list(req, res, next) {

        model.list()
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