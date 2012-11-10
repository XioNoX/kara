var api = require('../services/api');
var suggestionSystem = require('../services/suggestionSystem');

exports.suggest = function(req, res){
    var callback = function(restaurants) {
        res.send(restaurants);
    }
    suggestionSystem.computeSuggestions(req.body,callback);
};

exports.events = function(req, res){
    var callback = function(events) {
        res.send(events);
    }
    if((req.query.longitude)&&(req.query.latitude))
    api.getEvents(req.query.longitude,req.query.latitude,req.query.date,callback);
};

exports.poi = function(req, res){
    res.send('epic todo');
};

exports.weather = function(req, res){ 
    var callback = function(weather) {
        res.send(weather);
    }
    if((req.query.longitude)&&(req.query.latitude))
    api.getWeather(req.query.longitude,req.query.latitude,callback);
};
