var api = require('../services/api');

exports.suggest = function(req, res){ 
    var callback = function(restaurants) {
        res.send(restaurants);
    }
    api.getRestaurants(callback);
};

exports.poi = function(req, res){
    res.send('epic todo');
};
