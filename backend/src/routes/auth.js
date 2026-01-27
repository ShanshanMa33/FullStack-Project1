const express = require("express")
const router = express.Router()


router.get("/", (req, res) => {
    res.json({ message: "..." }) // message is currently a place holder
})

module.exports = router;