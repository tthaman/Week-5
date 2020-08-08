const mongoose = require('mongoose');
const Item = require('../models/item');


//create(userId, text) - should create a item for the given user
module.exports.create = async (item) => {
  return await Item.create({text: item.text, userId: mongoose.Types.ObjectId(item.userId)});
};

// getById(itemId) - should get item for itemId (_id)
module.exports.getById= async (itemId, userId) => {
  if (userId) {
    return await Item.findOne({_id: itemId, userId: mongoose.Types.ObjectId(userId)}).lean();
  } else {
    return await Item.findOne({_id: itemId}).lean();
  }
};

// getUserItems(userId) - should get all items for userId
module.exports.getAllByUserId = async (userId) => {
  return await Item.find({ userId: mongoose.Types.ObjectId(userId) }).lean();
};
