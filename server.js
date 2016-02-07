var auth = require('./auth');
var api = require('./order-api');
var info = require('./info-api');

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

info.createUser()
    .then(function (data) {
        auth.setToken(data.token);
        api.createOrder(data.user.id, 6450)
            .then(function (order) {
                api.addToCart(order, item)
                    .then(function (order) {
                        console.log(order.payment.method.fast_lane);
                        var address = {
                            city: "Berlin",
                            email: "test@example",
                            lastname: "lastname",
                            latitude: 52.520645,
                            longitude: 13.409779,
                            name: "name",
                            phone: "+49 1234512345",
                            street_name: "street_name",
                            street_number: "1",
                            zipcode: "12345"
                        };

                        for (var key in address) {
                            order.delivery_address.address[key] = address[key];
                        }

                        order.payment.method.name = "paypal";
                        order.payment.method.id = "1";

                        order.payment.gateway_opts.cancel_url = "https://www.lieferheld.de/customer/checkout/" + order.id + "/";
                        order.payment.gateway_opts.return_url = "https://www.lieferheld.de/customer/order/" + order.id + "/?ft=";

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
