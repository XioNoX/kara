var dataNormalizer = require('./dataNormalizer');
var http = require('http');
var config = require('../config/config');

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
        if(callback) { 
	    data=dataNormalizer.normalize(JSON.parse(data).d);
	    callback(data); }
    });
}

exports.getEvents = function(callback) {

}
