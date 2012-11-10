var api        = require('../services/api');
var poisMapper = require('../services/poisMapper');

exports.computeSuggestions = function(data, callback) {
    var odRestaurants     = null; //Open data restaurants
    var googleRestaurants = null; //Google Places restaurants

    var openDataCallback  = function(data, normCallback) {
        odRestaurants = data;
        callback(data);
    }
    api.getRestaurants(openDataCallback);
    //TODO get google places restaurants
}
