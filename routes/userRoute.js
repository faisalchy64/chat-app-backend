const express = require("express");
const { signin, signup } = require("../controllers/userController");
const {
    signinValidation,
    signupValidation,
    signinValidationCheck,
    signupValidationCheck,
} = require("../middlewares/userValidation");

const router = express.Router();

router.post("/signin", signinValidation, signinValidationCheck, signin);

router.post("/signup", signupValidation, signupValidationCheck, signup);

module.exports = router;
