const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const OrderController = require("../controller/ordersController");

router.post("/addOrder", [checkAuth.verifyToken], OrderController.addOrder);

router.get("/findCompltedOrders", OrderController.findCompltedOrders);

module.exports = router;
