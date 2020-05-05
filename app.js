require('dotenv').config();

const express = require("express");
// const mongoose = require("mongoose");
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require("./config/database");

const port = process.env.PORT || 5000;

const userRoute = require('./routes/users');
const customerRoute = require('./routes/customers');
const washRoute = require('./routes/wash');
const paymentRoute = require('./routes/payment');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get("/", (req, res) => {
  res.send("Hello there, please read the api docs for more info... 🔥");
});


app.use('/api/v1/users', userRoute);
app.use('/api/v1/customers', customerRoute);
app.use('/api/v1/wash', washRoute);
app.use('/api/v1/payments', paymentRoute);

// You can set 404 and 500 errors
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    if(error.status === 404)
        res.status(404).json({message: "Not found"});
    else 
        res.status(500).json({message: "Oops, problem occurred while processing your request.."});

      // res.status(error.status || 500);

    // res.json({
    //     error: {
    //         message: error.message
    //     }
    // })
})


app.listen(port, () => console.log(`Server running on port ${port}..🔥`));