const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: {
      type: String,
      trim: true,
      required: true
    },
    phoneNumber: {
      type: Number,
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
// schema.set(timestamps, {
//   createdAt: true,
//   updatedAt: { path: 'updatedAt', setOnInsert: false }
// });
module.exports = mongoose.model("Customer", CustomerSchema);