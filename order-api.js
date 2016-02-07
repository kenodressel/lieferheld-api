
var request = require('request');

var c = {
  url: "https://www.lieferheld.de/api"
};

var APIKEY = "", TOKEN = "";


var api = {};

api.createUser = function () {
  return new Promise(function (resolve, reject) {
    request
      .post({
        'url': c.url + '/users/',
        headers: {
          'authentication':getAuth()
        }
      }, handleResponse(resolve, reject));
  });
};

api.createOrder = function(userID, restaurantID) {
  return new Promise(function (resolve, reject) {
    request
      .post({
        'url': c.url + '/users/' + userID + '/orders/',
        headers: {
          'authentication':getAuth(),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({"restaurant_id":restaurantID})
      }, handleResponse(resolve, reject));
  });
};

api.addToCart = function(order, item) {
  order.sections[0].items.push(item);
  order.operation = "validate";
  return new Promise(function (resolve, reject) {
    request
      .put({
        'url': c.url + '/users/' + order.general.user_id + '/orders/' + order.id + '/',
        headers: {
          'authentication':getAuth(),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
      }, handleResponse(resolve, reject));
  });
};

api.checkout = function(order) {
  order.operation = "final";
  return new Promise(function (resolve, reject) {
    request
      .put({
        'url': c.url + '/users/' + order.general.user_id + '/orders/' + order.id + '/',
        headers: {
          'authentication':getAuth(),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
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
        //console.log(JSON.parse(body), response.statusCode);
        reject(JSON.parse(body));
      }
    }
  }
}

function getAuth() {
  var apikey = APIKEY ? APIKEY : "BqFXeTedMu1LQazCYZznkzyL5CFffcWIDW7GEpmCFVAPLi1dA4cdt76BnXkyEuqWAbCf8ZWtADOzaz5851LQj1dlppQVZSxPPAe0cA0g7Tn2GoXWTdfStKk5yrKrrB0J";
  var token  = TOKEN ? TOKEN : "";
  return 'LH api-key=' + apikey + ',token=' + token;
}

api.setToken = function(token) {
  TOKEN = token;
};

module.exports = api;