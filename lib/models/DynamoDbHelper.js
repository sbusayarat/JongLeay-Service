var Promise = require('bluebird');

function executeQuery(docClient, params) {
    return new Promise(function (resolve, reject) {
        docClient.query(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                try {
                    resolve(data.Items);
                } catch (err) {
                    reject(err);
                }
            }
        });
    });
}

function executeQuerySingleItem(docClient, params) {
    return new Promise(function (resolve, reject) {
        docClient.query(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                try {
                    if (data.Items.length > 1) {
                        reject(new Error('More than one item is returned by the query'))
                        return;
                    }

                    resolve(data.Items.length === 0 ? null : data.Items[0]);
                } catch (err) {
                    reject(err);
                }
            }
        });
    });
}

module.exports = {
    executeQuery: executeQuery,
    executeQuerySingleItem: executeQuerySingleItem
};