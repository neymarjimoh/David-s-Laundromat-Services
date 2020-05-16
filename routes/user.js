const express = require("express");
const router = express.Router();
const { updateUser, deleteUser, getAllUsers, getAUserById } = require('../controllers/users');

router.put("/:userId", updateUser);

router.delete("/:userId", deleteUser);

router.get("/", getAllUsers);

router.get("/:userId", getAUserById);

module.exports = router;