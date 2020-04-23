const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');
const PaymentController = require('../controllers/payment');

router.post("/", checkAuth, PaymentController.enterAPaymentRecord);

router.get("/", checkAuth, PaymentController.getAllPaymentRecords);

router.get("/:paymentId", checkAuth, PaymentController.getAPaymentRecord);

router.delete("/:paymentId", checkAuth, PaymentController.deleteAPaymentRecord);


module.exports = router;