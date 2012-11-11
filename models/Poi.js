var db = require('../config/db/initDb');

var Poi = function(poiJson) {
    this.poiJson = poiJson;
};

Poi.types = {
    "restaurants": '0',
    "museums": '1',
    "parks": '2',
    "cinemas": '3',
    "concerts": '4',
    "free": '5',
    "events": '6',
    "monuments": '7',
    "hotels": '8',
}

Poi.find = function(id) {
    var poi = db.run('SELECT * FROM pois WHERE id = $id', {id:id});
}

Poi.prototype = {
poiJson : null,

          save: function() {
              if(!this.poiJson) return false;
          }
};

module.exports = Poi;
