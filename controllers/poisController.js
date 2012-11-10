var api = require('../services/api');

exports.suggest = function(req, res){ 
    var callback = function(restaurants) {
        res.send(restaurants);
    }
    api.getRestaurants(callback);
};

exports.events = function(req, res){ 
    var callback = function(events) {
        res.send(events);
    }
    api.getEvents(callback);
};

exports.poi = function(req, res){
    res.send('epic todo');
};

exports.weather = function(req, res){ 
    var callback = function(weather) {
        res.send(weather);
    }
    api.getWeather('43.4834507','5.381985',callback);
};
