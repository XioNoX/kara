var dataNormalizer = require('./dataNormalizer');
var http           = require('http');
var https          = require('https');
var Eventbrite     = require('eventbrite');
var config         = require('../config/config');
var xml2js         = require('xml2js');
var Yelp           = require("yelp");
var Poi            = require("../models/Poi");

var dataProvenceApi = {host: 'dataprovence.cloudapp.net', port: '8080' };
var nominatimOSMApi = {host: 'nominatim.openstreetmap.org', port: '80' };
var meteorologicApi = {host: 'api.meteorologic.net', port: '80' };
var googleMapsApi   = {host: 'maps.googleapis.com', port: '443' };

var makeRequest = function(requestParams, callback) {
    var datas = "";
    var httptype=http;
    if (requestParams.port=='443')
        httptype = https;
    var request = httptype.request(requestParams, function(response) {
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

var getRestaurants = function(callback) {
    var requestOptions = {
        host: dataProvenceApi.host,
        port: dataProvenceApi.port,
        path: '/v1/dataprovencetourisme/Restaurants/?format=json',
    };

    makeRequest(requestOptions, function(data) {
        if(callback) {
            data = dataNormalizer.normalize_open_data(JSON.parse(data).d);
            callback(data);
        }
    });
}

var getEvents = function(latitude,longitude,date,callback) {
    if(!date)
    var date="Today";
    var callbackCity = function(city) {
        if(callback) {
            var eventbriteClient = Eventbrite({'app_key':config.eventbriteApi.apiKey, 'user_key':config.eventbriteApi.userKey});
            var params = {'city': city, 'country': "FR", date: date};
            eventbriteClient.event_search( params, function(err, data){
                console.log(err);
                console.log(data);
                callback(data);
            });
        };
    }
    getCity(latitude,longitude,callbackCity);
}

exports.getMonuments = function(callback) {
    var requestOptions = {
        host: dataProvenceApi.host,
        port: dataProvenceApi.port,
        path: '/v1/dataprovencetourisme/importPatio22/?format=json',
    };

    makeRequest(requestOptions, function(data) {
        if(callback) {
            data = dataNormalizer.normalize_open_data(JSON.parse(data).d);
            callback(data);
        }
    });
}

exports.getPois = function(type, latitude, longitude, callback) {
    switch(type) {
        case Poi.types["restaurants"]:
            getRestaurants(callback);
            break;
        case Poi.types["events"]:
            getEvents(latitude, longitude, null, callback);
            break;
    }
}


exports.getGooglePlaces = function(latitude,longitude,types,callback){
// https://developers.google.com/places/documentation/search
// Changer le radius si recherche a proximitée
    var requestOptions = {
        host: googleMapsApi.host, port: googleMapsApi.port, path: '/maps/api/place/nearbysearch/json?key='+config.googleMapsApi.apiKey+'&location='+ latitude + ','+ longitude +'&sensor=false&radius=20000&types='+ types,
    };
    console.log(requestOptions);
    makeRequest(requestOptions, function(data) {
        if(callback) {
            data = dataNormalizer.normalize_google(JSON.parse(data));
            callback(data);
        }
    });
}


var getCity = function(latitude,longitude,callback) {
    //TODO check if value is in cache
    var requestOptions = {
        host: nominatimOSMApi.host,
        port: nominatimOSMApi.port,
        path: '/reverse?format=json&lat='+latitude+'&lon='+longitude+'&zoom=18&addressdetails=1'
    };

              console.log(requestOptions);
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
            if(callback) {
                parser.parseString(data, function (err, result) { 
                    callback(result.rss.channel['0'].item['0']['meteo:weather'][0].$);
                }) 
            }
        });
    }
    getCity(latitude,longitude,callbackCity);
}

exports.getYelp = function(latitude,longitude,types,callback) {

    var callbackCity = function(city) {
          yelp = Yelp.createClient({
              consumer_key: config.yelpApi.consumer_key, 
              consumer_secret: config.yelpApi.consumer_secret,
              token: config.yelpApi.token,
              token_secret: config.yelpApi.token_secret
          });
          // See http://www.yelp.com/developers/documentation/v2/search_api
          //TODO  Check le type (arrays, no valide...)
          yelp.search({term: types, location: city}, function(error, data) {
              console.log(city);
              console.log(error);
              callback(data);
          });

    }
    getCity(latitude,longitude,callbackCity);
}

exports.getPoi = function(id,callback) {
    Poi.find(id);
}

exports.getGooglePlace = function(reference,callback){
// https://developers.google.com/places/documentation/search
    var requestOptions = {
        host: googleMapsApi.host,
        port: googleMapsApi.port,
        path: '/maps/api/place/details/json?key='+config.googleMapsApi.apiKey+'&sensor=false&reference='+ reference,
    };
    console.log(requestOptions);
    makeRequest(requestOptions, function(data) {
        if(callback) {
            data = dataNormalizer.normalize(JSON.parse(data).d);
            callback(data);
        }
    });
}
