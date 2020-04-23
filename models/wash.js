const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WashSchema = new Schema({
    quantity: {
        type: Number,
        default: 1
        // required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    staff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true        
    },
    amount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Wash", WashSchema);