const { check, validationResult } = require("express-validator");
const User = require("../models/userModel");

const signinValidation = [
    check("email")
        .not()
        .isEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Give a valid email")
        .trim(),
    check("password")
        .isStrongPassword({ minLength: 8, minUppercase: 0 })
        .withMessage(
            "Minimum 8 characters needed (at least one letter, one digit and one special character)"
        ),
];

const signupValidation = [
    check("name")
        .not()
        .isEmpty()
        .withMessage("Name is required")
        .isLength({ min: 3 })
        .withMessage("Minimum 3 characters needed")
        .isAlpha()
        .withMessage("Name should contain only alphabets")
        .trim(),
    check("email")
        .not()
        .isEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Give a valid email")
        .custom(async (email) => {
            try {
                const user = await User.findOne({ email });
                if (user) {
                    throw new Error("User already exists");
                }
            } catch (err) {
                throw new Error(err.message);
            }
        })
        .trim(),
    check("password")
        .not()
        .isEmpty()
        .withMessage("Password is required")
        .isStrongPassword({ minLength: 8, minUppercase: 0 })
        .withMessage(
            "Minimum 8 characters needed (at least one letter, one digit and one special character)"
        ),
];

const signinValidationCheck = (req, res, next) => {
    const errors = validationResult(req).mapped();

    if (Object.keys(errors).length === 0) {
        next();
    } else {
        res.status(500).send(errors);
    }
};

const signupValidationCheck = (req, res, next) => {
    const errors = validationResult(req).mapped();

    if (Object.keys(errors).length === 0) {
        next();
    } else {
        res.status(500).send(errors);
    }
};

module.exports = {
    signinValidation,
    signupValidation,
    signinValidationCheck,
    signupValidationCheck,
};
