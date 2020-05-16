const { Wash, Customer, User } = require('../models');

exports.createAWashRecord = (req, res) => {
    const { quantity, date, amount, payment, customer, user } = req.body;
    if(!customer && !user ) {
        return res.status(400).json({ message: 'You must fill the required fields!!' });
    }
    const wash = new Wash({
        ...req.body
    })
    wash.save()
    .then( savedWash => {
        console.log(savedWash)
        User.findByIdAndUpdate( 
            user, 
            {$push: { wash: savedWash._id } },
            { new: true }
        )
        .then(( foundUser ) => {
            if(!foundUser || foundUser < 1) {
                return res.status(400).json({ message: 'User id is invalid' });
            }
            Customer.findByIdAndUpdate(
                customer,
                { $push: { wash: savedWash._id} },
                { new: true }
            )
            .then(( foundCustomer ) =>{
                if (!foundCustomer || foundCustomer < 1) {
                    return res.status(400).json({ message: 'Customer id is invalid' });
                }
                return res.json({ 
                    message: 'saved',
                    washrecord: savedWash
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

    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({ message: 'Error occurred, ensure you enter the correct details' });
    })
};

exports.getAllWashRecords = (req, res) => {
    Wash
        .find()
        .populate("user", "name email")
        .populate("customer", "name email")
        .populate("payment", "paymentType date")
        .select("-__v -createdAt -updatedAt")
        .then( results => {
            return res.status(200).json({
                count: results.length + " Wash(es)",
                results
            })
        })
        .catch( err => {
            console.log(err);
            return res.status(500).json({
                message: `Problem occured..`
            })
        })
}

exports.getAWashRecord = (req, res) => {

    Wash.findById(req.params.washId)
    .populate("user", "name email")
    .populate("customer", "name email")
    .populate("payment", "paymentType date")
    .select("-__v -createdAt -updatedAt")
    .then( result => {
        if(!result) {
            return res.status(404).json({
                message: 'Wash record not found.'
            })
        }
        return res.status(200).json({
            wash: result
        })
    })
    .catch( err => {
        console.log(err)
        return res.status(500).json({
            message:`Problem occurred while processing your request.. `
        })
    })
}

exports.deleteAWashRecord = (req, res, next) => {
    Wash.findByIdAndRemove(req.params.washId)
    .then( result => {
        if (!result) {
            return res.status(404).json({
                message: 'Wash  record does not exist or has already been deleted'
            })
        }
        return res.status(200).json({
            message: 'Wash record deleted successfully.'
        })
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({
            error: `Some errors occurred while removing this record. `
        })
    })
}