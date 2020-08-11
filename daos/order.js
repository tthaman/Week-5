const Order = require('../models/order');

//should be an async function that returns a string after creating an Order record
module.exports.create = async (orderData) => {
  return await Order.create( orderData)
};

module.exports.getAllByUserId = async (userId) => {
  return await Order.find( { userId: userId });
};

module.exports.getAllOrders = async () => {
  return await Order.find( {});
};

//an async function that deletes the corresponding Order record
module.exports.removeOrder = async (orderString) => {
  return await Order.deleteOne({ order: orderString });
};

// getById(orderId) - should get item for orderId (_id)
module.exports.getById= async (orderId) => {
  return await Order.findOne({_id: orderId}).lean();
};
