var AWS = require('aws-sdk');
var Promise = require('bluebird');

function createInstance() {
    AWS.config.accessKeyId = 'AKIAJQLV5HHIH4QP3PRQ';
    AWS.config.secretAccessKey = '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';
    AWS.config.region = 'us-west-2';

    var docClient = new AWS.DynamoDB.DocumentClient();

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