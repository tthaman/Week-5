const { Router } = require("express");
const router = Router();

const itemDAO = require('../daos/item');

// Create
router.post("/", async (req, res, next) => {
  const item = req.body;
  if (!item || JSON.stringify(item) === '{}' ) {
    res.status(400).send('item is required');
  } else {
    try {
      if (req.roles.includes('admin')) {
        const saveditem = await itemDAO.create(item);
        res.json(saveditem);
      } else {
        res.status(403).send('user is not an admin');
      }
    } catch(e) {
      res.status(500).send(e.message);
    }
  }
});

// Read - single item
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  let item;
  try {
    item = await itemDAO.getById(id);
    if (item) {
      res.json(item);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.sendStatus(400);
  }
});

// Read - all items
router.get("/", async (req, res, next) => {
  const items = await itemDAO.getAllItems();
  if (items && items.length > 0) {
    res.json(items);
  } else {
    res.sendStatus(404);
  }
});

// Update
router.put("/:id", async (req, res, next) => {
  const itemId = req.params.id;
  const item = req.body;
  if (!item || JSON.stringify(item) === '{}' ) {
    res.status(400).send('item is required"');
  } else {
    try {
      if (req.roles.includes('admin')) {
        const saveditem = await itemDAO.updateById(itemId, item);
        res.json(saveditem);
      } else {
        res.status(403).send('user is not an admin');
      }
    } catch(e) {
      res.status(500).send(e.message);
    }
  }
});

module.exports = router;
