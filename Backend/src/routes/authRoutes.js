const express = require("express");
const AuthController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", AuthController.signup);
router.post("/get-role", AuthController.getUserRole);
router.post("/logout", AuthController.logout);

module.exports = router;
