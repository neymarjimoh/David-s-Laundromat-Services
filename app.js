const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const morgan = require('morgan');
// const config = require("config");

const port = process.env.PORT || 5000;

const userRoute = require('./routes/users');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// const db = config.get("mongoURI");
const db = process.env.MONGO_URI || 'mongodb://127.0.0.1/david-laundromat';

mongoose
  .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  })
  .then(() => console.log("💻 Database Connected sucessfully.."))
  .catch(err => console.error(err));

app.get("/", (req, res) => {
  res.send("Server working 🔥");
});


app.use('/api/users', userRoute);

// You can set 404 and 500 errors
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})


app.listen(port, () => console.log(`Server running on port ${port}..🔥`));