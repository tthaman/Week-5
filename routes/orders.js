const { Router } = require("express");
const router = Router();
const orderDAO = require('../daos/order');
const itemDAO = require('../daos/item');
const mongoose = require('mongoose');

// Read - single item
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    let order = await orderDAO.getById(id);
    if (req.roles.includes('admin') ||
      (order && mongoose.Types.ObjectId(order.userId).toString() === req.userId)) {
        let dbItems = [];
        for (const item of order.items) {
          dbItems.push(await itemDAO.getById(item));
        }
        order.items = dbItems;
        res.json(order);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.sendStatus(400);
  }
});

// Read - all orders
router.get("/", async (req, res, next) => {
  let orders;
  if (req.roles.includes('admin')) {
    orders = await orderDAO.getAllOrders();
  } else {
    orders = await orderDAO.getAllByUserId(req.userId);
  }
  if (orders && orders.length > 0) {
    res.json(orders);
  } else {
    res.sendStatus(404);
  }
});

// Create
router.post("/", async (req, res, next) => {
  const items = req.body;
  try {
    if (!items || JSON.stringify(items) === '{}' ) {
      res.status(400).send('items are required');
    } else {
      let order = {userId: req.userId, items: items, total: 0}
      for (const item of items) {
        const dbItem = await itemDAO.getById(item);
        order.total += dbItem.price;
      }
      const newOrder = await orderDAO.create(order);
      res.json(newOrder);
    }
  } catch (e) {
    res.sendStatus(400);
  }
});

module.exports = router;
