var api        = require('../services/api');
var poisMapper = require('../services/poisMapper');

exports.computeSuggestions = function(latitude, longitude, types, callback) {

    var poisTypes = [];
    var nbTypes = 0;
    var mergePois = function(type, pois) {
        if(!pois) {
            poisTypes.push({type:type, places:[]});
        } else {
            poisTypes.push({type:type, places:pois});
        }
        nbTypes++
        //if we have checked all types
        if(nbTypes === types.length) {
            callback(poisTypes);
        }
    };
    //checking all the typs the user wants
    for(var typeIndex in types) {
        var type = types[typeIndex];
        var cb = function(type) {
            return function(pois) {
                mergePois(type, pois);
            }
        }
        api.getPois(type, latitude, longitude, cb(type));
    }

/*
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
    */
}
