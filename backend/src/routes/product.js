const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "..." }); // the message is currently a place holder
});

module.exports = router;
