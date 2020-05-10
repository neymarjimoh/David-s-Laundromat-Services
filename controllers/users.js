const { User } = require("../models");

exports.updateUser = (req, res) => {
    User
        .findByIdAndUpdate( req.params.userId, req.body, { new: true } )
        .select('-password -__v')
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
            return res.status(500).json({
                error: "Error occurred. Unable to process your request.."
            })
        })

}

exports.deleteUser = (req, res) => {
    User
        .findByIdAndRemove(req.params.userId, { useFindAndModifiy: false })
        .then( result => {
            if (!result) {
                return res.status(404).json({
                    message: 'User does not exist or has already been deleted'
                })
            }
            return res.status(200).json({
                message: 'User deleted successfully'
            })
        })
        .catch( err => {
            return res.status(500).json({
                error: "Error occurred. Unable to process your request.."
            })
        })

}

exports.getAllUsers = (req, res) => {
    User
        .find()
        .populate("wash", "amount date")
        .select("-password -__v")
        .then( users => {
            return res.status(200).json({
                count: users.length + " Users",
                users
            })
        })
        .catch( err => {
            console.log(err);
            return res.status(500).json({
                message: "Error occurred. Unable to process your request.."
            })
        })
}

exports.getAUserById = (req, res) => {
    const id = req.params.userId
    User.findById(id)
    .select('-password -__v')
    .then( doc => {
        console.log("From Database", doc);
        if (doc) {
            return res.status(200).json({
                user: doc
            })
        } else {
            return res.status(404).json({
                message: 'No valid entry found for the provided id'
            })
        }
        
    })
    .catch( err => {
        console.log(err)
        return res.status(500).json({error: 'Problem occurred while processing your request..'})
    })
}
