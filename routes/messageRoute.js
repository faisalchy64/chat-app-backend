const express = require("express");
const verifyJWT = require("../middlewares/verifyJWT");
const { getMessages } = require("../controllers/messageController");

const router = express.Router();

router.get("/", verifyJWT, getMessages);

module.exports = router;
