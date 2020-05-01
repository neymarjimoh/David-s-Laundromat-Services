const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
    {
        wash: {
            type: Schema.Types.ObjectId,
            ref: 'Wash',
            required: true
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
        staff: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true        
        },
        paymentType: {
            type: String,
            enum: ['CASH', 'TRANSFER', 'POS'],
            default: 'CASH'
        } 
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Payment", PaymentSchema);