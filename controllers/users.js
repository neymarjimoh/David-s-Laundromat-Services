const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');
const User = require('../models/users');


exports.userSignUp = (req, res, next) => {

    const { name, password, email, resumptionDate, phoneNumber, homeAddress } = req.body;
    User
        .find({ email })
        .exec()
        .then( result => {
            if (result.length >= 1) {
                return res.status(409).json({
                    message: 'User already exists.'
                })
            } else {
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: 'Error occurred.'
                        })
                    } else {
                        const user = new User({
                            name, 
                            password: hash, 
                            email, 
                            resumptionDate, 
                            phoneNumber, 
                            homeAddress 
                        })
                        user
                            .save()
                            .then( result => {
                                console.log('User signed up successfully');
                                res.status(201).json({ 
                                    message: 'User(staff) signed up successfully',
                                    result
                                });
                            })
                            .catch( err => {
                                console.log('Server error');
                                res.status(500).json({
                                    message: 'Server error'
                                })
                            })
                    }
                })
            }
        })

}

exports.userSignIn = (req, res, next) => {
    const { email, password } = req.body;
    User
        .findOne({ email })
        .exec()
        .then( user => {
            if (!user || user.length < 1) {
                return res.status(400).json({
                    message: 'Invalid login credentials'
                })
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Invalid login credentials'
                    })
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user.email,
                            userId: user._id
                        }, 
                        JWT_SECRET, 
                        {
                            expiresIn: '24h'
                        }
                    )
                    return res.status(200).json({
                        message: 'User logged in..',
                        token
                    })
                }
                res.status(401).json({
                    message: 'Invalid login credentials'
                })
            })
        })
        .catch( err => {
            res.status(500).json({ 
                error: 'Server error' 
            });
        })

}

exports.userSignOut = (req, res, next) => {

}

exports.addNewUser = (req, res, next) => {
    const { name, password, email, resumptionDate, phoneNumber, homeAddress } = req.body;

    User
        .find({ email })
        .exec()
        .then( result => {
            if (result.length >= 1) {
                return res.status(409).json({
                    message: 'Can\'t add user. User with this email already exists'
                })
            } else {
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    }
                    const user = new User({
                        name, 
                        password: hash, 
                        email, 
                        resumptionDate,
                        phoneNumber, 
                        homeAddress
                    })
                    user
                        .save()
                        .then( result => {
                            return res.status(201).json({
                                message: 'New User added successfully',
                                result
                            })
                        })
                        .catch( err => {
                            console.log('Server error', err);
                            res.status(500).json({
                                error: err
                            })
                        })
                })
 
            }
        })

}

exports.updateUser = (req, res, next) => {
    User
        .findByIdAndUpdate( req.params.userId, req.body, { new: true } )
        .exec()
        .then( result => {
            if (!result) {
                return res.status(404).json({
                    message: 'User does not exist or has already been deleted.'
                })
            }
            return res.status(200).json({
                message: 'User updated successfully', 
                user: result 
            })
        })
        .catch( err => {
            res.status(500).json({
                error: err
            })
        })

}

exports.deleteUser = (req, res, next) => {
    User
        .findByIdAndRemove(req.params.userId)
        .exec()
        .then( result => {
            if (!result) {
                return res.status(404).json({
                    message: 'User does not exist or has already been deleted'
                })
            }
            res.status(200).json({
                message: 'User deleted successfully'
            })
        })
        .catch( err => {
            res.status(500).json({
                error: err
            })
        })

}

exports.getAllUsers = (req, res, next) => {
    User
        .find()
        .exec()
        .then( users => {
            res.status(200).json({
                count: users.length,
                users: users.map(user => {
                    return {
                        _id: user._id,
                        name:user.name,
                        email: user.email,
                        phoneNumber:user.phoneNumber,
                        homeAddress: user.homeAddress,
                        resumptionDate: user.resumptionDate,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:5000/api/user/' + user._id
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

exports.getAUserById = (req, res, next) => {
    const id = req.params.userId
    User.findById(id)
    .select('-password')
    .exec()
    .then( doc => {
        console.log("From Database", doc);
        if (doc) {
            res.status(200).json({
                user: doc,
                request: 'GET',
                description: 'GET_ALL_USERS',
                url: 'http://localhost:5000/api/user'
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