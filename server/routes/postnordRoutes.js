const express = require("express");
const { getPickupLocations } = require("../controllers/postnord.controller");
const router = express.Router();


router.get("/pickup-locations", getPickupLocations)

module.exports = router;