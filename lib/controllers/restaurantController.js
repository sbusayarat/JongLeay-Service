function list(req, res, next) {
    var fakeList = [
        {
            name: 'foo'
        },
        {
            name: 'foo2'
        }
    ];

    res.json(fakeList);
}

module.exports = {
    list: list
};