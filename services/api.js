//var dataNormalizer = require('./dataNomalizer'),
var http       = require('http');
var Eventbrite = require('eventbrite');
var config     = require('../config/config');
var xml2js = require('xml2js');

var dataProvenceApi = {host: 'dataprovence.cloudapp.net', port: '8080' };
var nominatimOSMApi = {host: 'nominatim.openstreetmap.org', port: '80' };
var meteorologicApi = {host: 'api.meteorologic.net', port: '80' };

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

exports.getRestaurants = function(latitude,longitude,callback) {
    var requestOptions = {
        host: dataProvenceApi.host,
        port: dataProvenceApi.port,
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

var getCity = function(latitude,longitude,callback) {
//http://nominatim.openstreetmap.org/reverse?format=json&lat=43,4834507&lon=5,381985&zoom=18&addressdetails=1

    var requestOptions = {
        host: nominatimOSMApi.host,
        port: nominatimOSMApi.port,
        path: '/reverse?format=json&lat='+latitude+'&lon='+longitude+'&zoom=18&addressdetails=1'
    };

    makeRequest(requestOptions, function(data) {
        if(callback) { callback(JSON.parse(data).address.city); }
    });
}

exports.getWeather = function(latitude,longitude,callback) {

    var callbackCity = function(city) {
        var requestOptions = {
            host: meteorologicApi.host,
            port: meteorologicApi.port,
            path: '/forecarss?p='+city
        };
        var parser = new xml2js.Parser();
        makeRequest(requestOptions, function(data) {
        console.log("felix",data);
        if(callback) {
            parser.parseString(data, function (err, result) { callback(result);}) }
        });
    }
    getCity(latitude,longitude,callbackCity);
}
