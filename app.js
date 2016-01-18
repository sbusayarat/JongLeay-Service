var express    = require('express');
var bodyParser = require('body-parser');
var router     = require('./lib/router');

var app        = express();                 // define our app using express

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

app.listen(port);
console.info('Server started on port ' + port);