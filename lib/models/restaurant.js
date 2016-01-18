var AWS = require('aws-sdk');
var Promise = require('bluebird');

function createInstance() {

    var docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});

    return {
        list: list
    };

    function list() {
        var params = {
            TableName: 'jl-restaurants-production',
            KeyConditionExpression: 'Area = :area AND ApprovalStatus = :status',
            ExpressionAttributeValues: {
                ':area': 'Seattle',
                ':status': 'Approved'
            }
        };

        return new Promise(function (resolve, reject) {
            docClient.query(params, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}

module.exports.create = createInstance;