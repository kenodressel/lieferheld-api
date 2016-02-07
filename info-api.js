var request = require('request');

var c = {
    url: "https://www.lieferheld.de/api"
};

var APIKEY = "", TOKEN = "";

var api = {};

api.getLocationDetails = function (city, zipcode, street) {
    return new Promise(function (resolve, reject) {
        request.get({
            'url': `${c.url}/locations/?city=${city}&zipcode=${zipcode}&street=${street}`,
            headers: {
                'authentication': getAuth()
            }
        }, handleResponse(resolve, reject));
    });
};

api.getRestaurants = function (lat, lon, offset, limit) {
    offset = offset === undefined ? 0 : offset;
    limit = limit === undefined ? 10000 : limit;
    return new Promise(function (resolve, reject) {
        request.get({
            'url': `${c.url}/restaurants/?lat=${lat}&lon=${lon}&offset=${offset}&limit=${limit}&fields=general%2Crating%2Caddress%2Cavailability%2Cdistance%2Cpayment_methods`,
            headers: {
                'authentication': getAuth()
            }
        }, handleResponse(resolve, reject));
    });
};

api.getRestaurantDetails = function (id) {
    return new Promise(function (resolve, reject) {
        request.get({
            'url': `${c.url}/restaurants/${id}/`,
            headers: {
                'authentication': getAuth()
            }
        }, handleResponse(resolve, reject));
    });
};

api.getRestaurantComments = function (id, offset, limit) {
    offset = offset === undefined ? 0 : offset;
    limit = limit === undefined ? 10000 : limit;
    return new Promise(function (resolve, reject) {
        request.get({
            'url': `${c.url}/restaurants/${id}/comments/?fields=comment&offset=${offset}&limit=${limit}`,
            headers: {
                'authentication': getAuth()
            }
        }, handleResponse(resolve, reject));
    });
};

function handleResponse(resolve, reject) {
    return function (error, response, body) {
        if (error) {
            throw error;
        } else {
            if (response.statusCode.toString().match(/^2\d\d$/)) {
                //console.log(JSON.parse(body), response.statusCode);
                resolve(JSON.parse(body));
            } else {
                console.error(JSON.parse(body), response.statusCode);
                reject(JSON.parse(body));
            }
        }
    }
}

function getAuth() {
    var apikey = APIKEY ? APIKEY : "BqFXeTedMu1LQazCYZznkzyL5CFffcWIDW7GEpmCFVAPLi1dA4cdt76BnXkyEuqWAbCf8ZWtADOzaz5851LQj1dlppQVZSxPPAe0cA0g7Tn2GoXWTdfStKk5yrKrrB0J";
    var token = TOKEN ? TOKEN : "";
    return 'LH api-key=' + apikey + ',token=' + token;
}

api.setToken = function (token) {
    TOKEN = token;
};

module.exports = api;