const { check, validationResult } = require("express-validator");

const conversationValidation = [
    check("message")
        .not()
        .isEmpty()
        .withMessage("Message is required")
        .isString()
        .withMessage("Message must be a string"),
    check("sender").isObject().withMessage("Sender must be an object"),
    check("sender._id")
        .not()
        .isEmpty()
        .withMessage("Sender _id is required")
        .isString()
        .withMessage("Sender _id must be a string"),
    check("sender.name")
        .not()
        .isEmpty()
        .withMessage("Sender name is required")
        .isAlpha()
        .withMessage("Sender name should contain only alphabets"),
    check("sender.email")
        .not()
        .isEmpty()
        .withMessage("Sender email is required")
        .isEmail()
        .withMessage("Sender email must be a valid email"),
    check("receiver").isObject().withMessage("Receiver must be an object"),
    check("receiver._id")
        .not()
        .isEmpty()
        .withMessage("Receiver _id is required")
        .isString()
        .withMessage("Receiver _id must be a string"),
    check("receiver.name")
        .not()
        .isEmpty()
        .withMessage("Receiver name is required")
        .isAlpha()
        .withMessage("Receiver name should contain only alphabets"),
    check("receiver.email")
        .not()
        .isEmpty()
        .withMessage("Receiver email is required")
        .isEmail()
        .withMessage("Receiver email must be a valid email"),
];

const conversationValidationCheck = (req, res, next) => {
    const errors = validationResult(req).mapped();

    if (Object.keys(errors).length === 0) {
        next();
    } else {
        const result = {};
        Object.keys(errors).forEach((error) => {
            result[error] = errors[error].msg;
        });

        res.status(500).send(result);
    }
};

module.exports = { conversationValidation, conversationValidationCheck };
