var mapSingle = function(opendDataPoi, googleDataPoi) {
    return null;
};

exports.map = function(openDataPois, googleDataPois) {
    var mappedResults = {};
    for(var googleDataPoi in googleDataPois) {
        for(var openDataApi in OpenDataPois) {
            var mappedResult = mapSingle(openDataPoi, googleDataPois);
            if (mappedResult) {
                mappedResults.push(mappedResult);
            }
        }
    }
}
