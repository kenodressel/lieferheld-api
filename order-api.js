var request = require('request');
var auth = require('./auth');
var helper = require('./helpers');

var c = {
    url: "https://www.lieferheld.de/api"
};

var APIKEY = "", TOKEN = "";


var api = {};

api.createOrder = function (userID, restaurantID) {
    return new Promise(function (resolve, reject) {
        request
            .post({
                'url': c.url + '/users/' + userID + '/orders/',
                headers: {
                    'authentication': auth.getAuth(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"restaurant_id": restaurantID})
            }, helper.handleResponse(resolve, reject));
    });
};

api.addToCart = function (order, item) {
    order.sections[0].items.push(item);
    order.operation = "validate";
    return new Promise(function (resolve, reject) {
        request
            .put({
                'url': c.url + '/users/' + order.general.user_id + '/orders/' + order.id + '/',
                headers: {
                    'authentication': auth.getAuth(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(order)
            }, helper.handleResponse(resolve, reject));
    });
};

api.checkout = function (order) {
    order.operation = "final";
    return new Promise(function (resolve, reject) {
        request
            .put({
                'url': c.url + '/users/' + order.general.user_id + '/orders/' + order.id + '/',
                headers: {
                    'authentication': auth.getAuth(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(order)
            }, helper.handleResponse(resolve, reject));
    });
};

module.exports = api;