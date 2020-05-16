const express = require("express");
const router = express.Router();

const { enterAPaymentRecord, getAllPaymentRecords, getAPaymentRecord, deleteAPaymentRecord } = require('../controllers/payment');

router.post("/", enterAPaymentRecord);

router.get("/", getAllPaymentRecords);

router.get("/:paymentId", getAPaymentRecord);

router.delete("/:paymentId", deleteAPaymentRecord);


module.exports = router;