const express = require("express");
const { acceptCampaign } = require("../controllers/adminController");
const router = express.Router();

router.get("/acceptcampaign/:id", acceptCampaign);

module.exports = router;
