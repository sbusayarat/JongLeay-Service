var Restaurant = require('../models/Restaurant');

function createInstance() {

    var model = Restaurant.create();

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