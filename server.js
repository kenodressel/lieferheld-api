var api = require('./order-api.js');
var info = require('./info-api.js');

var item = {
  "size": {"reduced_price": 1.5, "price": 1.5, "offer_id": "", "name": "normal"},
  "flavors": {"items": [], "id": "0"},
  "main_item": true,
  "name": "Naan ",
  "tags": [],
  "sub_item": false,
  "quantity": 2,
  "id": "1101721",
  "comments": "",
  "description": "gebackenes Fladenbrot"
};

api.createUser()
  .then(function (data) {
    api.setToken(data.token);
    api.createOrder(data.user.id, 6450)
      .then(function (order) {
        api.addToCart(order, item)
          .then(function (order) {
            console.log(order.payment.method.fast_lane);
            var address = {
              city:"Berlin",
              email:"***REMOVED***",
              lastname:"***REMOVED***",
              latitude: ***REMOVED***,
              longitude: ***REMOVED***,
              name: "***REMOVED***",
              phone: "***REMOVED***",
              street_name: "***REMOVED***",
              street_number: "***REMOVED***",
              zipcode: "***REMOVED***"
            };

            for(var key in address) {
              order.delivery_address.address[key] = address[key];
            }

            order.payment.method.name = "paypal";
            order.payment.method.id = "1";

            order.payment.gateway_opts.cancel_url =  "https://www.lieferheld.de/customer/checkout/" + order.id +"/";
            order.payment.gateway_opts.return_url =  "https://www.lieferheld.de/customer/order/" + order.id +"/?ft=";

            api.checkout(order)
              .then(function (order) {
                console.log(order.payment.gateway);
              })
              .catch(function (err) {
                console.log(err);
              })
          });
      });
  });
