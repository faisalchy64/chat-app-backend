const express = require("express");
const {
    getConversations,
    getConversation,
    postConversation,
} = require("../controllers/conversationController");
const {
    conversationValidation,
    conversationValidationCheck,
} = require("../middlewares/conversationValidation");

const router = express.Router();

router.get("/", getConversations);

router.get("/:id", getConversation);

router.post(
    "/",
    conversationValidation,
    conversationValidationCheck,
    postConversation
);

module.exports = router;
