const express = require("express");
const {
    getConversations,
    getConversation,
    postConversation,
} = require("../controllers/conversationController");

const router = express.Router();

router.get("/", getConversations);

router.get("/:id", getConversation);

router.post("/", postConversation);

module.exports = router;
