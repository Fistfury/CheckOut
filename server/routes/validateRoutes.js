const express = require ("express");
const { validateUser } = require("../controllers/validate.controllers");

const router = express.Router()

router.get("/validate-session", validateUser);

module.exports = router