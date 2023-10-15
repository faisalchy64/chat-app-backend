const express = require("express");

const router = express.Router();

router.post("/signin", (req, res) => {
    res.send(req.body);
});

router.post("/signup", (req, res) => {
    res.send(req.body);
});

module.exports = router;
