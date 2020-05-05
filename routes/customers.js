const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');
const CustomersController = require('../controllers/customers');
const { customerValidationRules, validate } = require('../middleware/customerValidator');


/**
 * @method - Post
 * @param - /
 * @description - Add a customer by authenticated user
*/

// /api/customer
router.post("/", checkAuth, customerValidationRules(), validate, CustomersController.addCustomer);

/**
 * @method - Put
 * @param - /:customerId
 * @description - Customer Update by authenticated user
*/
// /api/customer/:customerId
router.put('/:customerId', checkAuth, CustomersController.updateCustomer);

/**
 * @method - Delete
 * @param - /:customerId
 * @description - Customer Deletion by authenticated user
*/
// /api/customer/:customerId
router.delete("/:customerId", checkAuth, CustomersController.deleteCustomer);


/**
 * @method - Get
 * @param - /
 * @description - Read all customers by authenticated user
*/
// /api/customer
router.get("/", checkAuth, CustomersController.getAllCustomers);

/**
 * @method - Get
 * @param - /:customerId
 * @description - Read a specific customer by authenticated user
*/
// /api/customer/:customerId
router.get("/:customerId", CustomersController.getCustomer);


module.exports = router;
