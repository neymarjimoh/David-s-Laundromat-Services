const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/config");
const { User } = require("../models");


exports.userSignUp = (req, res) => {

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
                                return res.status(201).json({ 
                                    message: 'User(staff) signed up successfully',
                                    result
                                });
                            })
                            .catch( err => {
                                console.log('Server error');
                                return res.status(500).json({
                                    message: 'Problem occurred while processing your request..'
                                })
                            })
                    }
                })
            }
        })

}

exports.userSignIn = (req, res) => {
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
                return res.status(401).json({
                    message: 'Invalid login credentials'
                })
            })
        })
        .catch( err => {
            console.log('server error');
            return res.status(500).json({ 
                error: "Error occurred. Unable to process your request.." 
            });
        })

};
