const express = require("express")
const { signup, login, logout, forgotPassword, currentUser } = require("../controllers/auth")
const auth = require("../middlewares/auth")

const router = express.Router()


router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/forgotpassword", forgotPassword)
router.get("/currentuser", auth, currentUser)

module.exports = router;