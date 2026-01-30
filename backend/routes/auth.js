const express = require("express")
const { signup, login, logout, forgotPassword, currentUser, updateCart } = require("../controllers/auth")
const auth = require("../middlewares/auth")

const router = express.Router()


router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/forgotpassword", forgotPassword)
router.get("/currentuser", auth, currentUser)
router.put("/updateCart", auth, updateCart)

module.exports = router;