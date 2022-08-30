const express = require("express");
const { getItems, createItem, getItem, deleteItem, updateItem } = require("../controllers/tracks");
const router = express.Router();
const { validatorCreateItem, validatorGetItem } = require("../validators/tracks")
const authMiddleware = require("../middleware/session.js");
const checkRol = require("../middleware/rol");

//TODO: localhost/tracks con CRUD
router.get("/", authMiddleware, getItems);
router.post("/",authMiddleware, checkRol(["user","admin"]  ), validatorCreateItem, createItem);
router.get("/:id",authMiddleware, validatorGetItem, getItem);
router.put("/:id",authMiddleware, validatorGetItem, validatorCreateItem, updateItem);
router.delete("/:id",authMiddleware, validatorGetItem, deleteItem);

module.exports = router;