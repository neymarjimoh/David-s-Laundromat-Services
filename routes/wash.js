const express = require("express");
const router = express.Router();

const { createAWashRecord, getAllWashRecords, getAWashRecord, deleteAWashRecord } = require('../controllers/wash');

// /api/v1/wash

router.post("/", createAWashRecord);

router.get("/", getAllWashRecords);

router.get("/:washId", getAWashRecord);

router.delete("/:washId", deleteAWashRecord);


module.exports = router;