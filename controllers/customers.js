const { Customer } = require("../models");

exports.addCustomer = (req, res) => {

    const { name, email, registrationDate, phoneNumber, homeAddress } = req.body;

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
                registrationDate, 
                phoneNumber, 
                homeAddress
            })
            customer
                .save()
                .then( record => {
                    return res.status(201).json({
                        message: 'Customer added successfully',
                        customer: record
                    })
                })
                .catch( err => {
                    return res.status(500).json({
                        error: 'Error occurred. Unable to create customer'
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
                error: "Error occurred. Unable to process your request.."
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
                message: 'Error occurred. Unable to process your request..'
            })
            return res.status(200).json({
                message: 'Customer deleted successfully'
            })            
        })

}

exports.getAllCustomers = (req, res, next) => {
    Customer
        .find()
        .populate("wash", "amount date")
        .select("-__v")
        .then( customers => {
            res.status(200).json({
                count: customers.length + " Customers",
                customers
            })
        })
        .catch( err => {
            console.log(err);
            return res.status(500).json({
                message: "Error occurred. Unable to process your request.."
            })
        })
}

exports.getCustomer = (req, res, next) => {
    const id = req.params.customerId
    Customer.findById(id)
    .select('-__v')
    .then( doc => {
        console.log("From Database", doc);
        if (doc) {
            return res.status(200).json({
                meassage: "Customer found..",
                customer: doc
            })
        } else {
            return res.status(404).json({
                message: 'No valid entry found for the provided id'
            })
        }
        
    })
    .catch( err => {
        console.log(err)
        return res.status(500).json({error: 'Encountered problem while processing your request..'})
    })
}