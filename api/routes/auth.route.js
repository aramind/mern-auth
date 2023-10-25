const express = require("express");
const authController = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/google", authController.google);
console.log("from auth route");

module.exports = router;
