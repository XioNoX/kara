var Poi = function(poiJson) {
    this.poiJson = poiJson;
};

Poi.types = {
    "restaurants":  0,
    "museums":      1,
    "park":         2,
    "cinemas":      3,
    "concerts":     4,
    "free":         5,
    "event":        6,
}

Poi.prototype = {
    poiJson : null,

    save: function() {
        
    }
};

module.exports = Poi;
