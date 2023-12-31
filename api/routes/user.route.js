const express = require("express");
const userController = require("../controllers/user.controller");
const verifyToken = require("../utils/verifyUser");

const router = express.Router();

router.get("/", userController.testGet);

router.post("/update/:id", verifyToken, userController.updateUser);

module.exports = router;
