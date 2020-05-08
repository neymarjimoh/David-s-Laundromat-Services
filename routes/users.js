const express = require("express");
const router = express.Router();
const { checkSchema } = require('express-validator');
const { userValidationRules, validate } = require('../middleware/userValidator');
const checkAuth = require('../middleware/checkAuth');
const UsersController = require('../controllers/users');
const User = require('../models/users');


/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

// adding a user requires only authorized users
// /api/user/signup
router.post("/signup", userValidationRules(), validate, UsersController.userSignUp)

/**
 * @method - POST
 * @param - /signin
 * @description - User Signin
 */
// /api/user/signup
router.post("/signin", UsersController.userSignIn)

// /**
//  * @method - Post
//  * @param - /new
//  * @description - User addition by authenticated user
// */
// // /api/user/new
// router.post('/new', checkAuth, UsersController.addNewUser)

/**
 * @method - Put
 * @param - /:userId
 * @description - User Update by authenticated user
*/
// /api/user/:userId
router.put("/:userId", checkAuth, UsersController.updateUser)

/**
 * @method - Delete
 * @param - /:userId
 * @description - User Deletion by authenticated user
*/
// /api/user/:userId
router.delete("/:userId", checkAuth, UsersController.deleteUser);

/**
 * @method - Get
 * @param - /
 * @description - Get all users by authenticated user
*/
// /api/user/
router.get("/", checkAuth, UsersController.getAllUsers);


/**
 * @method - Get
 * @param - /:userId
 * @description - Get a specific user by id by authenticated user
*/
// /api/user/:userId
router.get("/:userId", checkAuth, UsersController.getAUserById);

module.exports = router;