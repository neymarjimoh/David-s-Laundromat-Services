require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const dbConnect = require("./config/db");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const customerRoute = require("./routes/customer");
const washRoute = require("./routes/wash");
const paymentRoute = require("./routes/payment");

const checkAuth = require("./middleware/checkAuth");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// prevent all cross site error and all web vulnurabilities
app.use(helmet());

// connects to the database
dbConnect();

// authorization middleware for all secure routes
app.use(checkAuth);

app.get("/", (req, res) => {
  res.send("Server working 🔥");
});

app.get("/api/v1", (req, res) => {
    res.send(` Welcome to the API Version 1.0.0 of David's Laundromat Services
        Please read the api documentation for how to go about its usage..
    `)
})

// this router will handle the user authentication and authorisation
app.use("/api/v1/auth", authRoute);

app.use("/api/v1/users", userRoute);
app.use("/api/v1/customers", customerRoute);
app.use("/api/v1/wash", washRoute);
app.use("/api/v1/payments", paymentRoute);

// You can set 404 and 500 errors
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    if(error.status === 404)
        res.status(404).json({message: "Invalid Request, Request Not found"});
    else 
        res.status(500).json({message: "Oops, problem occurred while processing your request.."});
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port} 🔥`);
});