const express = require("express");
const verifyJWT = require("../middlewares/verifyJWT");
const {
    getConversations,
    postConversation,
} = require("../controllers/conversationController");
const {
    conversationValidation,
    conversationValidationCheck,
} = require("../middlewares/conversationValidation");

const router = express.Router();

router.get("/", verifyJWT, getConversations);

router.post(
    "/",
    verifyJWT,
    conversationValidation,
    conversationValidationCheck,
    postConversation
);

module.exports = router;
