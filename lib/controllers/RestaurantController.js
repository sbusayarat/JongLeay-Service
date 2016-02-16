var redis = require('redis');
var client = redis.createClient();
var Restaurant = require('../models/Restaurant');
var Promise = require('bluebird');
var proximity = require('../geo-proximity/main').initialize(client);

//var proximity = require('geo-proximity').initialize(client)

function createInstance() {

    //addLocationPromise(43.6667, -79.4167,  'Toronto')
    //    .then(function (reply) {
    //        return addLocationPromise(39.9523, -75.1638,  'Philadelphia');
    //    })
    //    .then(function (reply) {
    //        return addLocationPromise(37.4688, -122.1411, 'Palo Alto');
    //    })
    //    .then(function (reply) {
    //        return addLocationPromise(337.7691, -122.4449, 'San Francisco');
    //    })
    //    .catch(function (err) {
    //        console.error(err.stack || err);
    //    });

    //nearByPromise(37.7691, -122.4449, 7000000)
    //    .then(function (reply) {
    //        console.log(reply)
    //    })
    //    .catch(function (err) {
    //        console.error(err.stack || err);
    //    });

    //function addLocationPromise(lat, lon, name) {
    //    return new Promise(function (resolve, reject) {
    //        proximity.addLocation(lat, lon, name, function (err, reply) {
    //            if (err) {
    //                return reject(err);
    //            }
    //            else {
    //                resolve(reply);
    //            }
    //        });
    //    });
    //}
    //
    //function nearByPromise(lat, lon, radius) {
    //    return new Promise(function (resolve, reject) {
    //        proximity.nearby(lat, lon, radius, function (err, reply) {
    //            if (err) {
    //                return reject(err);
    //            }
    //            else {
    //                resolve(reply);
    //            }
    //        });
    //    });
    //}


    var model = Restaurant.create();

    return {
        list: list,
        post: post
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

    function post(req, res, next) {
        var item = req.body;
        model.post(item)
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