const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
//   _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    get: obfuscate,
    required: true
  },
  resumptionDate: {
    type: Date,
    trim: true,
    // required: true,
    default: Date.now
  },
  phoneNumber: {
    type: Number,
    trim: true,
    required: true,
    get: changeNumber
  },
  wash: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Wash'
    }
  ],
  homeAddress: {
    type: String,
    trim: true
  }
},{
  timestamps: true
});

function obfuscate(email) {
    const separatorIndex = email.indexOf('@');
    if(separatorIndex < 3) {
        return email.slice(0, separatorIndex).replace(/./g, '*') + email.slice(separatorIndex);
    }
    return email.slice(0, 2) + email.slice(2, separatorIndex).replace(/./g, '*') + email.slice(separatorIndex);
}

function changeNumber(phoneNumber) {
  // to check if the phonumber starts with +234 or 234 since it is a Nigerian number
  const phoneString = phoneNumber.toString();
  const isStartWith = phoneString.slice(0, 3);
  if( isStartWith === "234" ) {
    return '(+234)-' + phoneString.slice(3);
  }
  return '(+234)-' + phoneNumber;
}

module.exports = mongoose.model("User", UserSchema);