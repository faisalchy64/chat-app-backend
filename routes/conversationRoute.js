const express = require("express");
const {
    getConversations,
    postConversation,
} = require("../controllers/conversationController");
const {
    conversationValidation,
    conversationValidationCheck,
} = require("../middlewares/conversationValidation");

const router = express.Router();

router.get("/", getConversations);

router.post(
    "/",
    conversationValidation,
    conversationValidationCheck,
    postConversation
);

module.exports = router;
