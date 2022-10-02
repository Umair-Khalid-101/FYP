const express = require("express");
const {
  signup,
  login,
  verifyToken,
  getUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/SignUp", signup);
router.post("/Login", login);
router.get("/User", verifyToken, getUser);

module.exports = router;
