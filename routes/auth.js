const express = require("express");
const router = express.Router();
const { authorization } = require("../middlewares/authMiddleware");

const {
  signupUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/logout", authorization, logoutUser);

module.exports = router;
