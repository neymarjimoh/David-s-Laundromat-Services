const express = require("express");
const mongoose = require('mongoose');

const Wash = require('../models/wash');
const Customer = require('../models/customers');
const User = require('../models/users');

exports.createAWashRecord = (req, res, next) => {
    const { quantity, date, amount, customer, staff } = req.body;
    Customer
        .findById(customer)
        .exec()
        .then( result => {
            if (!result || result.length < 1) {
                return res.status(401).json({
                    message: `Customer with the id ${result._id} not found`
                })
            }
            User.findById(staff, (err, response) => {
                if (err) {
                    return res.status(401).json({
                        message: `Staff with the id ${response._id} not found`
                    })
                }
                const wash = new Wash({
                    quantity,
                    date,
                    amount,
                    customer,
                    staff
                })
                wash.save()
                .then( record => {
                    return res.status(201).json({
                        message: 'Wash record entered successfully',
                        createdWash: record,
                        // request:{
                        //     type: 'GET',
                        //     url: 'http://localhost:5000/api/wash/' + record._id
                        // }
                    })
                })
                .catch(err => {
                    res.status(400).json({
                        message: `Invalid wash enteries. || ${err}`
                    })
                })
            })
        })
        .catch( err => {
            return res.status(500).json({ message: err && 'Internal Server error' });
        })
}

exports.getAllWashRecords = (req, res, next) => {
    Wash
        .find()
        // .populate('customer user', "-_id -__v")
        .populate('customer staff', "-__v")
        // .select("-__v")
        .exec()
        .then( results => {
            res.status(200).json({
                count: results.length,
                washes: results.map( result => {
                    return {
                        _id: result._id,
                        quantity: result.quantity,
                        amount: result.amount,
                        user: result.staff,
                        customer: result.customer,
                        date: result.date,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:5000/api/wash/' + result._id
                        }
                    }
                })
            })
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                message:`Internal server error || ${err}`
            })
        })
}

exports.getAWashRecord = (req, res, next) => {

    Wash.findById(req.params.washId)
    .populate('customer staff', '-__v')
    .exec()
    .then( result => {
        if(!result) {
            return res.status(404).json({
                message: 'Wash record not found.',
                request: {
                    type: 'GET',
                    url: 'http://localhost:5000/api/wash/'
                }
            })
        }
        res.status(200).json({
            wash: result,
            request: {
                type: 'GET',
                url: 'http://localhost:5000/api/wash/'
            }
        })
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({
            message:`Internal server error || ${err}`
        })
    })
}

exports.deleteAWashRecord = (req, res, next) => {
    Wash.findByIdAndRemove(req.params.washId)
    .exec()
    .then( result => {
        if (!result) {
            return res.status(404).json({
                message: 'Wash  record does not exist or has already been deleted'
            })
        }
        res.status(200).json({
            message: 'Wash record deleted successfully.'
            // request: {
            //     type: 'POST',
            //     url: 'http://localhost:5000/api/wash',
            //     body: {
            //         quantity: 'Number',
            //         amount: 'Number',
            //         customer : 'Id gotten from customer',
            //         staff : 'Id gotten from staff',
            //     }
            // }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: `Some errors occurred while removing this record. || ${err}`
        })
    })
}