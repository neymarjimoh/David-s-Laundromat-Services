const mongoose = require("mongoose");
const { Schema } = mongoose;

const WashSchema = new Schema(
    {
        quantity: {
            type: Number,
            default: 1
        },
        date: {
            type: Date,
            default: Date.now
        },
        customer: {
            type: Schema.Types.ObjectId,
            ref: 'Customer',
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true        
        },
        payment: {
            type: Schema.Types.ObjectId,
            ref: 'Payment'
        },
        amount: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Wash", WashSchema);