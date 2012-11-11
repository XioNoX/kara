
exports.normalize_open_data = function(obj) {
    var dico = {
	entityid: 'id',
        raisonsociale: 'name',
        raison_sociale: 'name',
        typedecuisine: 'type',
        sous_type: 'type',
        numro: 'number',
	numero: 'number',
        typedevoie: 'typeOfRoad',
        type_de_voie: 'typeOfRoad',
        voie: 'road',
        adresse: 'address',
        codepostal : 'postcode',
        code_postal : 'postcode',
        ville : 'city',
        tlphone : 'tel',
        mail : 'mail',
        adresseweb : 'web',
        adresse_web : 'web',
        longitude : 'longitude',
        latitude : 'latitude',
	classement: 'etoile',
    };

    var normTab = [];
    for(var rest in obj) {
        var normObj = {};
        for(var attr in obj[rest]) {
            if(dico[attr])
                normObj[dico[attr]] = obj[rest][attr];
        }
        normTab.push(normObj);
    }
    return normTab;
}

exports.normalize_google = function(obj) {
    var dico = {
	id: 'id',
	name: 'name',
	vicinity: 'address',
	icon : 'icon',
	rating : 'rating',
	// lat, lng and types "à la mano"
    };

    var normTab = [];
    for(var rest in obj.results) {
        var normObj = {};
    for(var attr in obj.results[rest]){
            if(dico[attr])
        normObj[dico[attr]] = obj.results[rest][attr];
        if(attr=="geometry"){
        normObj.latitude=obj.results[rest].geometry.location.lat;
        normObj.longitude=obj.results[rest].geometry.location.lng;
        }
        if(attr=="types"){
        normObj.type="";
        for(var i=0; i<obj.results[rest].types.length; i++)
            normObj.type+=obj.results[rest].types[i]+" ";
        }
    }
        normTab.push(normObj);
    }
    return normTab;
}


exports.normalize_eventbrite = function(obj) {
    var dico = {
	id: 'id',
	title: 'name',
	category: 'type',
	start_date: 'date',
	url: 'web',
	tags: 'desc',
	// add ticket information (free ? price ?)
    };

    var normTab = [];
    for(var singleEvent in obj.events) {
	for(var attr in obj.events[singleEvent]) {
	    var normObj = {};
	    if(attr=="event"){
		for(var key in obj.events[singleEvent][attr]) {
		    if(dico[key])
			normObj[key]=obj.events[singleEvent][attr][key];
		    if(key=="venue" && obj.events[singleEvent][attr].venue.latitude){
			normObj.latitude=obj.events[singleEvent][attr].venue.latitude;
			normObj.longitude=obj.events[singleEvent][attr].venue.longitude;
		    }
		}
        normTab.push(normObj);
	    }	
	}
    }
    return normTab;
}
