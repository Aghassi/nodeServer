// imports
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

// server
var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/rest/getPlaces', function (req, res) {
    // Define base URL and addition appended strings
    var baseURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    var location = 'location=' + /*latitude*/ + ',' + /*longitude*/ + '&';
    var radius = 'radius=' + /*radius*/ + '&';
    var type = 'types=';/*types*/

    request({url: baseURL, json: true},
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(body);
        }
    });
});

app.post('/nearByPlaces', function (req, res) {
    var latitude = req.body.latitude;
    res.json(latitude);
});

var server = app.listen(9000, function () {
    var host = server.address().address;
    var port = server.address.port;

    console.log('Example app listening at http://%s%s', host, port);
});