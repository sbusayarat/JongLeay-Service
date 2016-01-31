var User = require('../models/User');

function createInstance() {

    var model = User.create();

    return {
        getById: getById
    };

    function getById(req, res, next) {
        model.getById(req.params.id)
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