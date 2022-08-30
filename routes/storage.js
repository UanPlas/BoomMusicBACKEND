const express = require("express");
const { createItem,getItems, getItem, deleteItem } = require("../controllers/storage");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage")
const {validatorGetItem} = require("../validators/storage");

router.get("/",getItems)
router.get("/:id",validatorGetItem,getItem)
router.delete("/:id",validatorGetItem,deleteItem)
router.post("/",uploadMiddleware.single("myfile"), createItem)
module.exports = router; 