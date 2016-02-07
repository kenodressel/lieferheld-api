var APIKEY = "", TOKEN = "";

var getAuth = function () {
    var apikey = APIKEY ? APIKEY : "BqFXeTedMu1LQazCYZznkzyL5CFffcWIDW7GEpmCFVAPLi1dA4cdt76BnXkyEuqWAbCf8ZWtADOzaz5851LQj1dlppQVZSxPPAe0cA0g7Tn2GoXWTdfStKk5yrKrrB0J";
    var token = TOKEN ? TOKEN : "";
    return 'LH api-key=' + apikey + ',token=' + token;
};

var setToken = function (token) {
    TOKEN = token;
};

module.exports = {
    getAuth: getAuth,
    setToken: setToken
};