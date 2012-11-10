
exports.normalize = function(obj) {
    var restaurant = {
        raisonsociale: 'name',
        typedecuisine: 'type',
        numro: 'number',
        typedevoie: 'typeOfRoad',
        voie: 'road',
        adresse : 'address',
        codepostal : 'postcode',
        ville : 'city',
        tlphone : 'tel',
        mail : 'mail',
        adresseweb : 'web',
        longitude : 'longitude',
        latitude : 'latitude',
    };

    var normTab = [];
    for(var rest in obj) {
        var normObj = {};
        for(var attr in obj[rest]) {
            if(restaurant[attr])
                normObj[restaurant[attr]] = obj[rest][attr];
        }
        normTab.push(normObj);
    }
    return normTab;
}

