var api = require('./order-api.js');

api.createUser()
  .then(function(data) {
    api.setToken(data.token);
    api.createOrder(data.user.id, 6450)
      .then(function (order) {
        api.addToCart(order,{})
      });
  });
