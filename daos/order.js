const Order = require('../models/order');

//should be an async function that returns a string after creating a Order record
module.exports.create = async (orderData) => {
  return await Order.create( orderData)
};

//should be an async function that returns a userId string using the orderString to get a Order record
module.exports.getUserIdFromOrder = async (orderString) => {
  return await Order.findOne( { order: orderString })
};

//an async function that deletes the corresponding Order record
module.exports.removeOrder = async (orderString) => {
  return await Order.deleteOne({ order: orderString });
};
