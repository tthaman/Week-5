const mongoose = require('mongoose');
const Item = require('../models/item');


//create(userId, text) - should create a item for the given user
module.exports.create = async (item) => {
  return await Item.create({title: item.title, price: item.price});
};

// getById(itemId) - should get item for itemId (_id)
module.exports.getById= async (itemId) => {
    return await Item.findOne({_id: mongoose.Types.ObjectId(itemId)}).lean();
};

// getItems() - should get all items
module.exports.getAllItems = async () => {
  return await Item.find({}).lean();
};

module.exports.updateById = async (itemId, item) =>  {
  return await Item.updateOne(
    { _id: itemId },
    {
      $set: { title: item.title, price: item.price },
      $currentDate: { lastModified: true }
    }
  )
};
