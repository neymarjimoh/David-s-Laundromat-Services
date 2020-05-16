const mongoose = require("mongoose");
const { Schema } = mongoose;

const PaymentSchema = new Schema(
    {
        paymentType: {
            type: String,
            enum: ['CASH', 'TRANSFER', 'POS'],
            default: 'CASH'
        }, 
        wash: {
            type: Schema.Types.ObjectId,
            ref: 'Wash',
            required: true
        },
        date: {
            type: Date,
            default: Date.now  
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Payment", PaymentSchema);