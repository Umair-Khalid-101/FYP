const express = require("express");
const {
  addPost,
  getPosts,
  getUserPosts,
} = require("../controllers/postsController");
const { verifyToken } = require("../controllers/userController");
const router = express.Router();

router.post("/newpost", addPost);
router.get("/allposts", getPosts);
router.get("/userposts", verifyToken, getUserPosts);

module.exports = router;
