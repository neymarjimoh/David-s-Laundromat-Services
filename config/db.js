const mongoose = require("mongoose");
const { MONGOURI } = require("./config");

global.Promise = mongoose.Promise;

const dbConnect = () => {
    mongoose
    .connect(MONGOURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => console.log("💻 Database Connected sucessfully.."))
    .catch(err => console.error(err));
};

module.exports = dbConnect;
