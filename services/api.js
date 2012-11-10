//var dataNormalizer = require('./dataNomalizer'),
var    http = require('http');

exports.getRestaurants = function(callback) {
    var requestOptions = {
        host: 'dataprovence.cloudapp.net',
        port: 8080,
        method: 'GET',
        path: '/v1/dataprovencetourisme/Restaurants/?format=json',
    };

    var datas = "";
    var request = http.request(requestOptions, function(response) {
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            datas += chunk;
        });
        response.on('end', function () {
            if(callback) { callback(datas); }
        });
    });
    request.end();

}
