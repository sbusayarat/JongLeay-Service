var _ = require('underscore');
var AWS = require('aws-sdk');
var dynamoDbHelper = require('./dynamoDbHelper');

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

        return dynamoDbHelper.executeQuery(docClient, params, formatItem);
    }

    function formatItem(item) {
        var data = JSON.parse(item.data);

        _.extendOwn(item, data);
        delete item.data;

        return _.omit(item, function isNullString(value) {
            return value === 'null';
        })
    }
}

module.exports.create = createInstance;