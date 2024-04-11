const express = require("express")
const { getOrders } = require("../controllers/orders.controllers")


const router = express.Router()

router.get("/:customerId", getOrders)

module.exports = router

