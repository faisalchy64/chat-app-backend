const express = require("express");
const { signin, signup, userCheck } = require("../controllers/userController");
const {
    signinValidation,
    signupValidation,
    emailValidation,
    signinValidationCheck,
    signupValidationCheck,
    emailValidationCheck,
} = require("../middlewares/userValidation");

const router = express.Router();

router.post("/signin", signinValidation, signinValidationCheck, signin);

router.post("/signup", signupValidation, signupValidationCheck, signup);

router.get("/user", emailValidation, emailValidationCheck, userCheck);

module.exports = router;
