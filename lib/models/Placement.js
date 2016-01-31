var _ = require('underscore');
var AWS = require('aws-sdk');
var dynamoDbHelper = require('./dynamoDbHelper');

var TABLE_NAME_PREFIX = 'jl-placements-';

function createInstance() {
    AWS.config.region = 'us-west-2';

    var docClient = new AWS.DynamoDB.DocumentClient();

    return {
        getQueueByRestaurantId: getQueueByRestaurantId,
        getQueueByUserId: getQueueByUserId
    };

    function getQueueByRestaurantId(restaurantId) {
        var params = {
            TableName: TABLE_NAME_PREFIX + process.env.NODE_ENV,
            KeyConditionExpression: 'restaurantId = :restaurantId',
            ExpressionAttributeValues: {
                ':restaurantId': restaurantId
            }
        };

        return dynamoDbHelper.executeQuery(docClient, params);
    }

    function getQueueByUserId(userId) {
        var params = {
            TableName: TABLE_NAME_PREFIX + process.env.NODE_ENV,
            IndexName: 'userId-index',
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        };

        return dynamoDbHelper.executeQuery(docClient, params);
    }
}

module.exports.create = createInstance;