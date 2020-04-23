const express = require("express");
const mongoose = require('mongoose');
const Customer = require('../models/customers');

exports.addCustomer = (req, res, next) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing')
    }

    const { name, email, registrationnDate, phoneNumber, homeAddress } = req.body;

    Customer
        .find({ email })
        .exec()
        .then( record => {
            if(record.length >= 1) {
                return res.status(409).json({
                    message: 'There\'s a record for this customer already!' 
                })
            }
            const customer = new Customer({
                name, 
                email, 
                registrationnDate, 
                phoneNumber, 
                homeAddress
            })
            customer
                .save()
                .then( record => {
                    res.status(201).json({
                        message: 'Customer added successfully',
                        customer: record
                    })
                })
                .catch( err => {
                    res.status(500).json({
                        error: err 
                    })
                })
        })
}

exports.updateCustomer = (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({ message: 'Data to update can not be empty!' });
    }
    Customer
        .findByIdAndUpdate(req.params.customerId, req.body, { new: true }, (err, result) => {
            if (!result) {
                return res.status(404).json({
                    message: 'Customer does not exist or has already been deleted'
                })
            }
            if(err) return res.status(500).json({
                error: err
            })
            return res.status(200).json({
                message: 'Customer updated successfully',
                customer: result
            })
        } )

}

exports.deleteCustomer = (req, res, next) => {
    Customer
        .findByIdAndRemove(req.params.customerId, (err, result) => {
            if (!result) {
                return res.status(404).json({
                    message: 'Customer does not exist or has already been deleted'
                })
            }
            if(err) return res.status(500).json({
                message: 'Internal server error'
            })
            return res.status(200).json({
                message: 'Customer deleted successfully'
            })            
        })

}

exports.getAllCustomers = (req, res, next) => {
    Customer
        .find()
        .exec()
        .then( customers => {
            res.status(200).json({
                count: customers.length,
                customers: customers.map(customer => {
                    return {
                        _id: customer._id,
                        name:customer.name,
                        email: customer.email,
                        phoneNumber: customer.phoneNumber,
                        homeAddress: customer.homeAddress,
                        registrationDate: customer.registrationDate,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:5000/api/customer/' + customer._id
                        }
                    }                    
                })
            })
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                message: err
            })
        })
}

exports.getCustomer = (req, res, next) => {
    const id = req.params.customerId
    Customer.findById(id)
    .exec()
    .then( doc => {
        console.log("From Database", doc);
        if (doc) {
            res.status(200).json({
                customer: doc,
                request: 'GET',
                description: 'GET_ALL_CUSTOMERS',
                url: 'http://localhost:5000/api/customer'
            })
        } else {
            res.status(404).json({
                message: 'No valid entry found for the provided id'
            })
        }
        
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({error: err || 'Having issues, internal server error.'})
    })
}