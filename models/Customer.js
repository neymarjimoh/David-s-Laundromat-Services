const mongoose = require("mongoose");
const { Schema } = mongoose;

const CustomerSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        wash: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Wash'
            }
        ],
        homeAddress: String,
        registrationDate: {
            type: Date,
            default: Date.now
        }
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Customer", CustomerSchema);