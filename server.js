var api = require('./order-api.js');
var info = require('./info-api.js');

api.createUser().then(function (data) {
    info.setToken(data.token);
    info.getLocationDetails("Berlin", "***REMOVED***", "Dunkerstraße ***REMOVED***").then(function (location) {
        info.getRestaurants(location.data[0].address.latitude, location.data[0].address.longitude).then(function (restaurants) {
            info.getRestaurantDetails(restaurants.data[0].id).then(function (details) {
                console.log(details);
            });
        });
    });
});
