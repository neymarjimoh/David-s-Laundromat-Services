const { Payment, Wash } = require('../models');


exports.enterAPaymentRecord = (req, res, next) => {
    const { wash, date, paymentType } = req.body;
    const payment = new Payment({
        ...req.body
    })
    payment.save()
    .then((savedPayment) => {
        Wash.findByIdAndUpdate(
            wash,
            { $push: { payment: savedPayment._id } },
            { new: true }
        )
        .then(() => {
            return res.json({ 
                message: 'saved',
                paymentrecord: savedPayment
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ message: 'Error occurred, ensure you enter the correct details' });
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({ message: 'Error occurred, ensure you enter the correct details' });
    })
}

exports.getAllPaymentRecords = (req, res) => {
    Payment
        .find()
        .populate("wash", "amount quantity user customer date")
        .select("-__v -createdAt -updatedAt")
        .then( results => {
            return res.status(200).json({
                count: results.length + " Payment record(s)",
                results
            })
        })
        .catch( err => {
            console.log(err);
            return res.status(500).json({
                message: `Problem occured while processing this request.`
            })
        })
}

exports.getAPaymentRecord = (req, res, next) => {
    Payment
        .findById(req.params.paymentId)
        .populate("wash", "amount quantity user customer date")
        .select("-__v -createdAt -updatedAt")
        .then( result => {
            if(!result) {
                return res.status(404).json({
                    message: 'Payment record not found.'
                })
            }
            return res.status(200).json({
                payment: result
            })
        })
        .catch( err => {
            console.log(err)
            return res.status(500).json({
                message:`Problem occured while processing this request.`
            })
        })
}

exports.deleteAPaymentRecord = (req, res, next) => {
    Payment
        .findByIdAndRemove(req.params.paymentId)
        .then( result => {
            if (!result) {
                return res.status(404).json({
                    message: 'Payment  record does not exist or has already been deleted.'
                })
            }
            return res.status(200).json({
                message: 'Payment record deleted successfully.'
            })
        })
        .catch(err => {
            return res.status(500).json({
                error: "Error occurred. Unable to process your request.."
            })
        })
}