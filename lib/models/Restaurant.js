var _ = require('underscore');
var AWS = require('aws-sdk');
var dynamoDbHelper = require('./dynamoDbHelper');
var geohash = require('ngeohash');

var TABLE_NAME_PREFIX = 'jl-restaurants-';

function createInstance() {
    AWS.config.region = 'us-west-2';

    var docClient = new AWS.DynamoDB.DocumentClient();

    return {
        list: list,
        post: post
    };

    function list() {
        var params = {
            TableName: TABLE_NAME_PREFIX + process.env.NODE_ENV,
            KeyConditionExpression: 'country = :country AND approvalStatus = :status',
            ExpressionAttributeValues: {
                ':country': 'USA',
                ':status': 'approved'
            },
            IndexName: 'approval-index'
        };

        return dynamoDbHelper.executeQuery(docClient, params, formatItem);
    }

    function post(item) {
        item.id = geohash.encode_int(item.lat, item.lon, 52);
        item.approvalStatus = 'pending';

        var params = {
            TableName: TABLE_NAME_PREFIX + process.env.NODE_ENV,
            Item: item
        };

        return dynamoDbHelper.executePut(docClient, params)
            .then(function() {
                return item;
            });
    }

    function formatItem(item) {
        return _.omit(item, function isNullString(value) {
            return value === 'null';
        })
    }
}

module.exports.create = createInstance;