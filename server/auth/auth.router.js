const express = require("express")
const { register } = require("./auth.controllers")
const router = express.Router()

router.post("/register", register)

module.exports = router
