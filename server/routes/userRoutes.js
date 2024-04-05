const express = require("express")
const { validateRegistration, validateLogin } = require("../middlewares/validation")
const { register, login } = require("../controllers/auth.controllers")
const router = express.Router()

router.post("/register", validateRegistration, register)
router.post("/login", validateLogin,  login)

module.exports = router
