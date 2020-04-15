const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
//   _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  email: {
    type: String,
    required: true,
    get: obfuscate
  },
  resumptionDate: {
    type: Date,
    default: Date.now
  },
  phoneNumber: {
    type: Number,
    required: true,
    min: 11
  },
  homeAddress: {
    type: String,
    required: true
  }
});

function obfuscate(email) {
    const separatorIndex = email.indexOf('@');
    if(separatorIndex < 3) {
        return email.slice(0, separatorIndex).replace(/./g, '*') + email.slice(separatorIndex);
    }
    return email.slice(0, 2) + email.slice(2, separatorIndex).replace(/./g, '*') + email.slice(separatorIndex);
}

module.exports = mongoose.model("User", UserSchema);