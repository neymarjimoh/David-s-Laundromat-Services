const express = require("express");
const router = express.Router();
const { userValidationRules, validate } = require("../middleware/userValidator");
const { userSignUp, userSignIn } = require("../controllers/auth");


// this router will handle the user signup
router.post("/signup", userValidationRules(), validate, userSignUp);

// this router will handle the user signin
router.post("/signin", userSignIn);


module.exports = router;