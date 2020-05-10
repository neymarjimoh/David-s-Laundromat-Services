const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            get: obfuscate,
            required: true
        },
        resumptionDate: {
            type: Date,
            default: Date.now
        },
        phoneNumber: {
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
        resetToken:String,
        expireToken:Date,
    },
    {
        timestamps: true
    }
);

function obfuscate(email) {
    const separatorIndex = email.indexOf('@');
    if(separatorIndex < 3) {
        return email.slice(0, separatorIndex).replace(/./g, '*') + email.slice(separatorIndex);
    }
    return email.slice(0, 2) + email.slice(2, separatorIndex).replace(/./g, '*') + email.slice(separatorIndex);
}

module.exports = mongoose.model("User", UserSchema);