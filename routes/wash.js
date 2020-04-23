const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');
const WashController = require('../controllers/wash');

// /api/wash

router.post("/", checkAuth, WashController.createAWashRecord);

router.get("/", checkAuth, WashController.getAllWashRecords);

router.get("/:washId", checkAuth, WashController.getAWashRecord);

router.delete("/:washId", checkAuth, WashController.deleteAWashRecord);


module.exports = router;