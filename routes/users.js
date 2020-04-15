const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/users');

// adding a user requires only authorized users
// /api/users/signup
router.post("/signup", (req, res) => {
  
});





module.exports = router;