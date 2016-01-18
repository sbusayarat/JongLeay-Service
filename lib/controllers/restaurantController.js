var restaurant = require('../models/restaurant');

function createInstance() {

    var model = restaurant.create();

    return {
        list: list
    };

    function list(req, res, next) {
        var area = req.query.area;

        area = area ? area.toLowerCase() : area;

        model.list(area)
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