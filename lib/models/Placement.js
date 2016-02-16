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
        return getPlacementsByRestaurantId(restaurantId)
            .then(function formatResult(placements) {
                return {
                    restaurantId: restaurantId,
                    queue: _.map(placements, function formatEach(item) {
                        delete item.restaurantId;
                        return item;
                    })
                }
            });
    }

    function getPlacementsByRestaurantId(restaurantId) {
        var params = {
            TableName: TABLE_NAME_PREFIX + process.env.NODE_ENV,
            KeyConditionExpression: 'restaurantId = :restaurantId',
            ExpressionAttributeValues: {
                ':restaurantId': restaurantId
            }
        };

        return dynamoDbHelper.executeQuery(docClient, params, formatItem);
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

        return dynamoDbHelper.executeQuerySingleItem(docClient, params, formatItem)
            .then(getRestaurantPlancements)
            .then(formatUserQueue);

        function getRestaurantPlancements(userPlacement) {
            if (!userPlacement) {
                return [];
            }

            return getPlacementsByRestaurantId(userPlacement.restaurantId);
        }

        function formatUserQueue(placements) {
            var userIndex = _.findIndex(placements, function isUserPlacement(placement) {
                return placement.userId === userId;
            });

            if (userIndex === -1) {
                return null;
            }

            return _.extend(placements[userIndex], {
                currentPosition: userIndex
            });
        }
    }

    function formatItem(item) {
        item.placeTime = new Date(item.placeTime);
        return item;
    }
}

module.exports.create = createInstance;