var api        = require('../services/api');
var poisMapper = require('../services/poisMapper');

exports.computeSuggestions = function(latitude, longitude, callback) {
    var odRestaurants     = null; //Open data restaurants
    var googleRestaurants = null; //Google Places restaurants

    var openDataCallback  = function(data) {
        odRestaurants = data;
        if(googleRestaurants) {
            data = poisMapper.map(odRestaurants, googleRestaurants);
            callback(data);
        }
    }

    var googleDataCallback  = function(data) {
        googleRestaurants = data;
        if(odRestaurants) {
            data = poisMapper.map(odRestaurants, googleRestaurants);
            callback(data);
        }
    }
    api.getRestaurants(openDataCallback);
    api.getGooglePlaces(latitude, longitude, 'restaurant', googleDataCallback);
}
