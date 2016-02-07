var request = require('request');
var auth = require('./auth');
var helper = require('./helpers');

var c = {
    url: "https://www.lieferheld.de/api"
};

var api = {};
api.createUser = function () {
    console.log("test");
    return new Promise(function (resolve, reject) {
        request.post({
            'url': c.url + '/users/',
            headers: {
                'authentication': auth.getAuth()
            }
        }, helper.handleResponse(resolve, reject));
    });
};

api.getLocationDetails = function (city, zipcode, street) {
    return new Promise(function (resolve, reject) {
        request.get({
            'url': `${c.url}/locations/?city=${city}&zipcode=${zipcode}&street=${street}`,
            headers: {
                'authentication': auth.getAuth()
            }
        }, helper.handleResponse(resolve, reject));
    });
};

api.getRestaurants = function (lat, lon, offset, limit) {
    offset = offset === undefined ? 0 : offset;
    limit = limit === undefined ? 10000 : limit;
    return new Promise(function (resolve, reject) {
        request.get({
            'url': `${c.url}/restaurants/?lat=${lat}&lon=${lon}&offset=${offset}&limit=${limit}&fields=general%2Crating%2Caddress%2Cavailability%2Cdistance%2Cpayment_methods`,
            headers: {
                'authentication': auth.getAuth()
            }
        }, helper.handleResponse(resolve, reject));
    });
};

api.getRestaurantDetails = function (id) {
    return new Promise(function (resolve, reject) {
        request.get({
            'url': `${c.url}/restaurants/${id}/`,
            headers: {
                'authentication': auth.getAuth()
            }
        }, helper.handleResponse(resolve, reject));
    });
};

api.getRestaurantComments = function (id, offset, limit) {
    offset = offset === undefined ? 0 : offset;
    limit = limit === undefined ? 10000 : limit;
    return new Promise(function (resolve, reject) {
        request.get({
            'url': `${c.url}/restaurants/${id}/comments/?fields=comment&offset=${offset}&limit=${limit}`,
            headers: {
                'authentication': auth.getAuth()
            }
        }, helper.handleResponse(resolve, reject));
    });
};

module.exports = api;