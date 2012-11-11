var mapSingle = function(openDataPoi, googleDataPoi, previousMapped) {
    var deltaLng = Math.abs(openDataPoi.longitude - googleDataPoi.longitude);
    var deltaLat = Math.abs(openDataPoi.latitude - googleDataPoi.latitude);
    if(previousMapped) {
        var deltaLngPrev = Math.abs(previousMapped.longitude - googleDataPoi.longitude);
        var deltaLatPrev = Math.abs(previousMapped.latitude - googleDataPoi.latitude);
        if(deltaLat <= deltaLatPrev && deltaLng <= deltaLngPrev) {
            return openDataPoi;
        }
        return previousMapped;
    }
    if(deltaLat <= 0.001 && deltaLng <= 0.001) {
        return openDataPoi;
    }
    return null;
};

exports.map = function(openDataPois, googleDataPois) {
    var mappedResults = [];
    for(var gIndex in googleDataPois) {
        var googleDataPoi = googleDataPois[gIndex];
        var mappedResult = null;
        for(var odIndex in openDataPois) {
            var openDataPoi = openDataPois[odIndex];
            var mappedResult = mapSingle(openDataPoi, googleDataPoi, mappedResult);
        }
        if (mappedResult) {
            mappedResults.push(mappedResult);
        }
    }
    console.log(openDataPois.length, googleDataPois.length, mappedResults.length);
    return mappedResults;
}
