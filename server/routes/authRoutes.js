const express = require("express")
const { validateRegistration, validateLogin } = require("../middlewares/validation")
const { register, login, logout } = require("../controllers/auth.controllers")
const router = express.Router()

router.post("/register", validateRegistration, register)
router.post("/login", validateLogin,  login)
router.post("/logout", logout);

module.exports = router
