//var dataNormalizer = require('./dataNomalizer'),
var http       = require('http');
var Eventbrite = require('eventbrite');
var config     = require('../config/config');

var makeRequest = function(requestParams, callback) {
    var datas = "";
    var request = http.request(requestParams, function(response) {
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            datas += chunk;
        });
        response.on('end', function () {
            if(callback) { callback(datas); }
        });
    });
    request.end();
}

exports.getRestaurants = function(callback) {
    var requestOptions = {
        host: config.dataProvenceApi.host,
        port: config.dataProvenceApi.port,
        method: config.dataProvenceApi.method,
        path: '/v1/dataprovencetourisme/Restaurants/?format=json',
    };

    makeRequest(requestOptions, function(data) {
        if(callback) { callback(data); }
    });
}

exports.getEvents = function(callback) {
    console.log({'app_key':config.eventbriteApi.apiKey, 'user_key':config.eventbriteApi.userKey});
    var eventbriteClient = Eventbrite({'app_key':config.eventbriteApi.apiKey, 'user_key':config.eventbriteApi.userKey});

    var params = {'city': "San Francisco", 'region': "CA"};

    eventbriteClient.event_search( params, function(err, data){
        console.log(err);
        console.log(data);
        callback(data);
    });
}
