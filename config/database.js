const mongoose = require("mongoose");
const config = require('./index');

const db = config.dbUrl || 'mongodb://127.0.0.1/david-laundromat';

mongoose.Promise = global.Promise;

mongoose
  .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
  })
  .then(() => console.log("💻 Database Connected sucessfully.."))
  .catch(err => console.error(err));

module.exports = mongoose;