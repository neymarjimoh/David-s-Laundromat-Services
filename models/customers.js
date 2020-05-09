const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: {
      type: String,
      trim: true,
      required: true
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true
    },
    homeAddress: {
      type: String,
      trim: true
    },
    registrationDate: {
      type: Date,
      trim: true,
      default: Date.now
    }
  }, 
  {timestamps: true}
);

module.exports = mongoose.model("Customer", CustomerSchema);