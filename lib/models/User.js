var _ = require('underscore');
var AWS = require('aws-sdk');
var dynamoDbHelper = require('./dynamoDbHelper');

var TABLE_NAME_PREFIX = 'jl-users-';

function createInstance() {
    AWS.config.region = 'us-west-2';

    var docClient = new AWS.DynamoDB.DocumentClient();

    return {
        getById: getById
    };

    function getById(id) {
        var params = {
            TableName: TABLE_NAME_PREFIX + process.env.NODE_ENV,
            KeyConditionExpression: 'id = :id',
            ExpressionAttributeValues: {
                ':id': id
            }
        };

        return dynamoDbHelper.executeQuerySingleItem(docClient, params);
    }
}

module.exports.create = createInstance;