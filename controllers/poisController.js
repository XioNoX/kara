var api              = require('../services/api');
var suggestionSystem = require('../services/suggestionSystem');
var Poi              = require('../models/Poi');

exports.suggest = function(req, res){
    var callback = function(pois) {
        res.send(pois);
    }

    console.log(req.body);
    if(!((req.body.longitude)&&(req.body.latitude)))
        return res.end();

    suggestionSystem.computeSuggestions(req.body.latitude, req.body.longitude, req.body.types, callback);
};

exports.poi = function(req, res){
    var callback = function(poi) {
        res.send(poi);
    }
    api.getPoi(req.params.id, callback);
};

exports.weather = function(req, res){
    var callback = function(weather) {
        res.send(weather);
    }
    if(!((req.query.longitude)&&(req.query.latitude)))
        return res.end();
    api.getWeather(req.query.latitude,req.query.longitude,callback);
};

exports.googleplaces = function(req, res){
    var callback = function(googleplaces) {
        res.send(googleplaces);
    }
    if(!((req.query.longitude)&&(req.query.latitude)))
        return res.end();
    api.getGooglePlaces(req.query.latitude,req.query.longitude,req.query.types,callback);
};

exports.yelp = function(req, res){
    var callback = function(yelp) {
        res.send(yelp);
    }
    if(!((req.query.longitude)&&(req.query.latitude)))
        return res.end();
    api.getYelp(req.query.latitude,req.query.longitude,req.query.types,callback);
};
