var api = require('../services/api');

exports.computeSuggestions = function(data, callback) {
    api.getRestaurants(callback);
}
