const express = require("express")
const { getUsers, getCustomerInfo } = require("../controllers/users.controllers")


const router = express.Router()

router.get("/", getUsers)
router.get("/customer-info", getCustomerInfo)

module.exports = router