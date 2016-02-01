var User = require('../models/User');

function createInstance() {

    var model = User.create();

    return {
        getById: getById
    };

    function getById(req, res, next) {
        model.getById(req.params.id)
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
}

module.exports = {
    create: createInstance
};