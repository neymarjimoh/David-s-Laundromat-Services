const express = require("express");
const router = express.Router();

const { addCustomer, updateCustomer, deleteCustomer, getAllCustomers, getCustomer } = require('../controllers/customers');
const { customerValidationRules, validate } = require('../middleware/customerValidator');


/**
 * @method - Post
 * @param - /
 * @description - Add a customer by authenticated user
*/
router.post("/", customerValidationRules(), validate, addCustomer);

/**
 * @method - Put
 * @param - /:customerId
 * @description - Customer Update by authenticated user
*/
router.put('/:customerId', updateCustomer);

/**
 * @method - Delete
 * @param - /:customerId
 * @description - Customer Deletion by authenticated user
*/
router.delete("/:customerId", deleteCustomer);


/**
 * @method - Get
 * @param - /
 * @description - Read all customers by authenticated user
*/
router.get("/", getAllCustomers);

/**
 * @method - Get
 * @param - /:customerId
 * @description - Read a specific customer by authenticated user
*/
router.get("/:customerId", getCustomer);

module.exports = router;
