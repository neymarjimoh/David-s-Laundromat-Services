const express = require("express");
const mongoose = require('mongoose');

const Payment = require('../models/payment');
const Wash = require('../models/wash');
const Customer = require('../models/customers');
const User = require('../models/users');

exports.enterAPaymentRecord = (req, res, next) => {
    const { wash, date, customer, staff, paymentType } = req.body;
    Wash
        .findById(wash)
        .exec()
        .then( result => {
            if (!result) {
                return res.status(404).json({
                    message: `Wash record with the id ${result._id} not found.`
                })
            }
            Customer.findById(customer, (err, response) => {
                if (err) {
                    return res.status(404).json({
                        message: `Customer with the id ${response._id} not found.`
                    })
                }
                User.findById(staff, (err, doc) => {
                    if (err) {
                        return res.status(404).json({
                            message: `Staff with the id ${doc._id} not found.`
                        })
                    }
                    const payment = new Payment({
                        _id: new mongoose.Types.ObjectId(),
                        date,
                        wash,
                        customer,
                        staff,
                        paymentType
                    })
                    payment.save()
                    .then( record => {
                        return res.status(201).json({
                            message: 'Payment record entered successfully',
                            payment: record,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:5000/api/payment/' + record._id
                            }
                        })
                    })
                    .catch(err => {
                        return res.status(400).json({
                            message: `Invalid wash enteries. || ${err}`
                        })
                    })
                })
            })
        })
        .catch( err => {
            return res.status(500).json({ message: err && 'Problem occured while entering this record..' });
        })
}

exports.getAllPaymentRecords = (req, res, next) => {
    Payment
        .find()
        .populate('customer wash staff', '-__v')
        .exec()
        .then( results => {
            res.status(200).json({
                count: results.length,
                payments: results.map( result => {
                    return {
                        _id: result._id,
                        date: result.date,
                        paymentType: result.paymentType,
                        user: result.staff,
                        customer: result.customer,
                        wash: result.wash,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:5000/api/payment/' + result._id
                        }
                    }
                })
            })
        })
        .catch( err => {
            console.log(err);
            return res.status(500).json({
                message:`Problem occured while processing this request.` || `${err}`
            })
        })
}

exports.getAPaymentRecord = (req, res, next) => {
    Payment
        .findById(req.params.paymentId)
        .populate('customer user wash', '-__v')
        .exec()
        .then( result => {
            if(!result) {
                return res.status(404).json({
                    message: 'Payment record not found.',
                    request: {
                        type: 'GET',
                        url: 'http://localhost:5000/api/payment'
                    }
                })
            }
            return res.status(200).json({
                payment: result,
                request: {
                    type: 'GET',
                    url: 'http://localhost:5000/api/payment'
                }
            })
        })
        .catch( err => {
            console.log(err)
            return res.status(500).json({
                message:`Problem occured while processing this request.` || `${err}`
            })
        })
}

exports.deleteAPaymentRecord = (req, res, next) => {
    Payment
        .findByIdAndRemove(req.params.paymentId)
        .exec()
        .then( result => {
            if (!result) {
                return res.status(404).json({
                    message: 'Payment  record does not exist or has already been deleted.'
                })
            }
            return res.status(200).json({
                message: 'Payment record deleted successfully.',
                // request: {
                //     type: 'POST',
                //     url: 'http://localhost:5000/api/payment',
                //     body: {
                //         paymentType: 'Either CASH, TRANSACTION or POS',
                //         customer: 'Id gotten from customer',
                //         wash: 'Id gotten from wash record',
                //         staff: 'Id gotten from staff',
                //     }
                // }
            })
        })
        .catch(err => {
            return res.status(500).json({
                error: err
            })
        })
}