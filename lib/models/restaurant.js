var _ = require('underscore');
var AWS = require('aws-sdk');
var Promise = require('bluebird');

var TABLE_NAME_PREFIX = 'jl-restaurants-';

function createInstance() {
    AWS.config.region = 'us-west-2';

    var docClient = new AWS.DynamoDB.DocumentClient();

    return {
        list: list
    };

    function list() {
        var params = {
            TableName: TABLE_NAME_PREFIX + process.env.NODE_ENV,
            KeyConditionExpression: 'approvalStatus = :status',
            ExpressionAttributeValues: {
                ':status': 'approved'
            }
        };

        return new Promise(function (resolve, reject) {
            docClient.query(params, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    try {
                        resolve(formatResult(data));
                    } catch (err) {
                        reject(err);
                    }
                }
            });
        });
    }

    function formatResult(fromDb) {
        return _.map(fromDb.Items, function formatEach(item) {
            var data = JSON.parse(item.data);

            _.extendOwn(item, data);
            delete item.data;

            return _.omit(item, function isNullString(value) {
                return value === 'null';
            })
        });
    }
}

module.exports.create = createInstance;