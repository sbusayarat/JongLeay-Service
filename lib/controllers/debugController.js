function debug(req, res, next) {
    res.json({
        port: process.env.PORT,
        accessKey: process.env.AWS_ACCESS_KEY_ID
    });
}

module.exports.debug = debug;