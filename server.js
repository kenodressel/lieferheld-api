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

function handleResponse(resolve, reject) {
  return function (error, response, body) {
    if (error) {
      throw error;
    } else {
      if (response.statusCode.toString().match(/^2\d\d$/)) {
        console.log(JSON.parse(body), response.statusCode);
        resolve(JSON.parse(body));
      } else {
        console.log(JSON.parse(body), response.statusCode);
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




api.createUser()
  .then(function(data) {
    TOKEN = data.token;
    api.createOrder(data.user.id, 6450);
  });
